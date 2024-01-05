import classes from "../../Styles/AskQuestion.module.css";
import JoditEditor from "jodit-react";
import { FaQuoteLeft } from "react-icons/fa6";
const DescriptionInput = ({ textContent, setTextContent }) => {
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
        <div className={`${classes["new-question"]}`}>
            <label htmlFor="">Description</label>
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
    );
};

export default DescriptionInput;
