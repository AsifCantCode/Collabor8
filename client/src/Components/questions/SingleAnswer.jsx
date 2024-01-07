import classes from "../../Styles/AnswerBox.module.css";
import { SmallButtonAc } from "../Buttons";

import { FaCircleUser } from "react-icons/fa6";
import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
import textImage from "../../assets/Screenshot 2023-10-14 172945.png";
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
        </div>
    );
};

export default SingleAnswer;