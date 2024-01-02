import QuestionBox from "../questions/QuestionBox";
import classes from "../../Styles/AllQuestions.module.css";
import RightSidebar from "../RightSidebar";
import { useState } from "react";

const AllQuestions = () => {
    const [rightSidebarState, setRightSidebarState] = useState(false);
    return (
        <div className={`${classes["AllQuestions"]}`}>
            <QuestionBox
                setRightSidebarState={setRightSidebarState}
                rightSidebarState={rightSidebarState}
            />
            <RightSidebar
                setRightSidebarState={setRightSidebarState}
                rightSidebarState={rightSidebarState}
            />
        </div>
    );
};

export default AllQuestions;
