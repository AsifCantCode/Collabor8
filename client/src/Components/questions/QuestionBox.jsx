import classes from "../../Styles/QuestionBox.module.css";
import { ButtonWithIconOnlyTransparent, LinkButton } from "../Buttons";
import SingleQuestion from "./SingleQuestion";

// Icons
import { GoSidebarExpand } from "react-icons/go";
import { MdOutlineEditCalendar } from "react-icons/md";
const QuestionBox = ({
    setRightSidebarState,
    rightSidebarState,
    question,
    loading,
    error,
}) => {
    return (
        <div className={`${classes["QuestionBox"]}`}>
            <div className={`${classes["questionBox-header"]}`}>
                <h2>Question Box</h2>
                <div className={`${classes["desktop-view-button"]}`}>
                    <LinkButton text="Ask a question" to="/new-question" />
                </div>

                <div className={`${classes["responsive-button"]}`}>
                    <ButtonWithIconOnlyTransparent
                        icon={<MdOutlineEditCalendar />}
                    />
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
                {!loading &&
                    !error &&
                    question &&
                    question?.map((q) => (
                        <SingleQuestion key={q._id} question={q} />
                    ))}
            </div>
        </div>
    );
};

export default QuestionBox;
