import classes from "../../Styles/SingleQuestion.module.css";
import { formatDateAndTimeFromString } from "../../Utilities/utilities.js";
// Icons
import { FaCircleUser } from "react-icons/fa6";
import { TbMessage2Question } from "react-icons/tb";
import { FiEye } from "react-icons/fi";
import { BsChatSquareHeart } from "react-icons/bs";
import { FaCircleCheck } from "react-icons/fa6";
import { Button, SmallButton } from "../Buttons";
import { FaRegStar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../Hooks/useAuthContext";
import UserApi from "../../apis/UserApi.jsx";
const SingleQuestion = ({ question, editPost }) => {
    const [collected, setCollected] = useState(false);
    const { user, newUser } = useAuthContext();

    const addToCollection = async (questionId) => {
        setCollected((prev) => !prev);
        try {
            /**ADD TO COLLECTION */
            const response = await UserApi.post(
                "/add-to-collection",
                { questionId },
                {
                    headers: {
                        Authorization: `Bearer ${user}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("Add to collection", response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteCollection = async (questionId) => {
        setCollected((prev) => !prev);
        try {
            /**DELETE FROM COLLECTION */
            const response = await UserApi.delete("/remove-from-collection", {
                headers: {
                    Authorization: `Bearer ${user}`,
                    "Content-Type": "application/json",
                },
                params: { questionId },
            });
            console.log("Delete from collection", response.data);
        } catch (error) {
            console.log(error);
        }
    };

    console.log("Single Question", question);
    //     {
    //     "upVotes": [],
    //     "downVotes": [],
    //     "_id": "65980685aaadff253e5db30b",
    //     "AuthorId": "659635cee5a8a34b156eabdf",
    //     "textContent": "<p>acds</p>",
    //     "selectedImage": [
    //         "images_1704461957293.png"
    //     ],
    //     "tagList": [
    //         "acs"
    //     ],
    //     "countUpVotes": 0,
    //     "countDownVotes": 0,
    //     "countAnswers": 0,
    //     "isSolved": false,
    //     "answers": [],
    //     "postTime": "2024-01-05T13:39:17.315Z",
    //     "updateTime": "2024-01-05T13:39:17.315Z",
    //     "__v": 0
    // }

    useEffect(() => {
        if (newUser) {
            const temp = question?.collectedBy?.find(
                (item) => item === newUser?._id
            );
            if (temp) {
                setCollected(true);
            } else {
                setCollected(false);
            }
        }
    }, [newUser, question]);
    return (
        <div className={`${classes["SingleQuestion"]}`}>
            <div className={`${classes["edit-btn"]}`}>
                {editPost ? (
                    <SmallButton
                        to={`/edit-question/${question?._id}`}
                        text={`Edit Post`}
                    />
                ) : null}
                {/* <SmallButton to={`/edit-question/3`} text={`Edit Post`} /> */}
                {collected ? (
                    <FaStar onClick={() => deleteCollection(question?._id)} />
                ) : (
                    <FaRegStar onClick={() => addToCollection(question?._id)} />
                )}
            </div>
            <div className={`${classes["question"]}`}>
                <Link to={`/single-question/${question?._id}`}>
                    {question?.title}
                </Link>
            </div>
            <div className={`${classes["tags"]}`}>
                {question?.tagList?.map((tag, index) => (
                    <span key={index}>{tag}</span>
                ))}
            </div>
            <div className={`${classes["info"]}`}>
                <div className={`${classes["author-info"]}`}>
                    <p className={`${classes["author-name"]}`}>
                        <FaCircleUser />{" "}
                        <Link to={`/profile/${question?.AuthorId?._id}`}>
                            {question?.AuthorId?.fullname}
                        </Link>
                    </p>
                    <p className={`${classes["date"]}`}>
                        {formatDateAndTimeFromString(question?.postTime)}
                    </p>
                </div>
                <div className={`${classes["question-info"]}`}>
                    <p className={`${classes["votes"]}`}>
                        <BsChatSquareHeart />{" "}
                        <span>
                            {question?.countUpVotes + question?.downVotes} Votes
                        </span>
                    </p>
                    {/* <p className={`${classes["views"]}`}>
                        <FiEye /> <span>0 views</span>
                    </p> */}
                    <p className={`${classes["answers"]}`}>
                        {question?.isSolved ? (
                            <span className={`${classes["solved"]}`}>
                                <FaCircleCheck />
                            </span>
                        ) : (
                            <TbMessage2Question />
                        )}{" "}
                        <span>{question?.answers?.length} answers</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SingleQuestion;
