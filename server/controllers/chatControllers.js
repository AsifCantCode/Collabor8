const Chat = require("../model/chatModel");
const User = require("../model/userModel");
const Message = require("../model/messageModel");
// const { socketServer } = require("../utilities/socketService");

// const { addNotification } = require("./notificationController");
const accessChat = async (req, res) => {
    const { ownId, otherId } = req.body;
    console.log("ownId", ownId);
    console.log("otherId", otherId);

    // if (!userId) {
    //     console.log("UserId param not sent with request");
    //     return res.sendStatus(400);
    // }

    var isChat = await Chat.find({
        $and: [
            { users: { $elemMatch: { $eq: ownId } } },
            { users: { $elemMatch: { $eq: otherId } } },
        ],
    })
        .populate("users", "-password")
        .populate("latestMessage");

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email",
    });

    if (isChat.length > 0) {
        console.log("OLD CHAT FOUND");
        res.send(isChat[0]);
    } else {
        console.log("NO OLD CHAT FOUND");
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [ownId, otherId],
        };

        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({
                _id: createdChat._id,
            }).populate("users", "-password");
            res.status(200).json(FullChat);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
};

const fetchChats = async (req, res) => {
    const { userId } = req.query;
    try {
        Chat.find({ users: { $elemMatch: { $eq: userId } } })
            .populate("users", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "name pic email",
                });
                res.status(200).send(results);
            });
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
};

const sendMessage = async (req, res) => {
    const { chatId, content, messageType } = req.body;
    console.log("chatId", chatId);
    console.log("content", content);
    const { userId } = req.query;
    console.log("userId", userId);
    if (!chatId) {
        console.log("Invalid data passed into request");
        return res.sendStatus(400);
    }

    const selectedImage = req.files.map((file) => file.filename);
    const newMessage = {
        sender: userId,
        content: content,
        chat: chatId,
        images: selectedImage,
        messageType: messageType,
    };

    try {
        const fixChatStatus = await Chat.findById(chatId);
        if (messageType === "request") {
            fixChatStatus.isOpen = "pending";
        } else if (messageType === "accept") {
            fixChatStatus.isOpen = "open";
        } else if (messageType === "reject") {
            fixChatStatus.isOpen = "close";
        }
        await fixChatStatus.save();
        const message = await Message.create(newMessage);
        const populatedMessage = await Message.findById(message._id)
            .populate("sender", "-password")
            .populate({
                path: "chat",
                populate: {
                    path: "users",
                    model: "User",
                },
            });
        await Chat.findByIdAndUpdate(chatId, {
            latestMessage: populatedMessage,
        });

        const receiverId = populatedMessage.chat.users.find(
            (user) => user._id.toString() !== userId
        );
        // console.log("SocketServer", socketServer);
        // addNotification(
        //     receiverId._id,
        //     "message",
        //     populatedMessage._id,
        //     socketServer
        // );
        res.json(populatedMessage);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
};

const getMessage = async (req, res) => {
    const { chatId } = req.query;
    try {
        const messages = await Message.find({ chat: chatId })
            .populate("sender", "-password")
            .populate({
                path: "chat",
                populate: {
                    path: "users",
                    model: "User",
                },
            });
        res.json(messages);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
};
module.exports = {
    accessChat,
    fetchChats,
    sendMessage,
    getMessage,
};
