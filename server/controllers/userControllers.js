const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const fs = require("fs").promises; // Using the promisified version of fs
const path = require("path");

const Question = require("../model/questionModel");
const User = require("../model/userModel");
const Tag = require("../model/tagModel");
const Answer = require("../model/answerModel");
const {
  generatedHashedPassword,
  validateUser,
  generateToken,
  isValidFullname,
} = require("../utilities/account");

async function removeFile(filename, imageOf) {
  const filePath = path.join(
    __dirname,
    "..",
    "public",
    "images",
    imageOf,
    filename
  );
  console.log("IMAGE PATH: ", filePath);
  try {
    // Check if the file exists before attempting to remove it
    await fs.access(filePath);

    // Remove the file
    await fs.unlink(filePath);

    console.log(`File '${filename}' has been successfully removed.`);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.warn(`File '${filename}' not found.`);
    } else {
      console.error(`Error removing file: ${err.message}`);
    }
  }
}

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const exists = await User.findOne({ email });
    if (!exists) {
      throw Error("User doesn't exist");
    }

    const match = await bcrypt.compare(password, exists.password);
    if (!match) {
      throw Error("Invalid password");
    }

    //create a token
    const token = generateToken(
      exists._id,
      exists.fullname,
      email,
      exists.badge,
      exists.subscription.status
    );

    res.status(201).json({ email, fullname: exists.fullname, token });
  } catch (error) {
    res.status(401).json({
      from: "login",
      error: error.message,
    });
  }
};

const signup = async (req, res) => {
  const { email, password, fullname, confirmPassword } = req.body;
  console.log(req.body);

  try {
    await validateUser(email, fullname, password, confirmPassword);

    const hashedPassword = await generatedHashedPassword(password);

    const user = await User.create({
      email,
      password: hashedPassword,
      fullname,
    });

    const token = generateToken(
      user._id,
      fullname,
      email,
      user.badge,
      user.subscription.status
    );
    res.status(201).json({
      email,
      fullname,
      token,
    });
  } catch (error) {
    console.log(error.message);
    res.status(401).json({
      from: "signup",
      error: error.message,
    });
  }
};

const getPersonalInfo = async (req, res) => {
  const { _id } = req.body.profile;
  try {
    const info = await User.findById(_id);

    res.status(200).json(info);
  } catch (error) {
    res.status(400).json({
      from: "get profile info",
      error: error.message,
    });
  }
};
const getProfileInfo = async (req, res) => {
  const { userId } = req.query;
  console.log("USER ID: ", userId);
  try {
    const info = await User.findById(userId);

    res.status(200).json(info);
  } catch (error) {
    res.status(400).json({
      from: "get profile info",
      error: error.message,
    });
  }
};

