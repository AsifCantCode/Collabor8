const express = require("express");
const requireAuth = require("../middlewares/requireAuth");
const isLoggedIn = require("../middlewares/isLoggedIn.js");
const multer = require("multer"); // for handling file uploads
const path = require("path"); // for handling file paths

const {
  uploadQuestions,
  signup,
  login,
  getProfileInfo,
  getAllQuestions
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

const upload = multer({
  storage: storage,
  limits: { fieldSize: 2 * 1024 * 1024 },
});

router
  .route("/add-question")
  .post(requireAuth, upload.array("image"), uploadQuestions);

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/").get(requireAuth, getProfileInfo);
router.route("/all-questions").get(isLoggedIn, getAllQuestions);

module.exports = router;
