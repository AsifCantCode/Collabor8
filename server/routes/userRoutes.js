const express = require("express");
const requireAuth = require("../middlewares/requireAuth");
const multer = require("multer"); // for handling file uploads
const path = require("path"); // for handling file paths

const {
    uploadQuestions,
} = require("../controllers/userControllers");

const router = express.Router();

// Create a multer storage configuration to save the uploaded file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname + "_" + Date.now() + path.extname(file.originalname)
        );
    },
}); // You can use a disk storage if needed

const upload = multer({ storage: storage });

router
    .route("/add-question")
    .post(requireAuth, upload.array("image"), uploadQuestions);

// router.route("/login").post(checkLogin);

module.exports = router;
