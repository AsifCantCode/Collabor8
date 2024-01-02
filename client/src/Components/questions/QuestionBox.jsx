import classes from "../../Styles/QuestionBox.module.css";
import {
    Button,
    ButtonWithIconOnly,
    ButtonWithIconOnlyTransparent,
} from "../Buttons";
import SingleQuestion from "./SingleQuestion";

// Icons
import { MdOutlineEditCalendar } from "react-icons/md";
import { GoSidebarExpand } from "react-icons/go";
const QuestionBox = ({ setRightSidebarState, rightSidebarState }) => {
    return (
        <div className={`${classes["QuestionBox"]}`}>
            <div className={`${classes["questionBox-header"]}`}>
                <h2>Question Box</h2>
                <div className={`${classes["desktop-view-button"]}`}>
                    <Button text="Ask a question" />
                </div>

                <div className={`${classes["responsive-button"]}`}>
                    <ButtonWithIconOnly icon={<MdOutlineEditCalendar />} />
                    <ButtonWithIconOnlyTransparent
                        func={() => {
                            console.log("Active Function Called");
                            console.log(rightSidebarState);
                            setRightSidebarState((prev) => !prev);
                        }}
                        icon={<GoSidebarExpand />}
                    />
                </div>
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
