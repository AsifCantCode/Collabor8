const express = require("express");

const { accessChat, fetchChats } = require("../controllers/chatControllers.js");

const router = express.Router();

router.route("/post").post(accessChat);
router.route("/get").get(fetchChats);

module.exports = router;
