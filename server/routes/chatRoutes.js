const express = require("express");

const {
    accessChat,
    fetchChats,
    sendMessage,
    getMessage,
} = require("../controllers/chatControllers.js");

const router = express.Router();

router.route("/post").post(accessChat);
router.route("/get").get(fetchChats);
router.route("/sendmessage").post(sendMessage);
router.route("/getmessage").get(getMessage);

module.exports = router;
