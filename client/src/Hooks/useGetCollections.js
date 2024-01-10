import { useEffect, useState } from "react";
import UserApi from "../apis/UserApi";
import { useAuthContext } from "./useAuthContext";

export const useGetCollection = () => {
    const [question, setQuestion] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { user } = useAuthContext();

    useEffect(() => {
        const getQuestion = async () => {
            // console.log("User: ", user);
            try {
                /** GET ALL QUESTIONS */
                const response = await UserApi.get("/get-all-collections", {
                    headers: {
                        Authorization: `Bearer ${user}`,
                        "Content-Type": "application/json",
                    },
                });
                console.log("GET COLLECTION RESPONSE: ", response.data);
                setQuestion(response.data);
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
