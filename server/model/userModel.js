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
  image: String,
  favTags: [String],
  badge: {
    type: String,
    default: "newbie",
  },
  points: {
    type: Number,
    default: 10,
  },
  followers: {
    type: Number,
    default: 0,
  },
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

// Add a method to the schema for following a user
userSchema.methods.followUser = async function (userToFollow) {
  // Check if the user is not already being followed
  const isAlreadyFollowing = this.following.some(
    (user) => user._id.toString() === userToFollow._id.toString()
  );

  if (!isAlreadyFollowing) {
    this.following.push({
      _id: userToFollow._id,
      fullname: userToFollow.fullname,
    });

    userToFollow.followers += 1; // Increment the follower count
    await userToFollow.save();

    await this.save();
    return this;
  }
};

// Add a method to the schema for unfollowing a user
userSchema.methods.unfollowUser = async function (userToUnfollow) {
  this.following = this.following.filter(
    (user) => user._id.toString() !== userToUnfollow._id.toString()
  );

  if (userToUnfollow.followers > 0) {
    userToUnfollow.followers -= 1; // Decrement the follower count
    await userToUnfollow.save();
  }

  await this.save();
  return this;
};

module.exports = mongoose.model("User", userSchema);
