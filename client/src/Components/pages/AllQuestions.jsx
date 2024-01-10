import QuestionBox from "../questions/QuestionBox";
import classes from "../../Styles/AllQuestions.module.css";
import RightSidebar from "../RightSidebar";
import { useState } from "react";
import PopularTagsCard from "../PopularTagsCard";
import { useGetAllQuestion } from "../../Hooks/useGetAllQuestion";

const AllQuestions = () => {
    // const [rightSidebarState, setRightSidebarState] = useState(false);
    const { question, loading, error } = useGetAllQuestion();
    return (
        <div className={`${classes["AllQuestions"]}`}>
            <QuestionBox question={question} loading={loading} error={error} />
            {/* <RightSidebar
                setRightSidebarState={setRightSidebarState}
                rightSidebarState={rightSidebarState}
            >
                <div>
                    <PopularTagsCard />
                    <PopularTagsCard />
                    <PopularTagsCard />
                </div>
            </RightSidebar> */}
        </div>
    );
};

export default AllQuestions;
