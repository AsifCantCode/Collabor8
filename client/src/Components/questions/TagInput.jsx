import classes from "../../Styles/AskQuestion.module.css";
import { ImCross } from "react-icons/im";
import _ from "lodash";
import { useGetAllTags } from "../../Hooks/useGetAllTags";
import { useEffect, useState } from "react";
const TagInput = ({ tagList, setTagList, tag, setTag }) => {
    const handleTagChange = (event) => {
        console.log("Tag Change");
        event.stopPropagation();
        const value = event.target.value;
        // console.log(event.target.value);
        // if (value[value.length - 1] === ",") {
        //     const tempTag = _.chain(tag).words().join("").toLower().value();
        //     if (!tagList?.includes(tempTag)) setTagList([...tagList, tempTag]);
        //     setTag("");
        //     console.log("Comma found");
        //     console.log([...tagList, tag]);
        // } else {
        //     setTag(event.target.value);
        // }
        setTag(event.target.value);
    };

    const handleTagAdd = (value) => {
        const tempTag = _.chain(value).words().join("").toLower().value();
        if (!tagList?.includes(tempTag)) setTagList([...tagList, tempTag]);
        setTag("");
    };
    const handleTagDelete = (index) => {
        const newTagList = tagList.filter((tag, i) => i !== index);
        setTagList(newTagList);
    };

    const { tags, loading, error } = useGetAllTags();
    const [filteredTags, setFilteredTags] = useState([]);
    useEffect(() => {
        if (tag) {
            const tempTags = tags?.filter((singleTag) => {
                return singleTag.name
                    .toLowerCase()
                    .includes(_.chain(tag).words().join("").toLower().value());
            });
            setFilteredTags(tempTags);
        } else {
            setFilteredTags(tags);
        }
    }, [tag, tags]);
    return (
        <div className={`${classes["tags"]}`}>
            <label htmlFor="tags">Tags</label>
            <div className={`${classes["tag-list"]}`}>
                {tagList.length > 0 &&
                    tagList.map((tag, index) => (
                        <span key={index}>
                            {tag}{" "}
                            <ImCross
                                onClick={() => {
                                    handleTagDelete(index);
                                }}
                            />
                        </span>
                    ))}

                <div className={`${classes["tag-input-field"]}`}>
                    <input
                        type="text"
                        name="tag"
                        id=""
                        placeholder="Tag with comma"
                        value={tag}
                        onChange={handleTagChange}
                    />
                    {tag && (
                        <div className={`${classes["tag-suggestion"]}`}>
                            <ul>
                                {!loading &&
                                    !error &&
                                    filteredTags &&
                                    filteredTags?.map((tag) => (
                                        <li
                                            onClick={() =>
                                                handleTagAdd(tag.name)
                                            }
                                            key={tag._id}
                                        >
                                            {tag.name}
                                        </li>
                                    ))}
                                {filteredTags.length === 0 && (
                                    <li onClick={() => handleTagAdd(tag)}>
                                        Create New Tag : {tag}
                                    </li>
                                )}
                                {/* <li></li> */}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TagInput;
