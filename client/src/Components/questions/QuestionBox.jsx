import classes from "../../Styles/QuestionBox.module.css";
import { Button } from "../Buttons";
const QuestionBox = () => {
    return (
        <div className={`${classes["QuestionBox"]}`}>
            <div className={`${classes["questionBox-header"]}`}>
                <h2>Question Box</h2>
                <Button text="Ask a question" />
            </div>
        </div>
    );
};

export default QuestionBox;
