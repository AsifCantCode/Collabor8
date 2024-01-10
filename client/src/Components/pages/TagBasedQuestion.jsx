import { useParams } from "react-router-dom";
import { useGetTagBasedQuestion } from "../../Hooks/useGetTagBasedQuestion";
import QuestionBox from "../questions/QuestionBox";

const TagBasedQuestion = () => {
    const { tagName } = useParams();
    console.log("Tag Name", tagName);
    const { question, loading, error } = useGetTagBasedQuestion(tagName);
    console.log("Tag Based Questions", question);

    return (
        <QuestionBox
            question={question}
            loading={loading}
            error={error}
            title={`Tag : ${tagName}`}
        />
    );
};

export default TagBasedQuestion;
