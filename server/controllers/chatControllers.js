const Chat = require("../model/chatModel");
const User = require("../model/userModel");

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
module.exports = {
    accessChat,
    fetchChats,
};
