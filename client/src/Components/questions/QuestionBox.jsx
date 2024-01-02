import classes from "../../Styles/QuestionBox.module.css";
import { Button } from "../Buttons";
import SingleQuestion from "./SingleQuestion";
const QuestionBox = () => {
    return (
        <div className={`${classes["QuestionBox"]}`}>
            <div className={`${classes["questionBox-header"]}`}>
                <h2>Question Box</h2>
                <Button text="Ask a question" />
            </div>

            <div className={`${classes["questionBox-questions"]}`}>
                <SingleQuestion />
                <SingleQuestion />
                <SingleQuestion />
                <SingleQuestion />
                <SingleQuestion />
                <SingleQuestion />
                <SingleQuestion />
                <SingleQuestion />
            </div>
        </div>
    );
};

export default QuestionBox;
