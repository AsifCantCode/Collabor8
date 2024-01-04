import { useRef, useState } from "react";
import classes from "../../Styles/AskQuestion.module.css";
import UserApi from "../../apis/UserApi";
import Jodit from "../Jodit";
import JoditEditor from "jodit-react";
import { Button } from "../Buttons";
import { useAuthContext } from "../../Hooks/useAuthContext";
// Icons
import { ImCross } from "react-icons/im";
import { LuImagePlus } from "react-icons/lu";
import { RiDeleteBin5Fill } from "react-icons/ri";

const AskQuestion = () => {
    // Text Input Section
    const [textContent, setTextContent] = useState("");

    // Image Input Section
    const [selectedImage, setSelectedImage] = useState([]);
    const [imageViewer, setImageViewer] = useState([]); // [false, true, false, false
    const imageInputRef = useRef(null);
    const handleImageChange = (event) => {
        const file = event.target.files[0];

        setSelectedImage([...selectedImage, file]);
        console.log(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageViewer([...imageViewer, reader.result]);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageClick = () => {
        // Trigger the file input when the box is clicked
        imageInputRef.current.click();
    };
    const handleDeleteImage = (index) => {
        console.log(index);
        const newImages = selectedImage.filter((image, i) => i !== index);
        const newImageViewer = imageViewer.filter((image, i) => i !== index);
        setImageViewer(newImageViewer);
        setSelectedImage(newImages);
    };

    // Tags Input Section
    const [tagList, setTagList] = useState([]);
    const [tag, setTag] = useState("");

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

    // Submit Section
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { user } = useAuthContext();
    const handleSubmit = async () => {
        // e.preventDefault();
        setLoading(true);
        setError(false);
        console.log("TEXT: ", textContent);
        console.log("IMAGEL ", selectedImage);
        console.log("TAG: ", tagList);

        const formData = new FormData();
        formData.append("textContent", textContent);
        formData.append("image", selectedImage);
        formData.append("tagList", tagList);

        try {
            const response = await UserApi.post("/add-question", formData, {
                headers: {
                    Authorization: `Bearer ${user}`,
                },
            });
            setLoading(false);

            //   toast.success("Signup Successful !! Navigating to edit profile page...", {
            //     position: toast.POSITION.TOP_RIGHT,
            //     autoClose: 1500,
            //   });
            console.log("ASK QUESTION Response: ", response.data);
        } catch (err) {
            console.log("ASK QUESTION ERROR: ", err);
            setLoading(false);
            setError(err.response.data.error);
        }
    };

    // Jodit Editor Config
    const editorConfig = {
        readonly: false,
        tabIndex: 1,

        askBeforePasteHTML: false,
        askBeforePasteFromWord: false,
        defaultActionOnPaste: "insert_clear_html",

        placeholder: "Write something awesome ...",
        beautyHTML: true,
        toolbarButtonSize: "large",
        buttons: [
            "source",
            "|",
            "bold",
            "italic",
            "|",
            "ul",
            "ol",
            "|",
            "font",
            "fontsize",
            "paragraph",
            "|",
            "table",
            "link",
            "|",
            "left",
            "center",
            "right",
            "justify",
            "|",
            "undo",
            "redo",
            "|",
            "fullsize",
        ],
        theme: "dark",
    };
    return (
        <div className={`${classes["AskQuestion"]}`}>
            <div className={`${classes["page-header"]}`}>
                <h2>Ask a Question</h2>
            </div>

            {/* Text Box Section */}
            <div className={`${classes["new-question"]}`}>
                {/* <Jodit
                    textContent={textContent}
                    setTextContent={setTextContent}
                /> */}
                <JoditEditor
                    config={editorConfig}
                    value={textContent}
                    tabIndex={1}
                    onBlur={(newContent) => setTextContent(newContent)}
                />
            </div>

            {/* Image Attachment  */}
            <div className={`${classes["attachments"]}`}>
                <p>Attachment Image (Optional)</p>
                <div className={`${classes["images"]}`}>
                    {imageViewer &&
                        imageViewer.length > 0 &&
                        imageViewer.map((image, index) => (
                            <div
                                key={index}
                                className={classes.imageBox}
                                onClick={() => {
                                    handleDeleteImage(index);
                                }}
                            >
                                <span className={`${classes["delete-btn"]}`}>
                                    <RiDeleteBin5Fill />
                                </span>
                                <img src={image} alt="Selected" />
                            </div>
                        ))}
                    <div
                        className={classes.imageBox}
                        onClick={handleImageClick}
                    >
                        <LuImagePlus />
                    </div>
                </div>

                <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                    ref={imageInputRef}
                />
            </div>

            {/* Tags Section  */}
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

            {/* Submit Button */}
            <div className={`${classes["submit-btn"]}`}>
                <Button func={handleSubmit} text="Confirm Post" />
            </div>
        </div>
    );
};

export default AskQuestion;
