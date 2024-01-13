import { useParams } from "react-router-dom";
import QuestionBox from "../questions/QuestionBox";
import { useGetSearchResult } from "../../Hooks/useGetSearchResult";

const SearchResult = () => {
    const { searchQuery } = useParams();
    const { question, loading, error } = useGetSearchResult(searchQuery);
    // console.log("Tag Based Questions", question);

    return (
        <QuestionBox
            question={question}
            loading={loading}
            error={error}
            title={`Search : ${searchQuery}`}
        />
    );
};

export default SearchResult;
