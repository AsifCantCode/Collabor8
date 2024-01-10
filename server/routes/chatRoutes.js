const express = require("express");

const {
    accessChat,
    fetchChats,
    sendMessage,
    getMessage,
} = require("../controllers/chatControllers.js");
const createMulterMiddleware = require("../middlewares/multerImageUploader.js");
const chatImageUpload = createMulterMiddleware("chats");

const router = express.Router();

router.route("/post").post(accessChat);
router.route("/get").get(fetchChats);
router.route("/sendmessage").post(chatImageUpload.array("images"), sendMessage);
router.route("/getmessage").get(getMessage);

module.exports = router;
