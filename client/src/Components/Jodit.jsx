import JoditReact from "jodit-react";
const Jodit = ({ textContent, setTextContent }) => {
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
        <JoditReact
            config={editorConfig}
            value={textContent}
            tabIndex={1}
            onBlur={(newContent) => setTextContent(newContent)}
        />
    );
};

export default Jodit;
