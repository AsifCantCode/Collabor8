const User = require("../model/userModel");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs").promises; // Using the promisified version of fs
const path = require("path");
const generateToken = (_id, fullname, email, badge, subscriptionStatus) => {
    return jwt.sign(
        { _id, fullname, email, subscriptionStatus, badge },
        process.env.JWT_SECRET,
        {
            expiresIn: "30d",
        }
    );
};

const generatedHashedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

function isValidFullname(fullname) {
    fullname = fullname.trim();

    if (fullname.length < 3) {
        return false;
    }

    if (!/^[a-zA-Z\s]+$/.test(fullname)) {
        return false;
    }

    return true;
}

async function validateUser(email, fullname, password, confirmPassword) {
    if (!validator.isEmail(email)) {
        throw Error("Invalid email");
    }
    if (password !== confirmPassword) {
        throw Error("Passwords don't match");
    }
    if (!isValidFullname(fullname)) {
        throw Error(
            "Fullname must contain alphabets and atleast 3 characters long"
        );
    }
    if (!validator.isStrongPassword(password)) {
        throw Error("Password not strong enough");
    }

    const exists = await User.findOne({ email });

    if (exists) {
        throw Error("An user with same email exists");
    }
}

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
module.exports = {
    validateUser,
    generateToken,
    generatedHashedPassword,
    isValidFullname,
    removeFile,
};