// Function to enter tags
async function enterTags(tagList) {
  try {
    if (typeof tagList === "string") {
      const tag = await Tag.findOrCreate(tagList);
      console.log(`Tag '${tagList}' found or created:`, tag);
    } else {
      for (const tagName of tagList) {
        const tag = await Tag.findOrCreate(tagName);
        console.log(`Tag '${tagName}' found or created:`, tag);
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
// Function to update tag count
async function updateTagCounts(prevTagList, tagList) {
  try {
    const newTags = tagList.filter((tag) => !prevTagList.includes(tag));
    await enterTags(newTags);

    //taglist to decrement count
    const tagsToDecrement = prevTagList.filter(
      (tagName) => !tagList.includes(tagName)
    );

    for (const tagName of tagsToDecrement) {
      const tag = await Tag.findOneAndUpdate(
        { name: tagName },
        { $inc: { count: -1 } } //decrement the count
      );
      console.log(`Tag '${tagName}' found or created:`, tag);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

//Upload Questions function
const uploadQuestions = async (req, res) => {
  const { textContent, tagList, title } = req.body;
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  const selectedImage = req.files.map((file) => file.filename);
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    await enterTags(tagList);
    const question = await Question.create({
      AuthorId: _id,
      textContent,
      selectedImage,
      tagList,
      title,
    });
    res.status(200).json(question);
  } catch (error) {
    res.status(400).json({
      from: "uploadQuestions",
      error: error.message,
    });
  }
};

const updateQuestion = async (req, res) => {
  const { textContent, tagList, questionId, title } = req.body;
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  const selectedImage = req.files.map((file) => file.filename);
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    // Find the question by ID and ensure that the user has permission to update it
    const existingQuestion = await Question.findOne({
      _id: questionId,
      AuthorId: _id,
    });

    if (!existingQuestion) {
      throw Error("Question not found or unauthorized");
    }
    //Update tag counts
    updateTagCounts(existingQuestion.tagList, tagList);

    // Update the question fields
    existingQuestion.textContent = textContent;
    existingQuestion.tagList = tagList;
    existingQuestion.selectedImage = selectedImage;
    existingQuestion.title = title;
    existingQuestion.updateTime = new Date();

    // Save the updated question
    await existingQuestion.save();

    res.status(200).json(existingQuestion);
  } catch (error) {
    res.status(400).json({
      from: "updateQuestion",
      error: error.message,
    });
  }
};

//Upload Profile function
const updateProfile = async (req, res) => {
  const { fullname, email, tagList, bio } = req.body;
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  const selectedImage = req.files[0]?.filename;

  console.log("BODY: ", req.body);
  console.log("Image: ", selectedImage);

  try {
    const profile = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(profile._id);

    if (!user) {
      throw new Error("User not found");
    }
    console.log(user);

    // Update the user properties based on the provided data
    if (profile.fullname !== fullname) {
      if (!isValidFullname(fullname)) {
        throw Error(
          "Fullname must contain alphabets and atleast 3 characters long"
        );
      }
      user.fullname = profile.fullname;
    }

    if (profile.email !== email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        throw Error("Email already taken");
      }
      user.email = profile.email;
    }

    if (tagList.length !== 0) {
      user.favTags = tagList;
    }
    if (bio !== "undefined") {
      user.bio = bio;
    }

    if (selectedImage) {
      await removeFile(user.image, "profiles");
      user.image = selectedImage;
    }

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      from: "update profile",
      error: error.message,
    });
  }
};

const getAllTags = async (req, res) => {
  // try {
  //     const tags = await Tag.find();

  //     res.json(tags);
  // } catch (error) {
  //     console.error(error.message);
  //     res.status(500).send("Server error");
  // }

  try {
    // Calculate the date one week ago
    const lastWeekDate = moment().subtract(1, "week").toDate();

    // Aggregate tags and count of posts within the last week
    const tagsCountLastWeek = await Question.aggregate([
      {
        $match: {
          postTime: { $gte: lastWeekDate },
        },
      },
      {
        $unwind: "$tagList",
      },
      {
        $group: {
          _id: "$tagList",
          questionCount: { $sum: 1 },
          questionInLastWeek: {
            $sum: {
              $cond: [{ $gte: ["$postTime", lastWeekDate] }, 1, 0],
            },
          },
        },
      },
    ]);

    // Get all tags
    const allTags = await Tag.find({}, { name: 1, _id: 0 });

    // Left outer join between allTags and tagsCountLastWeek
    const result = allTags.map((tag) => {
      const matchingTag = tagsCountLastWeek.find((t) => t._id === tag.name);
      return {
        id: tag.name,
        name: tag.name,
        questionCount: matchingTag ? matchingTag.questionCount : 0,
        questionInLastWeek: matchingTag ? matchingTag.questionInLastWeek : 0,
      };
    });

    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

const getPopularTags = async (req, res) => {
  // try {
  //     const popularTags = await Tag.find()
  //         .sort({ count: -1 }) // Sort in descending order of count
  //         .exec();

  //     res.json(popularTags);
  // } catch (error) {
  //     console.error(error.message);
  //     res.status(500).send("Server error");
  // }

  try {
    // Calculate the date one week ago
    const lastWeekDate = moment().subtract(1, "week").toDate();

    // Aggregate tags and count of posts within the last week
    const tagsCountLastWeek = await Question.aggregate([
      {
        $match: {
          postTime: { $gte: lastWeekDate },
        },
      },
      {
        $unwind: "$tagList",
      },
      {
        $group: {
          _id: "$tagList",
          questionCount: { $sum: 1 },
          questionInLastWeek: {
            $sum: {
              $cond: [{ $gte: ["$postTime", lastWeekDate] }, 1, 0],
            },
          },
        },
      },
    ]);

    // Get all tags
    const allTags = await Tag.find({}, { name: 1, _id: 0 });

    // Left outer join between allTags and tagsCountLastWeek
    const result = allTags
      .map((tag) => {
        const matchingTag = tagsCountLastWeek.find((t) => t._id === tag.name);
        return {
          id: tag.name,
          name: tag.name,
          questionCount: matchingTag ? matchingTag.questionCount : 0,
          questionInLastWeek: matchingTag ? matchingTag.questionInLastWeek : 0,
        };
      })
      .sort((a, b) => b.questionInLastWeek - a.questionInLastWeek);

    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

const getAllQuestions = async (req, res) => {
  try {
    let query = {}; //blank rakhsi shob question ante
    //jodi user logged in hoy taile nicher ta
    if (req.body.profile) {
      const { favTags, following } = req.body.profile;

      if (favTags.length > 0)
        query = {
          $or: [
            {
              tagList: { $in: favTags },
            },
            {
              AuthorId: { $in: following },
            },
          ],
        };
    }

    const questions = await Question.find(query)
      .sort({ postTime: -1 })
      .populate([
        { path: "AuthorId", model: "User" },
        { path: "answers", model: "Answer" },
      ])
      .exec();

    res.json({ questions });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      from: "Get all questions",
      error: error.message,
    });
  }
};

const tagBasedQuestions = async (req, res) => {
  const { tagName } = req.query;
  try {
    const questions = await Question.find({
      tagList: { $in: tagName },
    })
      .sort({ postTime: -1 })
      .exec();

    res.json({ questions });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      from: "Tag based questions",
      error: error.message,
    });
  }
};

const relatedQuestions = async (req, res) => {
  const tagNames = req.query.tags ? req.query.tags.split(",") : [];
  try {
    const query = {
      tagList: { $in: tagNames },
    };

    const questions = await Question.find(query).exec();

    res.json({ questions });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      from: "Related questions",
      error: error.message,
    });
  }
};

