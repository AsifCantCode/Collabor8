const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  answer: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
  },
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  isAccepted: {
    type: Boolean,
    default: false,
  },
  countUpvote: {
    type: Number,
    default: 0,
  },
  countDownvote: {
    type: Number,
    default: 0,
  },
  countComments: {
    type: Number,
    default: 0,
  },
  comments: {
    count: {
      type: Number,
      default: 0,
    },
    commentList: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comment",
        },
        fullname: {
          type: String,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
  },
});

const Answer = mongoose.model("Answer", answerSchema);

module.exports = Answer;
