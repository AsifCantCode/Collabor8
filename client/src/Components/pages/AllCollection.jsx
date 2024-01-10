import React from "react";
import { useGetCollection } from "../../Hooks/useGetCollections";
import QuestionBox from "../questions/QuestionBox";

export const AllCollection = () => {
    const { question, loading, error } = useGetCollection();
    console.log("AllCollection", question);

    return (
        <QuestionBox
            question={question}
            loading={loading}
            error={error}
            title="All Collection"
        />
    );
};
