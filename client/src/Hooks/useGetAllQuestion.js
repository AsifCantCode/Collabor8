import { useEffect, useState } from "react";
import UserApi from "../apis/UserApi";
import { useAuthContext } from "./useAuthContext";

export const useGetAllQuestion = () => {
    const [question, setQuestion] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { user } = useAuthContext();

    useEffect(() => {
        const getQuestion = async () => {
            // console.log("User: ", user);
            try {
                /** GET ALL QUESTIONS */
                const response = await UserApi.get("/all-questions", {
                    params: { token: user },
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                // console.log("GET QUESTION RESPONSE: ", response.data.questions);
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
