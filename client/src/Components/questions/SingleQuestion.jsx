import classes from "../../Styles/SingleQuestion.module.css";
import { formatDateAndTimeFromString } from "../../Utilities/utilities.js";
// Icons
import { FaCircleUser } from "react-icons/fa6";
import { TbMessage2Question } from "react-icons/tb";
import { FiEye } from "react-icons/fi";
import { BsChatSquareHeart } from "react-icons/bs";
import { Button, SmallButton } from "../Buttons";
import { FaRegStar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { useState } from "react";
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
                { questionId, profile: { _id: newUser?._id } },
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
                    <FaStar onClick={addToCollection} />
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
                        <TbMessage2Question />{" "}
                        <span>{question?.countAnswers} answers</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SingleQuestion;