const getPersonalQuestions = async (req, res) => {
  const { userId } = req.query;
  try {
    const questions = await Question.find({
      AuthorId: userId,
    })
      .sort({ postTime: -1 })
      .exec();
    res.json({ questions });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      from: "Personal questions",
      error: error.message,
    });
  }
};

const getWholeQuestion = async (req, res) => {
  try {
    const { questionId } = req.query;

    const question = await Question.findById(questionId)
      .populate([
        { path: "AuthorId", model: "User" },
        {
          path: "answers",
          populate: [
            { path: "AuthorId", model: "User" },
            // {
            //   path: "comments.commentList.fullname",
            //   model: "Answers",
            // },
          ],
        },
      ])
      .exec();
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.json({ question });
  } catch (error) {
    console.error(error);
    res.status(500).send({ from: "Single question", error: error.message });
  }
};

const followUnfollow = async (req, res) => {
  const { userId, follow } = req.body;
  const { _id } = req.body.profile;

  try {
    const currentUser = await User.findById(_id);
    const targetUser = await User.findById(userId);
    let updatedUser;
    if (follow) {
      updatedUser = await currentUser.followUser(targetUser);
    } else {
      updatedUser = await currentUser.unfollowUser(targetUser);
    }

    res.status(200).json({ updatedUser });
  } catch (error) {
    res.status(400).json({
      from: "from follow unfollow",
      error: error.message,
    });
  }
};

