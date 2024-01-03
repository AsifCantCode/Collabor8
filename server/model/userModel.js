const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  bio: String,
  favTags: [String],
  badge: String,
  points: Number,
  follower: Number,
  subscription: {
    status: Boolean,
    plan: String,
    expire: Date,
  },
  expertUser: Boolean,
  following: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      fullname: String,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
