const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
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
  upVotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  downVotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
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

// Function to handle upvoting
questionSchema.methods.upVote = async function (userId) {
  if (!this.upVotes.includes(userId)) {
    this.upVotes.push(userId);
    this.countUpVotes += 1;

    // If the user has previously downvoted, remove the downvote
    if (this.downVotes.includes(userId)) {
      this.downVotes = this.downVotes.filter(
        (id) => id.toString() !== userId.toString()
      );
      if (this.countDownVotes > 0) {
        this.countDownVotes -= 1;
      }
    }

    await this.save();
    return this;
  }
};

// Function to handle downvoting
questionSchema.methods.downVote = async function (userId) {
  if (!this.downVotes.includes(userId)) {
    this.downVotes.push(userId);
    this.countDownVotes += 1;

    // If the user has previously upvoted, remove the upvote
    if (this.upVotes.includes(userId)) {
      this.upVotes = this.upVotes.filter(
        (id) => id.toString() !== userId.toString()
      );
      if (this.countUpVotes > 0) {
        this.countUpVotes -= 1;
      }
    }

    await this.save();
    return this;
  }
};

module.exports = mongoose.model("Question", questionSchema);
