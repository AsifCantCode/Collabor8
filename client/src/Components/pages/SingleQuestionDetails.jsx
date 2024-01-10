import classes from "../../Styles/SingleQuestionDetails.module.css";
import RightSidebar from "../RightSidebar";
import PopularTagsCard from "../PopularTagsCard";

import img from "../../assets/Screenshot 2023-10-14 172945.png";
// Icons
import { FaCircleUser } from "react-icons/fa6";
import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa";
import { useEffect, useState } from "react";
import AnswerBox from "../questions/AnswerBox";
import { useGetSingleQuestion } from "../../Hooks/useGetSingleQuestion";
import { useParams } from "react-router-dom";
import {
    formatDateAndTimeFromString,
    makeQuestionImageURL,
} from "../../Utilities/utilities";
import UserApi from "../../apis/UserApi";
import { useAuthContext } from "../../Hooks/useAuthContext";
const SingleQuestionDetails = () => {
    const [upvote, setUpvote] = useState(0);
    const [downvote, setDownvote] = useState(0);
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);

    // Populate Data
    const { id } = useParams();
    const { question, loading, error } = useGetSingleQuestion(id);

    const [isSolved, setIsSolved] = useState(question?.isSolved);
    console.log("QUESTION", question);

    useEffect(() => {
        setIsSolved(question?.isSolved);
    }, [question]);
    const { user, newUser } = useAuthContext();
    const voteHandler = async (upvote) => {
        try {
            /**UPVOTE-DOWNVOTE (if upvote is given true will upvote else downvote for false) */
            const response = await UserApi.put(
                "/upvote-downvote",
                { questionId: id, upvote },
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
        setUpvote(question?.countUpVotes);
        setDownvote(question?.countDownVotes);
        setUpvoted(question?.upVotes?.includes(newUser?._id));
        setDownvoted(question?.downVotes?.includes(newUser?._id));
    }, [question, newUser]);

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
                        {isSolved && (
                            <div className={`${classes["correct-answer"]}`}>
                                <FaCircleCheck
                                    className={`${classes["mark-as-correct"]}`}
                                />{" "}
                                Solved
                            </div>
                        )}
                        <h3>{question?.title} </h3>
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
                    isSolved={isSolved}
                    setIsSolved={setIsSolved}
                    questionAuthorId={question?.AuthorId?._id}
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
