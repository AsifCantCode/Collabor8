import classes from "../Styles/PopularTagsCard.module.css";

const PopularTagsCard = () => {
    return (
        <div className={`${classes["PopularTagsCard"]} sidebar-card`}>
            <div className={`${classes["card-header"]} sidebar-card-header`}>
                <h3>Popular Tags</h3>
            </div>
            <div className={`${classes["card-content"]}`}>
                <span>programming</span>
                <span>javascript</span>
                <span>python</span>
                <span>java</span>
                <span>csharp</span>
                <span>html</span>
                <span>css</span>
                <span>webdevelopment</span>
                <span>datascience</span>
                <span>machinelearning</span>
            </div>
        </div>
    );
};

export default PopularTagsCard;
