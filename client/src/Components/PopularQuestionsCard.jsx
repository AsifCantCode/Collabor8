import { useGetPopularQuestions } from "../Hooks/useGetPopularQuestions";
import classes from "../Styles/PopularQuestionsCard.module.css";
import { Link } from "react-router-dom";
import { formatDateAndTimeFromString } from "../Utilities/utilities";
const PopularQuestionsCard = () => {
    const { question, loading, error } = useGetPopularQuestions();
    console.log(question);
    return (
        <div className={`${classes["PopularQuestionsCard"]} sidebar-card`}>
            <div className={`${classes["card-header"]} sidebar-card-header`}>
                <h3>Popular Questions</h3>
            </div>
            <div className={`${classes["card-content"]}`}>
                {question?.map((question, index) => (
                    <div key={index} className={`${classes["question"]}`}>
                        <Link className={`${classes["question-title"]}`}>
                            {question?.title}
                        </Link>
                        <div className={`${classes["question-details"]}`}>
                            <span>
                                {formatDateAndTimeFromString(
                                    question?.postTime
                                )}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularQuestionsCard;
