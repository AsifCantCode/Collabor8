import classes from "../../Styles/AnswerBox.module.css";

import { useRef, useState } from "react";

import NewAnswer from "./NewAnswer";
import SingleAnswer from "./SingleAnswer";
const AnswerBox = () => {
  const [upvote, setUpvote] = useState(0);
  const [downvote, setDownvote] = useState(0);
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);

  const handleUpvote = () => {
    if (upvoted) {
      setUpvote(upvote - 1);
      setUpvoted(false);
    } else {
      setUpvote(upvote + 1);
      setUpvoted(true);
    }
    if (downvoted) {
      setDownvote(downvote - 1);
      setDownvoted(false);
    }
  };
  const handleDownvote = () => {
    if (downvoted) {
      setDownvote(downvote - 1);
      setDownvoted(false);
    } else {
      setDownvote(downvote + 1);
      setDownvoted(true);
    }
    if (upvoted) {
      setUpvote(upvote - 1);
      setUpvoted(false);
    }
  };

  // Answer Input Section

  // Text
  const [answerText, setAnswerText] = useState("");
  // Image
  const [selectedImage, setSelectedImage] = useState([]);
  const [imageViewer, setImageViewer] = useState([]);
  const imageInputRef = useRef(null);
  const [fileError, setFileError] = useState(false);

  // Submit Answer Section
  const handleConfirmAnswer = async (e) => {
    e.preventDefault();

    console.log(answerText, selectedImage);
  };
  // Edit Answer Mode
  const [editMode, setEditMode] = useState(false);
  const handleConfirmEdit = () => {
    setEditMode(false);
  };
  return (
    <div className={`${classes["AnswerBox"]}`}>
      <div className={`${classes["component-header"]}`}>
        <h3>Answers</h3>
      </div>
      <div className={`${classes["answers"]}`}>
        {editMode ? (
          <NewAnswer
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            imageViewer={imageViewer}
            setImageViewer={setImageViewer}
            imageInputRef={imageInputRef}
            fileError={fileError}
            setFileError={setFileError}
            editMode={editMode}
            handleConfirmEdit={handleConfirmEdit}
            setPreviousImages={setImageViewer}
            previousImages={imageViewer}
          />
        ) : (
          <SingleAnswer
            upvote={upvote}
            downvote={downvote}
            upvoted={upvoted}
            downvoted={downvoted}
            handleUpvote={handleUpvote}
            handleDownvote={handleDownvote}
            setEditMode={setEditMode}
          />
        )}

        <NewAnswer
          answerText={answerText}
          setAnswerText={setAnswerText}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          imageViewer={imageViewer}
          setImageViewer={setImageViewer}
          imageInputRef={imageInputRef}
          fileError={fileError}
          setFileError={setFileError}
          handleConfirmAnswer={handleConfirmAnswer}
        />
      </div>
    </div>
  );
};

export default AnswerBox;
