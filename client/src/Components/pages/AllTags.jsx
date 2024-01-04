import classes from "../../Styles/AllTags.module.css";
import SingleTag from "../SingleTag";

const AllTags = () => {
    return (
        <div className={`${classes["AllTags"]}`}>
            <div className={`${classes["page-header"]} global-page-header`}>
                <h2>All Tags</h2>
            </div>
            <div className={`${classes["page-content"]} global-page-content`}>
                <div className={`${classes["tag-cards"]}`}>
                    <SingleTag />
                    <SingleTag />
                    <SingleTag />
                    <SingleTag />
                    <SingleTag />
                    <SingleTag />
                    <SingleTag />
                    <SingleTag />
                    <SingleTag />
                    <SingleTag />
                </div>
            </div>
        </div>
    );
};

export default AllTags;
