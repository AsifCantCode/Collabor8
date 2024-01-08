const Notification = require("../model/notificationModel");

const addNotification = async (
    userTo,
    notificationType,
    entityId,
    socketServer
) => {
    try {
        const newNotification = await Notification.create({
            userTo,
            notificationType,
            entityId,
        });

        console.log("userTo", userTo);
        console.log("newNotification", newNotification);
        // Emit the notification to the user
        socketServer.to(userTo).emit("notification", newNotification);

        return newNotification;
    } catch (error) {
        console.error("Error adding notification:", error);
        throw error;
    }
};

const getNotifications = async (req, res) => {
    try {
        const { user } = req;

        const notifications = await Notification.find({ userTo: user._id })
            .populate("userTo")
            .populate("entityId");

        res.status(200).json(notifications);
    } catch (error) {
        console.error("Error getting notifications:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { addNotification };