const upvoteDownvote = async (req, res) => {
  const { questionId, upvote } = req.body;
  const { _id } = req.body.profile;

  try {
    const question = await Question.findById(questionId);
    let updatedQuestion;
    if (upvote) {
      updatedQuestion = await question.upVote(_id);
    } else {
      updatedQuestion = await question.downVote(_id);
    }

    res.status(200).json({ updatedQuestion });
  } catch (error) {
    res.status(400).json({
      from: "from upvote-downvote",
      error: error.message,
    });
  }
};

//Upload Answer function
const uploadAnswer = async (req, res) => {
  const { textContent, questionId } = req.body;
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  const selectedImage = req.files.map((file) => file.filename);

  try {
    const { _id, fullname } = jwt.verify(token, process.env.JWT_SECRET);
    const answer = await Answer.create({
      answer: textContent,
      images: selectedImage,
      createdBy: { _id, fullname },
      questionId,
    });
    const question = await Question.findByIdAndUpdate(
      questionId,
      { $push: { answers: answer._id } },
      { new: true }
    );
    res.status(200).json(answer);
  } catch (error) {
    res.status(400).json({
      from: "uploadAnswers",
      error: error.message,
    });
  }
};

const updateAnswer = async (req, res) => {
  const { textContent, answerId } = req.body;
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  const selectedImage = req.files.map((file) => file.filename);
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    // Find the question by ID and ensure that the user has permission to update it
    const existingAnswer = await Answer.findOne({
      _id: answerId,
      createdBy: { _id },
    });

    if (!existingAnswer) {
      throw Error("Answer not found or unauthorized");
    }

    // Update the question fields
    existingAnswer.answer = textContent;
    existingAnswer.images = selectedImage;
    existingAnswer.updatedAt = new Date();

    // Save the updated question
    await existingAnswer.save();

    res.status(200).json(existingAnswer);
  } catch (error) {
    res.status(400).json({
      from: "updateAnswer",
      error: error.message,
    });
  }
};

const upvoteDownvoteAnswer = async (req, res) => {
  const { answerId, upvote } = req.body;
  const { _id } = req.body.profile;

  try {
    const answer = await Answer.findById(answerId);
    let updatedAnswer;
    if (upvote) {
      updatedAnswer = await answer.upVote(_id);
    } else {
      updatedAnswer = await answer.downVote(_id);
    }

    res.status(200).json({ updatedAnswer });
  } catch (error) {
    res.status(400).json({
      from: "from upvote-downvote-ans",
      error: error.message,
    });
  }
};
const markAnswerAsCorrect = async (req, res) => {
  const { answerId } = req.body;
  try {
    const updatedAnswer = await Answer.findByIdAndUpdate(
      answerId,
      { isAccepted: true },
      { new: true }
    );

    // Access the associated question ID from the updated answer
    const questionId = updatedAnswer.questionId;

    // Update the corresponding question to mark it as solved
    await Question.updateOne({ _id: questionId }, { isSolved: true });

    console.log(`Answer marked as correct: ${updatedAnswer}`);
  } catch (error) {
    console.error("Error marking answer as correct:", error.message);
  }
};

module.exports = {
  getWholeQuestion,
  relatedQuestions,
  getPersonalQuestions,
  tagBasedQuestions,
  uploadQuestions,
  getAllQuestions,
  signup,
  login,
  getProfileInfo,
  getPersonalInfo,
  getAllTags,
  getPopularTags,
  updateQuestion,
  updateProfile,
  followUnfollow,
  upvoteDownvote,
  uploadAnswer,
  updateAnswer,
  upvoteDownvoteAnswer,
  markAnswerAsCorrect,
};
