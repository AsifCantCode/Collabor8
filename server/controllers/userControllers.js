const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Question = require("../model/questionModel");
const User = require("../model/userModel");
const Tag = require("../model/tagModel");
const {
  generatedHashedPassword,
  validateUser,
  generateToken,
  isValidFullname,
} = require("../utilities/account");

const login = async (req, res) => {
  const { email, password } = req.body;
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
    const token = generateToken(exists._id, exists.fullname, email);

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

  try {
    await validateUser(email, fullname, password, confirmPassword);

    const hashedPassword = await generatedHashedPassword(password);

    const user = await User.create({
      email,
      password: hashedPassword,
      fullname,
    });

    const token = generateToken(user._id, fullname, email);
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

const getProfileInfo = async (req, res) => {
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

// Function to enter tags
async function enterTags(tagList) {
  try {
    for (const tagName of tagList) {
      const tag = await Tag.findOrCreate(tagName);
      console.log(`Tag '${tagName}' found or created:`, tag);
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
  const { textContent, tagList } = req.body;
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  const selectedImage = req.files.map((file) => file.filename);
  try {
    const { _id, fullname, email } = jwt.verify(token, process.env.JWT_SECRET);
    await enterTags(tagList);
    const question = await Question.create({
      AuthorId: _id,
      textContent,
      selectedImage,
      tagList,
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
  const { textContent, tagList, questionId } = req.body;
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

//Upload Questions function
const updateProfile = async (req, res) => {
  const { fullname, email, tagList } = req.body;
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  const selectedImage = req.files[0].filename;
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
    if (bio && bio !== "") {
      user.bio = bio;
    }

    if (image && image !== "") {
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
  try {
    const tags = await Tag.find();

    res.json(tags);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

const getPopularTags = async (req, res) => {
  try {
    const popularTags = await Tag.find()
      .sort({ count: -1 }) // Sort in descending order of count
      .exec();

    res.json(popularTags);
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

    const questions = await Question.find(query).sort({ postTime: -1 }).exec();

    res.json({ questions });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const tagBasedQuestions = async (req, res) => {
  const { tagName } = req.params;
  try {
    const questions = await Question.find({
      tagList: tagName,
    })
      .sort({ postTime: -1 })
      .exec();

    res.json({ questions });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const relatedQuestions = async (req, res) => {
  //const { tagName } = req.params;
  try {
    const tagNames = req.params.tagNames.split(",");

    const query = {
      tagList: { $in: tagNames },
    };

    const questions = await Question.find(query).exec();

    res.json({ questions });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const getPersonalQuestions = async (req, res) => {
  try {
    const { userId } = req.params;
    const query = {
      AuthorId: userId,
    };
    const questions = await Question.find(query).sort({ postTime: -1 }).exec();
    res.json({ questions });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const getWholeQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;

    const question = await Question.findById(questionId)
      .populate([
        { path: "AuthorId", model: "User" },
        {
          path: "answers",
          populate: [
            { path: "AuthorId", model: "User" },
            {
              path: "comments.commentList.fullname",
              model: "Answers",
            },
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
    res.status(500).send("Server error");
  }
};

const followUnfollow = async (req, res) => {
  const { userId, follow } = req.body;
  const { _id } = req.body.profile;
  console.log(req.body);

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
  getAllTags,
  getPopularTags,
  updateQuestion,
  updateProfile,
  followUnfollow,
};
