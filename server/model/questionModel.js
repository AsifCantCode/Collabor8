const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const questionSchema = new mongoose.Schema({
  AuthorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  textContent: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  selectedImage: {
    type: Array,
    required: true,
  },
  tagList: {
    type: Array,
    required: true,
  },
  postTime: {
    type: Date,
    default: Date.now,
  },
  updateTime: {
    type: Date,
    default: Date.now,
  },
  countUpVotes: {
    type: Number,
    default: 0,
  },
  countDownVotes: {
    type: Number,
    default: 0,
  },
  countAnswers: {
    type: Number,
    default: 0,
  },
  isSolved: {
    type: Boolean,
    default: false,
  },
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer",
    },
  ],
});

module.exports = mongoose.model("Question", questionSchema);
