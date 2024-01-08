const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
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
    enum: ["newbie", "intermediate", "expert", "master", "legend"],
  },
  points: {
    type: Number,
    default: 0,
  },
  followers: {
    type: Number,
    default: 0,
  },
  subscription: {
    status: {
      type: Boolean,
      default: false,
    },
    plan: String,
    expire: Date,
  },
  instructor: {
    type: Boolean,
    default: false,
  },
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

// Function to assign a badge
userSchema.methods.assignBadge = async function () {
  try {
    let badges = ["newbie", "intermediate", "expert", "master", "legend"];
    if (this.points >= 500) this.badge = badges[1];
    else if (this.points >= 1500) this.badge = badges[2];
    else if (this.points >= 3000) {
      this.badge = badges[3];
      this.instructor = true;
    } else if (this.points >= 5000) this.badge = badges[4];
    else this.badge = badges[0];
    await this.save();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// Function to increase points
userSchema.methods.increasePoints = async function (amount) {
  try {
    this.points += amount;
    await this.save();
    await this.assignBadge();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Function to decrease points
userSchema.methods.decreasePoints = async function (amount) {
  try {
    this.points = Math.max(0, this.points - amount);
    await this.save();
    await this.assignBadge();
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error for proper handling
  }
};

module.exports = mongoose.model("User", userSchema);
