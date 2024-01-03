const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Question = require("../model/questionModel");

//Token Generation (may provide other params to get from token)
const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const generatedHashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

//Login Function
// const checkLogin = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//       const user = await User.login(email, password);

//       //create a token
//       const token = generateToken(user._id);

//       res.status(201).json({ email, token });
//     } catch (error) {
//       res.status(401).json({
//         error: error.message,
//       });
//     }
//   };

//Upload Questions function
const uploadQuestions = async (req, res) => {
  const { textContent, tagList } = req.body;
  const selectedImage = req.files.map(file => file.filename);
  try {
    const question = await Question.create({
      textContent,
      selectedImage,
      tagList,
    });
    res.status(201).json({ question });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};

module.exports = uploadQuestions;