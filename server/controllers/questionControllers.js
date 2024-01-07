const moment = require("moment");
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const Question = require("../model/questionModel");
const Tag = require("../model/tagModel");
const { removeFile } = require("../utilities/account");

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
    //Assigning points
    const user = await User.findById(_id);
    await user.increasePoints(1);
    res.status(200).json(question);
  } catch (error) {
    res.status(400).json({
      from: "uploadQuestions",
      error: error.message,
    });
  }
};

const updateQuestion = async (req, res) => {
  const { textContent, tagList, questionId, title, previousImages } = req.body;
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  const selectedImages = req.files.map((file) => file.filename);
  const prevValid = previousImages.split(",");
  console.log("PreviousImages: ", typeof prevValid, prevValid);
  console.log("selectedImages: ", selectedImages);
  const newImageArray = [...prevValid, ...selectedImages];
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
    let absentElements = existingQuestion.selectedImage.filter(
      (image) => !newImageArray.includes(image)
    );
    console.log("ABSENT: ", absentElements.length);

    //Update tag counts
    updateTagCounts(existingQuestion.tagList, tagList);

    // Update the question fields
    existingQuestion.textContent = textContent;
    existingQuestion.tagList = tagList;
    if (absentElements.length > 0) {
      for (const filename of absentElements) {
        await removeFile(filename, "questions");
      }
      existingQuestion.selectedImage = newImageArray;
    }

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
        { path: "AuthorId", model: "User", select: "-password" },
        {
          path: "answers",
          model: "Answer",
          populate: {
            path: "comments.commentList.fullname",
            model: "User",
            select: "-password",
          },
        },
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
      .populate([
        { path: "AuthorId", model: "User", select: "-password" },
        {
          path: "answers",
          model: "Answer",
          populate: {
            path: "comments.commentList.fullname",
            model: "User",
            select: "-password",
          },
        },
      ])
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
        { path: "AuthorId", model: "User", select: "-password" },
        {
          path: "answers",
          model: "Answer",
          populate: {
            path: "comments.commentList.fullname",
            model: "User",
            select: "-password",
          },
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
const upvoteDownvoteQuestion = async (req, res) => {
  const { questionId, upvote } = req.body;
  const { _id } = req.body.profile;

  try {
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }
    let updatedQuestion;
    const questionAuthor = await User.findById(question.AuthorId);
    if (upvote) {
      updatedQuestion = await question.upVote(_id);
      if (updateQuestion) {
        await questionAuthor.increasePoints(2);
      }
    } else {
      updatedQuestion = await question.downVote(_id);
      if (updatedQuestion) {
        await questionAuthor.decreasePoints(1);
      }
    }

    res.status(200).json({ updatedQuestion });
  } catch (error) {
    res.status(400).json({
      from: "from upvote-downvote",
      error: error.message,
    });
  }
};

module.exports = {
  uploadQuestions,
  updateQuestion,
  getWholeQuestion,
  getPersonalQuestions,
  relatedQuestions,
  tagBasedQuestions,
  getAllQuestions,
  getPopularTags,
  getAllTags,
  upvoteDownvoteQuestion,
};
