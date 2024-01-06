import classes from "../../Styles/AskQuestion.module.css";
import { ImCross } from "react-icons/im";
import _ from "lodash";
const TagInput = ({ tagList, setTagList, tag, setTag }) => {
    const handleTagChange = (event) => {
        console.log("Tag Change");
        event.stopPropagation();
        const value = event.target.value;
        // console.log(event.target.value);
        if (value[value.length - 1] === ",") {
            setTagList([...tagList, tag]);
            setTag("");
            console.log("Comma found");
            console.log([...tagList, tag]);
        } else {
            setTag(event.target.value);
        }
    };

    const handleTagDelete = (index) => {
        const newTagList = tagList.filter((tag, i) => i !== index);
        setTagList(newTagList);
    };
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

                <input
                    type="text"
                    name="tag"
                    id=""
                    placeholder="Tag with comma"
                    value={tag}
                    onChange={handleTagChange}
                />
            </div>
        </div>
    );
};

export default TagInput;
