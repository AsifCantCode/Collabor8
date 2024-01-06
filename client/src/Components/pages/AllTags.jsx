import { useEffect, useState } from "react";
import { useGetAllTags } from "../../Hooks/useGetAllTags";
import classes from "../../Styles/AllTags.module.css";
import SingleTag from "../SingleTag";

const AllTags = () => {
    const { tags, loading, error } = useGetAllTags();
    const [filteredTags, setFilteredTags] = useState(tags);
    const [tagSearch, setTagSearch] = useState("");

    useEffect(() => {
        if (tagSearch) {
            const filteredTags = tags.filter((tag) =>
                tag.name.toLowerCase().includes(tagSearch.toLowerCase())
            );
            setFilteredTags(filteredTags);
        } else {
            setFilteredTags(tags);
        }
    }, [tagSearch, tags]);
    return (
        <div className={`${classes["AllTags"]}`}>
            <div className={`${classes["page-header"]} global-page-header`}>
                <h2>All Tags</h2>
                <input
                    type="text"
                    name="tagSearch"
                    id=""
                    value={tagSearch}
                    onChange={(e) => setTagSearch(e.target.value)}
                    placeholder="Search Tags"
                />
            </div>
            <div className={`${classes["page-content"]} global-page-content`}>
                <div className={`${classes["tag-cards"]}`}>
                    {!loading &&
                        !error &&
                        filteredTags &&
                        filteredTags?.map((tag) => (
                            <SingleTag key={tag._id} tag={tag} />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default AllTags;
