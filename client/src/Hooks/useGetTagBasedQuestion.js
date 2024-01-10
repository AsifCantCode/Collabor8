import { useEffect, useState } from "react";
import UserApi from "../apis/UserApi";
import { useAuthContext } from "./useAuthContext";

export const useGetTagBasedQuestion = (tagName) => {
    const [question, setQuestion] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { user } = useAuthContext();

    useEffect(() => {
        const getQuestion = async () => {
            // console.log("User: ", user);
            try {
                /** TAG BASED QUESTIONS */
                const response = await UserApi.get("/tag-questions", {
                    params: {
                        tagName,
                    },
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                console.log("GET TAG RESPONSE: ", response.data.questions);
                setQuestion(response.data.questions);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        getQuestion();
    }, [user]);

    return { question, loading, error };
};
