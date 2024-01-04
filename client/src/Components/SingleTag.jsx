import classes from "../Styles/AllTags.module.css";
import { Link } from "react-router-dom";
const SingleTag = () => {
    return (
        <Link className={`${classes["tag"]}`}>
            <h3>Tag Name</h3>
            <div>
                <p>
                    <span>12</span> Questions
                </p>
                <p>
                    <span>4</span> This Week
                </p>
            </div>
        </Link>
    );
};

export default SingleTag;
