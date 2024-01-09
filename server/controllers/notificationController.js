const Notification = require("../model/notificationModel");

const addNotification = async (
    userTo,
    notificationType,
    entityId,
    socketServer
) => {
    try {
        const notification = await Notification.create({
            userTo,
            notificationType,
            entityId,
        });

        console.log("userTo", userTo);
        console.log("newNotification", notification);
        // Emit the notification to the user
        let newNotificationWithUserandEntityDetails;
        if (notification.notificationType === "message") {
            const entityId = await notification.populate({
                path: "entityId",
                model: "Message",
                populate: {
                    path: "sender",
                },
            });
            newNotificationWithUserandEntityDetails = {
                ...notification._doc,
                userTo,
                entityId,
            };
        } else if (notification.notificationType === "answer") {
            const entityId = await notification.populate({
                path: "entityId",
                model: "Question",
            });
            newNotificationWithUserandEntityDetails = {
                ...notification._doc,
                userTo,
                entityId,
            };
        }
        socketServer
            .to(userTo)
            .emit("notification", newNotificationWithUserandEntityDetails);

        return newNotificationWithUserandEntityDetails;
    } catch (error) {
        console.error("Error adding notification:", error);
        throw error;
    }
};

const getNotifications = async (req, res) => {
    const { userId } = req.query;
    try {
        const notifications = await Notification.find({ userTo: userId });
        // .populate("userTo")
        // .populate("entityId");

        const allNotificationWithUserandEntityDetails = await Promise.all(
            notifications.map(async (notification) => {
                const userTo = await notification.populate("userTo");
                if (notification.notificationType === "message") {
                    const entityId = await notification.populate({
                        path: "entityId",
                        model: "Message",
                        populate: {
                            path: "sender",
                        },
                    });
                    return { ...notification._doc, userTo, entityId };
                } else if (notification.notificationType === "answer") {
                    const entityId = await notification.populate({
                        path: "entityId",
                        model: "Question",
                    });
                    return { ...notification._doc, userTo, entityId };
                }
            })
        );
        res.status(200).json(allNotificationWithUserandEntityDetails);
    } catch (error) {
        console.error("Error getting notifications:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { addNotification, getNotifications };
