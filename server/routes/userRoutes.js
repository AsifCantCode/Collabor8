const express = require("express");
const requireAuth = require("../middlewares/requireAuth");
const isLoggedIn = require("../middlewares/isLoggedIn.js");

const {
  uploadQuestions,
  signup,
  login,
  getProfileInfo,
  getAllQuestions,
  tagBasedQuestions,
  relatedQuestions,
  getPersonalQuestions,
  getWholeQuestion,
  getPopularTags,
  getAllTags,
  updateQuestion,
  updateProfile,
} = require("../controllers/userControllers");

const router = express.Router();

//UPLOADING MIDDLE WARES
const questionUpload = require("../middlewares/questionUpload.js");
const profileImageUpload = require("../middlewares/profileImageUpload.js");

router
  .route("/add-question")
  .post(requireAuth, questionUpload.array("images"), uploadQuestions);
router
  .route("/update-question")
  .put(requireAuth, questionUpload.array("images"), updateQuestion);
router
  .route("/update-profile")
  .put(requireAuth, profileImageUpload.array("images"), updateProfile);

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/").get(requireAuth, getProfileInfo);
router.route("/all-questions").get(requireAuth, isLoggedIn, getAllQuestions);
router.route("/tag-questions/:tagName").get(tagBasedQuestions);
router.route("/related-questions/:tagNames").get(relatedQuestions);
router.route("/personal-question/:userId").get(getPersonalQuestions);
//Dummy function
router.route("/whole-question/:questionId").get(getWholeQuestion);
router.route("/popular-tags").get(requireAuth, getPopularTags);
router.route("/all-tags").get(requireAuth, getAllTags);

module.exports = router;
