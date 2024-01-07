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
const SingleAnswer = (props) => {
    const {
        upvote,
        downvote,
        upvoted,
        downvoted,
        handleUpvote,
        handleDownvote,
        setEditMode,
    } = props;

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
                        <FaCircleUser /> <span>Tanvir Hossain Dihan</span>
                    </h4>
                    <p className={`${classes["answer-date"]}`}>
                        Answered 2 days ago
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
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quisquam, voluptatum voluptates. Quibusdam,
                        voluptatibus. Quae molestias, voluptates, quod, quia
                        accusamus voluptatibus autem iusto voluptate quibusdam
                        doloremque quos tempore? Repellat, voluptatum quibusdam.
                    </p>
                </div>
                <div className={`${classes["answer-attachments"]}`}>
                    <div className={`${classes["image"]}`}>
                        <img src={textImage} alt="" />
                    </div>
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
