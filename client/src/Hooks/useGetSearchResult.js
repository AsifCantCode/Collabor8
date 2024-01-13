import { useEffect, useState } from "react";
import UserApi from "../apis/UserApi";

export const useGetSearchResult = (searchQuery) => {
    const [question, setQuestion] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getQuestion = async () => {
            // console.log("User: ", user);
            try {
                /** GET ALL QUESTIONS */
                const response = await UserApi.get("/search", {
                    params: { query: searchQuery },
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                console.log("GET SEARCH RESPONSE: ", response.data);
                setQuestion(response.data);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        getQuestion();
    }, [searchQuery]);

    return { question, loading, error };
};
