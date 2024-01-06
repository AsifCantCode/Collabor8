import classes from "../Styles/AllTags.module.css";
import { Link } from "react-router-dom";
const SingleTag = ({ tag }) => {
    return (
        <Link className={`${classes["tag"]}`}>
            <h3>{tag?.name}</h3>
            <div>
                <p>
                    <span>{tag?.questionCount}</span> Questions
                </p>
                <p>
                    <span>{tag?.questionInLastWeek}</span> This Week
                </p>
            </div>
        </Link>
    );
};

export default SingleTag;
