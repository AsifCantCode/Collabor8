const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
    {
        chatName: {
            type: String,
            trim: true,
        },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        isOpen: {
            enum: ["open", "close", "pending"],
            default: "close",
            type: String,
        },
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Chat", chatSchema);
