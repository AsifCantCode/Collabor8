const jwt = require("jsonwebtoken");
const Question = require("../model/questionModel");
const Answer = require("../model/answerModel");

const uploadAnswer = async (req, res) => {
  const { textContent, questionId } = req.body;
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  const selectedImage = req.files.map((file) => file.filename);

  try {
    const { _id, fullname } = jwt.verify(token, process.env.JWT_SECRET);
    const answer = await Answer.create({
      answer: textContent,
      images: selectedImage,
      createdBy: { _id, fullname },
      questionId,
    });
    const question = await Question.findByIdAndUpdate(
      questionId,
      { $push: { answers: answer._id } },
      { new: true }
    );
    res.status(200).json(answer);
  } catch (error) {
    res.status(400).json({
      from: "uploadAnswers",
      error: error.message,
    });
  }
};

const updateAnswer = async (req, res) => {
  const { textContent, answerId } = req.body;
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  const selectedImage = req.files.map((file) => file.filename);
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    // Find the question by ID and ensure that the user has permission to update it
    const existingAnswer = await Answer.findOne({
      _id: answerId,
      createdBy: { _id },
    });

    if (!existingAnswer) {
      throw Error("Answer not found or unauthorized");
    }

    // Update the question fields
    existingAnswer.answer = textContent;
    existingAnswer.images = selectedImage;
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
    let updatedAnswer;
    if (upvote) {
      updatedAnswer = await answer.upVote(_id);
    } else {
      updatedAnswer = await answer.downVote(_id);
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

    // Access the associated question ID from the updated answer
    const questionId = updatedAnswer.questionId;

    // Update the corresponding question to mark it as solved
    await Question.updateOne({ _id: questionId }, { isSolved: true });

    console.log(`Answer marked as correct: ${updatedAnswer}`);
  } catch (error) {
    console.error("Error marking answer as correct:", error.message);
  }
};

module.exports = {
  uploadAnswer,
  updateAnswer,
  upvoteDownvoteAnswer,
  markAnswerAsCorrect,
};
