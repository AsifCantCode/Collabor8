const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema(
    {
        userTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        notificationType: {
            type: String,
            enum: ["message", "post", "other"],
            required: true,
        },
        opened: { type: Boolean, default: false },
        entityId: mongoose.Schema.Types.ObjectId,
    },
    { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
