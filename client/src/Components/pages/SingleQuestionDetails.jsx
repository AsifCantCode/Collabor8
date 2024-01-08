import classes from "../../Styles/SingleQuestionDetails.module.css";
import RightSidebar from "../RightSidebar";
import PopularTagsCard from "../PopularTagsCard";

import img from "../../assets/Screenshot 2023-10-14 172945.png";
// Icons
import { FaCircleUser } from "react-icons/fa6";
import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa";
import { useState } from "react";
import AnswerBox from "../questions/AnswerBox";
import { useGetSingleQuestion } from "../../Hooks/useGetSingleQuestion";
import { useParams } from "react-router-dom";
import {
    formatDateAndTimeFromString,
    makeQuestionImageURL,
} from "../../Utilities/utilities";
const SingleQuestionDetails = () => {
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

    // Populate Data
    const { id } = useParams();
    const { question, loading, error } = useGetSingleQuestion(id);
    console.log("QUESTION", question);
    return (
        <div className={`${classes["SingleQuestionDetails"]}`}>
            <div className={`${classes["SingleQuestion"]}`}>
                <div className={`${classes["page-header"]}`}>
                    <div className={`${classes["creation-info"]}`}>
                        <p className={`${classes["author-name"]}`}>
                            <FaCircleUser />{" "}
                            <span>{question?.AuthorId?.fullname}</span>
                        </p>
                        <p className={`${classes["creation-date"]}`}>
                            {formatDateAndTimeFromString(question?.postTime)}
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
                <div>
                    <div className={`${classes["title"]}`}>
                        <h3>{question?.title}</h3>
                    </div>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: question?.textContent,
                        }}
                        className={`${classes["description"]} post-description`}
                    ></div>
                    <div className={`${classes["attachments"]}`}>
                        {question?.selectedImage?.map((img, index) => (
                            <div
                                key={index}
                                className={`${classes["attachment"]}`}
                            >
                                <img src={makeQuestionImageURL(img)} alt="" />
                            </div>
                        ))}
                    </div>
                </div>
                <AnswerBox
                    answers={question?.answers}
                    questionId={question?._id}
                />
            </div>
            <RightSidebar>
                <PopularTagsCard />
                <PopularTagsCard />
                <PopularTagsCard />
            </RightSidebar>
        </div>
    );
};

export default SingleQuestionDetails;
