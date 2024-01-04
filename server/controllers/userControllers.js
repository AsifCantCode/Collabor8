const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Question = require("../model/questionModel");
const User = require("../model/userModel");
const {
    generatedHashedPassword,
    validateUser,
    generateToken,
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

        res.status(201).json(info);
    } catch (error) {
        res.status(401).json({
            from: "get profile info",
            error: error.message,
        });
    }
};

//Upload Questions function
const uploadQuestions = async (req, res) => {
    const { textContent, tagList } = req.body;
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];

    const selectedImage = req.files.map((file) => file.filename);
    console.log("SELECTED IMAGE: ", selectedImage);
    console.log("TEXT: ", textContent, typeof textContent);
    console.log("TagList: ", tagList);
    try {
        const { _id, fullname, password } = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        // const question = await Question.create({
        //   textContent,
        //   selectedImage,
        //   tagList,
        // });
        // res.status(200).json(question);
    } catch (error) {
        res.status(400).json({
            from: "uploadQuestions",
            error: error.message,
        });
    }
};

module.exports = { uploadQuestions, signup, login, getProfileInfo };
