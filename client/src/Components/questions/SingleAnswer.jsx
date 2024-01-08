import classes from "../../Styles/AnswerBox.module.css";
import {
    SmallButtonAc,
    SmallButtonDeepAc,
    SmallButtonLiteAc,
} from "../Buttons";

import { FaCircleUser } from "react-icons/fa6";
import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
import textImage from "../../assets/Screenshot 2023-10-14 172945.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
    formatDateAndTimeFromString,
    makeAnswerImageURL,
} from "../../Utilities/utilities";
const SingleAnswer = (props) => {
    const { setEditMode, answer } = props;

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
    const [replyMode, setReplyMode] = useState(false);
    const [replyText, setReplyText] = useState("");
    const [editReplyMode, setEditReplyMode] = useState(false);
    const handleReply = () => {
        setReplyMode((prev) => !prev);
    };

    const submitReply = () => {
        console.log(replyText);
        setReplyMode(false);
    };
    const handleSubmitReply = () => {
        console.log(replyText);
        setEditReplyMode(false);
    };
    return (
        <div className={`${classes["answer"]}`}>
            <SmallButtonAc
                func={() => setEditMode((prev) => !prev)}
                text="Edit Answer"
            />
            <div className={`${classes["answer-header"]}`}>
                <div className={`${classes["info"]}`}>
                    <h4 className={`${classes["answer-author"]}`}>
                        <FaCircleUser />{" "}
                        <span>{answer?.createdBy?.fullname}</span>
                    </h4>
                    <p className={`${classes["answer-date"]}`}>
                        {formatDateAndTimeFromString(answer?.createdAt)}
                    </p>
                </div>
                <div className={`${classes["up-down-votes"]}`}>
                    <p className={`${upvoted ? classes["upvote"] : ""}`}>
                        {upvote}
                    </p>
                    <FaThumbsUp
                        className={`${upvoted ? classes["upvote"] : ""}`}
                        onClick={handleUpvote}
                    />
                    <FaThumbsDown
                        className={`${downvoted ? classes["downvote"] : ""}`}
                        onClick={handleDownvote}
                    />
                    <p className={`${downvoted ? classes["downvote"] : ""}`}>
                        {downvote}
                    </p>
                </div>
            </div>
            <div className={`${classes["answer-body"]}`}>
                <div className={`${classes["answer-text"]}`}>
                    <p>{answer?.answerText}</p>
                </div>
                <div className={`${classes["answer-attachments"]}`}>
                    {answer?.images?.map((image, index) => {
                        return (
                            <div key={index} className={`${classes["image"]}`}>
                                <img src={makeAnswerImageURL(image)} alt="" />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className={`${classes["replies"]}`}>
                <h3>Replies</h3>
                <div className={`${classes["reply"]}`}>
                    <div className={`${classes["reply-header"]}`}>
                        <h4>Tanvir Hossain Dihan</h4>
                        {!editReplyMode && (
                            <SmallButtonAc
                                func={() => setEditReplyMode(true)}
                                text={"Edit Reply"}
                            />
                        )}
                    </div>

                    {editReplyMode ? (
                        <div className={`${classes["reply-input"]}`}>
                            <textarea name="" id=""></textarea>
                            <SmallButtonDeepAc
                                text={"Confirm Edit"}
                                func={handleSubmitReply}
                            />
                        </div>
                    ) : (
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Dignissimos sed esse explicabo. Officiis
                            aspernatur itaque, accusamus quidem dolorum quisquam
                            omnis.
                        </p>
                    )}
                </div>
                <div className={`${classes["reply"]}`}>
                    <div className={`${classes["reply-header"]}`}>
                        <h4>Tanvir Hossain Dihan</h4>
                        {!editReplyMode && (
                            <SmallButtonAc
                                func={() => setEditReplyMode(true)}
                                text={"Edit Reply"}
                            />
                        )}
                    </div>

                    {editReplyMode ? (
                        <div className={`${classes["reply-input"]}`}>
                            <textarea name="" id=""></textarea>
                            <SmallButtonDeepAc
                                text={"Confirm Edit"}
                                func={handleSubmitReply}
                            />
                        </div>
                    ) : (
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Dignissimos sed esse explicabo. Officiis
                            aspernatur itaque, accusamus quidem dolorum quisquam
                            omnis.
                        </p>
                    )}
                </div>

                {replyMode && (
                    <div className={`${classes["reply-input"]}`}>
                        <textarea name="" id=""></textarea>
                    </div>
                )}
                {replyMode ? (
                    <div className={`${classes["reply-btn"]}`}>
                        <SmallButtonDeepAc
                            text={"Submit Reply"}
                            func={submitReply}
                        />
                    </div>
                ) : (
                    <div className={`${classes["reply-btn"]}`}>
                        <SmallButtonDeepAc
                            func={() => setReplyMode((prev) => !prev)}
                            text={"Reply to Answer"}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default SingleAnswer;
