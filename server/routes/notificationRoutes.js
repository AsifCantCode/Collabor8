const express = require("express");

const {
    getNotifications,
    markAsOpened,
} = require("../controllers/notificationController");

const router = express.Router();

router.get("/", getNotifications);
router.put("/markAsOpened", markAsOpened);

module.exports = router;
