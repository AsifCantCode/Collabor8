import { useEffect, useState } from "react";

export const useGetSingleQuestion = (id) => {
    const [question, setQuestion] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getQuestion = async () => {
            // API CALL HERE...
            // try {
            //     const { data } = await axios.get(`/api/questions/${id}`);
            //     setQuestion(data);
            //     setLoading(false);
            // } catch (error) {
            //     setError(true);
            //     setLoading(false);
            // }
        };
        getQuestion();
    }, [id]);

    return { question, loading, error };
};
