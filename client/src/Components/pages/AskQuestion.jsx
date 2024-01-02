import { useRef, useState } from "react";
import classes from "../../Styles/AskQuestion.module.css";
import JoditReact from "jodit-react";
import { Button } from "../Buttons";

// Icons
import { LuImagePlus } from "react-icons/lu";
import { RiDeleteBin5Fill } from "react-icons/ri";
const AskQuestion = () => {
    const editorConfig = {
        readonly: false,
        autofocus: true,
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

    const [textContent, setTextContent] = useState("");

    const handleSubmit = () => {
        console.log(textContent);
    };

    const [selectedImage, setSelectedImage] = useState([]);
    const imageInputRef = useRef(null);
    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage([...selectedImage, reader.result]);
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
        setSelectedImage(newImages);
    };
    return (
        <div className={`${classes["AskQuestion"]}`}>
            <div className={`${classes["page-header"]}`}>
                <h2>Ask a Question</h2>
            </div>

            <div className={`${classes["new-question"]}`}>
                <JoditReact
                    config={editorConfig}
                    value={textContent}
                    tabIndex={1}
                    onBlur={(newContent) => setTextContent(newContent)}
                />
            </div>

            <div className={`${classes["attachments"]}`}>
                <p>Attachment Image (Optional)</p>
                <div className={`${classes["images"]}`}>
                    {selectedImage &&
                        selectedImage.length > 0 &&
                        selectedImage.map((image, index) => (
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
            <div className={`${classes["submit-btn"]}`}>
                <Button func={handleSubmit} text="Submit" />
            </div>

            <div className={`${classes["content"]}`}>
                <div dangerouslySetInnerHTML={{ __html: textContent }} />
            </div>
        </div>
    );
};

export default AskQuestion;
