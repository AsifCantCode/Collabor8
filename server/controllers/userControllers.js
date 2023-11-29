const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
