import QuestionBox from "../questions/QuestionBox";
import classes from "../../Styles/AllQuestions.module.css";
import RightSidebar from "../RightSidebar";

const AllQuestions = () => {
    return (
        <div className={`${classes["AllQuestions"]}`}>
            <QuestionBox />
            <RightSidebar />
        </div>
    );
};

export default AllQuestions;
