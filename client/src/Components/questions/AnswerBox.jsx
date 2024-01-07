import classes from "../../Styles/AnswerBox.module.css";

import { useRef, useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";
import UserApi from "../../Apis/UserApi";
import { useAuthContext } from "../../Hooks/useAuthContext";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  //   useEffect(() => {
  //     toast.onChange((payload) => {
  //         if (payload.status === "removed") {
  //             setLoading(false);
  //             navigate("/");
  //         }
  //     });
  // }, []);

  const handleConfirmAnswer = async (e) => {
    e.preventDefault();
    const questionId = "60b9b6b6e6b9c2b4e0f7f7b5"; //dummy

    console.log(answerText, selectedImage);
    const formData = new FormData();
    formData.append("answerText", answerText);
    formData.append("questionId", questionId);
    for (let i = 0; i < selectedImage.length; i++) {
      formData.append("images", selectedImage[i]);
    }

    try {
      const response = await UserApi.post("/add-answer", formData, {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      });
      setLoading(false);

      // toast.success(
      //     "Question Added Successfully !! Navigating to home page...",
      //     {
      //         position: toast.POSITION.TOP_RIGHT,
      //         autoClose: 1500,
      //     }
      // );
      console.log("ANSWER QUESTION Response: ", response.data);
    } catch (err) {
      console.log("ANSWER QUESTION ERROR: ", err);
      setLoading(false);
      setError(err.response.data.error);
    }
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
