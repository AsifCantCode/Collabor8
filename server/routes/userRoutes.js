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
  followUnfollow,
  upvoteDownvote,
} = require("../controllers/userControllers");

const router = express.Router();

//UPLOADING IMAGE UPLOAD MIDDLE WARES
const questionUpload = require("../middlewares/questionUpload.js");
const profileImageUpload = require("../middlewares/profileImageUpload.js");
const answerImageUpload = require("../middlewares/answerImageUpload.js");

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
router.route("/all-questions").get(isLoggedIn, getAllQuestions);
router.route("/tag-questions").get(tagBasedQuestions);
router.route("/related-questions").get(relatedQuestions);
router.route("/personal-questions").get(requireAuth, getPersonalQuestions);
router.route("/popular-tags").get(getPopularTags);
router.route("/all-tags").get(getAllTags);
router.route("/follow-unfollow").put(requireAuth, followUnfollow);
router.route("/upvote-downvote").put(requireAuth, upvoteDownvote);
router.route("/single-question").get(getWholeQuestion);
//Dummy function

module.exports = router;
