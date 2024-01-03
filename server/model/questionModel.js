
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const questionSchema = new mongoose.Schema({
    AuthorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    textContent: {
        type: String,
        required: true,
    },
    selectedImage: {
        type: Array,
        required: true,
    },
    tagList: {
        type: Array,
        required: true,
    },
});

module.exports = mongoose.model("Question", questionSchema);
