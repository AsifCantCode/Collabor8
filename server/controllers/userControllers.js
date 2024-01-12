const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../model/userModel");
const Question = require("../model/questionModel");
const Answer = require("../model/answerModel");
const { removeFile } = require("../utilities/account");
const {
    generatedHashedPassword,
    validateUser,
    generateToken,
    isValidFullname,
} = require("../utilities/account");

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
        const info = await User.findById(_id).select("-password").lean();
        const questionCount = await Question.countDocuments({ AuthorId: _id });
        const answerCount = await Answer.countDocuments({
            "createdBy._id": _id,
        });
        info.questionCount = questionCount;
        info.answerCount = answerCount;

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
    try {
        const info = await User.findById(userId).select("-password").lean();
        const questionCount = await Question.countDocuments({
            AuthorId: userId,
        });
        const answerCount = await Answer.countDocuments({
            "createdBy._id": userId,
        });
        info.questionCount = questionCount;
        info.answerCount = answerCount;

        res.status(200).json(info);
    } catch (error) {
        res.status(400).json({
            from: "get profile info",
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
    console.log("Image: (selectedImage) ", selectedImage);

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

        if (tagList?.length !== 0) {
            user.favTags = tagList;
        }
        if (bio !== "undefined") {
            user.bio = bio;
        }

        if (selectedImage && user?.image !== undefined) {
            console.log("selectedImage: ", user?.image);

            await removeFile(user?.image, "profiles");
            user.image = selectedImage;
        } else if (selectedImage) {
            console.log("selectedImage: ", user?.image);

            // await removeFile(user?.image, "profiles");
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

const followUnfollow = async (req, res) => {
    const { userId, follow } = req.body;
    const { _id } = req.body.profile;

    console.log("userId: ", userId);
    console.log("follow: ", follow);
    console.log("_id: ", _id);
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

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        console.log("users: ", users);
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const updateToInstructor = async (req, res) => {
    const { _id } = req.body.profile;
    try {
        const user = await User.findById(_id);
        console.log("users: ", user);
        user.instructor = true;
        await user.save();
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
module.exports = {
    signup,
    login,
    getProfileInfo,
    getPersonalInfo,
    updateProfile,
    followUnfollow,
    getAllUsers,
    updateToInstructor,
};
