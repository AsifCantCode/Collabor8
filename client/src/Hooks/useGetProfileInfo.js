import { useEffect, useState } from "react";
import UserApi from "../apis/UserApi";
import { useAuthContext } from "./useAuthContext";

export const useGetProfileInfo = (userId) => {
    const [profile, setProfile] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getQuestion = async () => {
            console.log("User: ", userId);
            try {
                const response = await UserApi.get("/get-profile", {
                    params: {
                        userId: userId,
                    },
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                console.log("GET PROFILE RESPONSE: ", response.data);
                setProfile(response.data);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        getQuestion();
    }, [userId]);

    return { profile, loading, error };
};
