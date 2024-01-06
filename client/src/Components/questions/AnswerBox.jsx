import classes from "../../Styles/AnswerBox.module.css";

import { FaCircleUser } from "react-icons/fa6";
import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
import { useRef, useState } from "react";
import textImage from "../../assets/Screenshot 2023-10-14 172945.png";
import { SmallButton, SmallButtonLite, SmallButtonLiteAc } from "../Buttons";
import ImageInputAndViewer from "./ImageInputAndViewer";
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
    return (
        <div className={`${classes["AnswerBox"]}`}>
            <div className={`${classes["component-header"]}`}>
                <h3>Answers</h3>
            </div>
            <div className={`${classes["answers"]}`}>
                <div className={`${classes["answer"]}`}>
                    <SmallButton text="Edit Answer" />
                    <div className={`${classes["answer-header"]}`}>
                        <div className={`${classes["info"]}`}>
                            <h4 className={`${classes["answer-author"]}`}>
                                <FaCircleUser />{" "}
                                <span>Tanvir Hossain Dihan</span>
                            </h4>
                            <p className={`${classes["answer-date"]}`}>
                                Answered 2 days ago
                            </p>
                        </div>
                        <div className={`${classes["up-down-votes"]}`}>
                            <p
                                className={`${
                                    upvoted ? classes["upvote"] : ""
                                }`}
                            >
                                {upvote}
                            </p>
                            <FaThumbsUp
                                className={`${
                                    upvoted ? classes["upvote"] : ""
                                }`}
                                onClick={handleUpvote}
                            />
                            <FaThumbsDown
                                className={`${
                                    downvoted ? classes["downvote"] : ""
                                }`}
                                onClick={handleDownvote}
                            />
                            <p
                                className={`${
                                    downvoted ? classes["downvote"] : ""
                                }`}
                            >
                                {downvote}
                            </p>
                        </div>
                    </div>
                    <div className={`${classes["answer-body"]}`}>
                        <div className={`${classes["answer-text"]}`}>
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Quisquam, voluptatum
                                voluptates. Quibusdam, voluptatibus. Quae
                                molestias, voluptates, quod, quia accusamus
                                voluptatibus autem iusto voluptate quibusdam
                                doloremque quos tempore? Repellat, voluptatum
                                quibusdam.
                            </p>
                        </div>
                        <div className={`${classes["answer-attachments"]}`}>
                            <div className={`${classes["image"]}`}>
                                <img src={textImage} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${classes["answer"]}`}>
                    <textarea name="" id=""></textarea>
                    <ImageInputAndViewer
                        selectedImage={selectedImage}
                        setSelectedImage={setSelectedImage}
                        imageViewer={imageViewer}
                        setImageViewer={setImageViewer}
                        imageInputRef={imageInputRef}
                        fileError={fileError}
                        setFileError={setFileError}
                        width="5rem"
                        height="5rem"
                    />
                    <div className={`${classes["submit-btn"]}`}>
                        <SmallButtonLiteAc text="Post Answer" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnswerBox;
