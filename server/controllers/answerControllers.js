const jwt = require("jsonwebtoken");
const Question = require("../model/questionModel");
const Answer = require("../model/answerModel");
const User = require("../model/userModel");
const { removeFile } = require("../utilities/account");

const uploadAnswer = async (req, res) => {
    const { answerText, questionId } = req.body;
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];

    const selectedImage = req.files.map((file) => file.filename);

    try {
        const { _id, fullname } = jwt.verify(token, process.env.JWT_SECRET);
        const answer = await Answer.create({
            answerText,
            images: selectedImage,
            createdBy: { _id, fullname },
            questionId,
        });
        const question = await Question.findByIdAndUpdate(
            questionId,
            { $push: { answers: answer._id } },
            { new: true }
        );
        //Assigning points
        const user = await User.findById(_id);
        await user.increasePoints(2);

        res.status(200).json(answer);
    } catch (error) {
        res.status(400).json({
            from: "uploadAnswers",
            error: error.message,
        });
    }
};

const updateAnswer = async (req, res) => {
    const { answerText, answerId, previousImages } = req.body;
    console.log("AnswerID ", answerId);
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];

    const selectedImages = req.files.map((file) => file.filename);
    const prevValid = previousImages.split(",");
    console.log("PreviousImages: ", typeof prevValid, prevValid);
    console.log("selectedImages: ", selectedImages);
    const newImageArray = [...prevValid, ...selectedImages];
    try {
        const { _id, fullname } = jwt.verify(token, process.env.JWT_SECRET);
        console.log("USERID: ", _id);
        // Find the question by ID and ensure that the user has permission to update it
        const existingAnswer = await Answer.findOne({
            _id: answerId,
            // createdBy: { _id, fullname },
            "createdBy._id": _id,
        });

        if (!existingAnswer) {
            throw Error("Answer not found or unauthorized");
        }
        let absentElements = existingAnswer.images.filter(
            (image) => !newImageArray.includes(image)
        );
        console.log("ABSENT: ", absentElements.length);

        // Update the question fields
        existingAnswer.answerText = answerText;
        if (absentElements.length > 0) {
            for (const filename of absentElements) {
                await removeFile(filename, "answers");
            }
            existingQuestion.images = newImageArray;
        }
        existingAnswer.updatedAt = new Date();

        // Save the updated question
        await existingAnswer.save();

        res.status(200).json(existingAnswer);
    } catch (error) {
        res.status(400).json({
            from: "updateAnswer",
            error: error.message,
        });
    }
};

const upvoteDownvoteAnswer = async (req, res) => {
    const { answerId, upvote } = req.body;
    const { _id } = req.body.profile;

    try {
        const answer = await Answer.findById(answerId);
        const answerAuthor = await User.findById(answer.createdBy._id);
        let updatedAnswer;
        if (upvote) {
            updatedAnswer = await answer.upVote(_id);
            if (updatedAnswer) {
                await answerAuthor.increasePoints(2);
            }
        } else {
            updatedAnswer = await answer.downVote(_id);
            if (updatedAnswer) {
                await answerAuthor.decreasePoints(1);
            }
        }

        res.status(200).json({ updatedAnswer });
    } catch (error) {
        res.status(400).json({
            from: "from upvote-downvote-answer",
            error: error.message,
        });
    }
};
const markAnswerAsCorrect = async (req, res) => {
    const { answerId } = req.body;
    try {
        const updatedAnswer = await Answer.findByIdAndUpdate(
            answerId,
            { isAccepted: true },
            { new: true }
        );

        // Increase the points of the user who posted the answer
        const answerAuthor = await User.findById(updatedAnswer.createdBy._id);
        await answerAuthor.increasePoints(10);

        // Update the corresponding question to mark it as solved
        const updatedQuestion = await Question.findOneAndUpdate(
            { _id: updatedAnswer.questionId },
            { isSolved: true },
            { new: true }
        );

        // Increase the points of the user who posted the question
        const questionAuthor = await User.findById(updatedQuestion.AuthorId);
        await questionAuthor.increasePoints(5);

        console.log(`Answer marked as correct: ${updatedAnswer}`);
    } catch (error) {
        console.error("Error marking answer as correct:", error.message);
    }
};

const addComment = async (req, res) => {
    const { answerId, commentText } = req.body;
    const { _id, fullname } = req.body.profile;
    try {
        const answer = await Answer.findById(answerId);
        const comment = {
            commentText,
            createdBy: { _id, fullname },
        };
        answer.comments.push(comment);
        await answer.save();
        res.status(200).json(answer);
    } catch (error) {
        res.status(400).json({
            from: "addComment",
            error: error.message,
        });
    }
};

const updateComment = async (req, res) => {
    const { answerId, commentArray } = req.body;
    const { _id, fullname } = req.body.profile;
    try {
        const answer = await Answer.findById(answerId);
        answer.comments = commentArray;
        await answer.save();
        res.status(200).json(answer);
    } catch (error) {
        res.status(400).json({
            from: "updateComment",
            error: error.message,
        });
    }
};

module.exports = {
    uploadAnswer,
    updateAnswer,
    upvoteDownvoteAnswer,
    markAnswerAsCorrect,
    addComment,
    updateComment,
};
