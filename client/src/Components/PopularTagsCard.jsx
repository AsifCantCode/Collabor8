import { useGetPopularTags } from "../Hooks/useGetPopularTags";
import classes from "../Styles/PopularTagsCard.module.css";

const PopularTagsCard = () => {
    const { tags, loading, error } = useGetPopularTags();
    return (
        <div className={`${classes["PopularTagsCard"]} sidebar-card`}>
            <div className={`${classes["card-header"]} sidebar-card-header`}>
                <h3>Popular Tags</h3>
            </div>
            <div className={`${classes["card-content"]}`}>
                {!loading &&
                    !error &&
                    tags &&
                    tags?.map((tag) => <span key={tag?._id}>{tag?.name}</span>)}
            </div>
        </div>
    );
};

export default PopularTagsCard;
