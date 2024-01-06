import { useEffect, useState } from "react";
import UserApi from "../apis/UserApi";
import { useAuthContext } from "./useAuthContext";

export const useGetPersonalQuestion = (userId) => {
    const [question, setQuestion] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getQuestion = async () => {
            // console.log("User: ", user);
            try {
                /**PERSONAL QUESTIONS */
                const response = await UserApi.get("/personal-questions", {
                    params: {
                        userId: userId,
                    },
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                console.log("GET QUESTION RESPONSE: ", response.data.questions);
                setQuestion(response.data.questions);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        getQuestion();
    }, [userId]);

    return { question, loading, error };
};
