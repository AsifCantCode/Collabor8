import { useEffect, useState } from "react";
import UserApi from "../apis/UserApi";

export const useGetPopularTags = () => {
    const [tags, setTags] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getTags = async () => {
            // console.log("User: ", user);
            try {
                /** ALL TAGS */
                const response = await UserApi.get("/popular-tags", {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                // console.log("GET TAGS RESPONSE: ", response.data);
                setTags(response.data);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        getTags();
    }, []);

    return { tags, loading, error };
};
