const express = require("express");

const {
    accessChat,
    fetchChats,
    sendMessage,
} = require("../controllers/chatControllers.js");

const router = express.Router();

router.route("/post").post(accessChat);
router.route("/get").get(fetchChats);
router.route("/sendmessage").post(sendMessage);

module.exports = router;
