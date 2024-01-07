import { useEffect, useState } from "react";
import UserApi from "../apis/UserApi";

export const useGetAllUsers = () => {
    const [chats, setChats] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            // console.log("User: ", user);
            try {
                /**PERSONAL QUESTIONS */
                const response = await UserApi.get("/get-all-user", {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                console.log("GET USER RESPONSE: ", response.data);
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        getUsers();
    }, []);

    return { users, loading, error };
};
