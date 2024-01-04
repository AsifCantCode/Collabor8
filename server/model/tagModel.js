const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  count: {
    type: Number,
    required: true,
    default: 0,
  },
});

// Define a static method to find or create a tag
tagSchema.statics.findOrCreate = async function (name) {
  // Find the tag by name, and update the count or create a new one if not found
  const tag = await this.findOneAndUpdate(
    { name },
    { $inc: { count: 1 } }, // Increment the count by 1
    { upsert: true, new: true }
  );

  return tag;
};

module.exports = mongoose.model("Tag", tagSchema);
