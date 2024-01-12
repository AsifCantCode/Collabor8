const express = require("express");
const requireAuth = require("../middlewares/requireAuth");
const isLoggedIn = require("../middlewares/isLoggedIn.js");

const {
    signup,
    login,
    getProfileInfo,
    getPersonalInfo,
    updateProfile,
    followUnfollow,
    getAllUsers,
    updateToInstructor,
} = require("../controllers/userControllers");

const {
    subscribe,
    checkSubscription,
} = require("../controllers/subscriptionControllers");

const {
    uploadAnswer,
    updateAnswer,
    upvoteDownvoteAnswer,
    markAnswerAsCorrect,
    addComment,
    updateComment,
} = require("../controllers/answerControllers.js");

const {
    addToCollection,
    removeFromCollection,
    getCollections,
} = require("../controllers/collectionControllers.js");

const {
    uploadQuestions,
    updateQuestion,
    getWholeQuestion,
    getPersonalQuestions,
    relatedQuestions,
    tagBasedQuestions,
    getAllQuestions,
    getPopularTags,
    getAllTags,
    upvoteDownvoteQuestion,
    getAllRelatedQuestions,
} = require("../controllers/questionControllers.js");

const router = express.Router();

//UPLOADING IMAGE UPLOAD MIDDLE WARES
const createMulterMiddleware = require("../middlewares/multerImageUploader.js");
const questionImageUpload = createMulterMiddleware("questions");
const profileImageUpload = createMulterMiddleware("profiles");
const answerImageUpload = createMulterMiddleware("answers");
const chatImageUpload = createMulterMiddleware("chats");

/**PROFILE ROUTES */
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/").get(requireAuth, getPersonalInfo);
router.route("/get-profile").get(getProfileInfo);
router
    .route("/update-profile")
    .put(requireAuth, profileImageUpload.array("images"), updateProfile);
router.route("/follow-unfollow").put(requireAuth, followUnfollow);
router.route("/updateToInstructor").put(requireAuth, updateToInstructor);

/**QUESTION ROUTES */
router
    .route("/add-question")
    .post(requireAuth, questionImageUpload.array("images"), uploadQuestions);
router
    .route("/update-question")
    .put(requireAuth, questionImageUpload.array("images"), updateQuestion);
router.route("/all-questions").get(isLoggedIn, getAllQuestions);
router.route("/tag-questions").get(tagBasedQuestions);
router.route("/related-questions").get(relatedQuestions);
router.route("/personal-questions").get(getPersonalQuestions);
router.route("/popular-tags").get(getPopularTags);
router.route("/all-tags").get(getAllTags);
router.route("/upvote-downvote").put(requireAuth, upvoteDownvoteQuestion);
router.route("/single-question").get(getWholeQuestion);

/**ANSWER ROUTES */
router.route("/upvote-downvote-ans").put(requireAuth, upvoteDownvoteAnswer);
router.route("/mark-as-correct").put(requireAuth, markAnswerAsCorrect);
router
    .route("/add-answer")
    .post(requireAuth, answerImageUpload.array("images"), uploadAnswer);
router
    .route("/update-answer")
    .put(requireAuth, answerImageUpload.array("images"), updateAnswer);
router.route("/add-comment").post(requireAuth, addComment);
router.route("/update-comment").put(requireAuth, updateComment);

//Collection Routes
router.route("/add-to-collection").post(requireAuth, addToCollection);
router
    .route("/remove-from-collection")
    .delete(requireAuth, removeFromCollection);

// Chat Route
router.route("/get-all-user").get(getAllUsers);
router.route("/get-all-collections").get(requireAuth, getCollections);

//Subscription routes
router.route("/subscribe").post(requireAuth, subscribe);
router.route("/check-for-subscribe").put(requireAuth, checkSubscription);

//Search Routes
router.route("/search").get(getAllRelatedQuestions);
module.exports = router;
