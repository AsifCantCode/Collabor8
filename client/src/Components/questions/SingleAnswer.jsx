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
import { useEffect, useState } from "react";
import {
    formatDateAndTimeFromString,
    makeAnswerImageURL,
} from "../../Utilities/utilities";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { useChatContext } from "../../Hooks/useChatContext";
import UserApi from "../../apis/UserApi";
const SingleAnswer = (props) => {
    const { setEditMode, answer, setEditId } = props;
    const { user, newUser } = useAuthContext();
    const { socket } = useChatContext();
    const [upvote, setUpvote] = useState(0);
    const [downvote, setDownvote] = useState(0);
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);

    const voteHandler = async (upvote) => {
        try {
            /**UPVOTE-DOWNVOTE (if upvote is given true will upvote else downvote for false) */
            const response = await UserApi.put(
                "/upvote-downvote-ans",
                { answerId: answer?._id, upvote },
                {
                    headers: {
                        Authorization: `Bearer ${user}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const handleUpvote = () => {
        if (upvoted) {
            setUpvote(upvote - 1);
            setUpvoted(false);
            voteHandler(true);
        } else {
            setUpvote(upvote + 1);
            setUpvoted(true);
            voteHandler(true);
        }
        if (downvoted) {
            setDownvote(downvote - 1);
            setDownvoted(false);
            voteHandler(true);
        }
    };
    const handleDownvote = () => {
        if (downvoted) {
            setDownvote(downvote - 1);
            setDownvoted(false);
            voteHandler(false);
        } else {
            setDownvote(downvote + 1);
            setDownvoted(true);
            voteHandler(false);
        }
        if (upvoted) {
            setUpvote(upvote - 1);
            setUpvoted(false);
            voteHandler(false);
        }
    };
    useEffect(() => {
        setUpvote(answer?.upvotes?.length);
        setDownvote(answer?.downvotes?.length);
        if (answer?.upvotes?.includes(newUser?._id)) {
            setUpvoted(true);
        }
        if (answer?.downvotes?.includes(newUser?._id)) {
            setDownvoted(true);
        }
    }, [answer, newUser]);

    const [replyMode, setReplyMode] = useState(false);
    const [replyText, setReplyText] = useState("");
    const [editReplyMode, setEditReplyMode] = useState(false);
    const [editReplyId, setEditReplyId] = useState(null);

    const [replies, setReplies] = useState([]);

    useEffect(() => {
        setReplies(answer?.comments);
    }, [answer]);
    const handleReply = () => {
        setReplyMode((prev) => !prev);
    };

    const submitReply = async () => {
        console.log(replyText);
        setReplyMode(false);
        // const tempReply = {
        //     userId: {
        //         _id: newUser?._id,
        //         fullname: newUser?.fullname,
        //         email: newUser?.email,
        //     },
        //     commentText: replyText,
        //     _id: null,
        // };
        try {
            /**ADD COMMENT*/
            const response = await UserApi.post(
                "/add-comment",
                { answerId: answer?._id, commentText: replyText },
                {
                    headers: {
                        Authorization: `Bearer ${user}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("ADD REPLY :", response.data);

            const temp = [...replies];
            temp.push(
                response?.data?.comments[response?.data?.comments?.length - 1]
            );
            setReplies(temp);
            setReplyText("");
            socket.emit("new reply", {
                data: response?.data,
                author: newUser?._id,
            });
        } catch (error) {
            console.log(error);
        }
    };
    const handleReplyEdit = async (index) => {
        console.log(replyText);
        const tempReplies = [...replies];
        tempReplies[index].commentText = replyText;
        setReplies(tempReplies);

        setEditReplyMode(false);

        try {
            /**UPDATE COMMENT*/
            const response = await UserApi.put(
                "/update-comment",
                { answerId: answer?._id, commentArray: replies },
                {
                    headers: {
                        Authorization: `Bearer ${user}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("UPDATE REPLY :", response.data);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className={`${classes["answer"]}`}>
            <SmallButtonAc
                func={() => {
                    setEditMode((prev) => !prev);
                    setEditId(answer._id);
                }}
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
                {replies?.length > 0 && <h3>Replies</h3>}
                {replies?.map((reply, index) => (
                    <div key={index} className={`${classes["reply"]}`}>
                        <div className={`${classes["reply-header"]}`}>
                            <h4>{reply?.userId?.fullname}</h4>
                            {!editReplyMode && (
                                <SmallButtonAc
                                    func={() => {
                                        setEditReplyMode(true);
                                        setReplyText(reply?.commentText);
                                        setEditReplyId(index);
                                    }}
                                    text={"Edit Reply"}
                                />
                            )}
                        </div>

                        {editReplyMode && editReplyId === index ? (
                            <div className={`${classes["reply-input"]}`}>
                                <textarea
                                    name=""
                                    id=""
                                    value={replyText}
                                    onChange={(e) =>
                                        setReplyText(e.target.value)
                                    }
                                ></textarea>
                                <SmallButtonDeepAc
                                    text={"Confirm Edit"}
                                    func={() => {
                                        handleReplyEdit(index);
                                    }}
                                />
                            </div>
                        ) : (
                            <p>{reply?.commentText}</p>
                        )}
                    </div>
                ))}

                {replyMode && (
                    <div className={`${classes["reply-input"]}`}>
                        <textarea
                            name=""
                            id=""
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                        ></textarea>
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
