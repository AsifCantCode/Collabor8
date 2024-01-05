import classes from "../../Styles/SingleQuestion.module.css";

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
const SingleQuestion = () => {
    const [collected, setCollected] = useState(false);
    const addToCollection = () => {
        setCollected((prev) => !prev);
    };
    return (
        <div className={`${classes["SingleQuestion"]}`}>
            <div className={`${classes["edit-btn"]}`}>
                <SmallButton to={`/edit-question/3`} text={`Edit Post`} />
                {collected ? (
                    <FaStar onClick={addToCollection} />
                ) : (
                    <FaRegStar onClick={addToCollection} />
                )}
            </div>
            <div className={`${classes["question"]}`}>
                <Link to={`/single-question/1`}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Minus enim maxime atque. Veritatis excepturi exercitationem
                    hic facere molestiae. Quibusdam, ipsum!
                </Link>
            </div>
            <div className={`${classes["tags"]}`}>
                <span>Tag 1</span>
                <span>Tag 2</span>
                <span>Tag 3</span>
            </div>
            <div className={`${classes["info"]}`}>
                <div className={`${classes["author-info"]}`}>
                    <p className={`${classes["author-name"]}`}>
                        <FaCircleUser />
                        <span>Author 1</span>
                    </p>
                    <p className={`${classes["date"]}`}>Asked 10 mins ago</p>
                </div>
                <div className={`${classes["question-info"]}`}>
                    <p className={`${classes["votes"]}`}>
                        <BsChatSquareHeart /> <span>0 Votes</span>
                    </p>
                    <p className={`${classes["answers"]}`}>
                        <TbMessage2Question /> <span>0 answers</span>
                    </p>
                    <p className={`${classes["views"]}`}>
                        <FiEye /> <span>0 views</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SingleQuestion;
