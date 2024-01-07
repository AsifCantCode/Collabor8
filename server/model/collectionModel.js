const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    questionIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question",
        },
    ],
});

module.exports = mongoose.model("Collection", collectionSchema);