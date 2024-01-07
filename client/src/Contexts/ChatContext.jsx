import { createContext, useEffect, useState } from "react";
import { useAuthContext } from "../Hooks/useAuthContext";
import ChatApi from "../Apis/ChatApi";

export const ChatContext = createContext();

export const ChatContextProvider = (props) => {
    const [selectedChat, setSelectedChat] = useState();
    const [notification, setNotification] = useState([]);
    const [chats, setChats] = useState();
    const value = {
        selectedChat,
        setSelectedChat,
        notification,
        setNotification,
        chats,
        setChats,
    };
    const { newUser } = useAuthContext();
    console.log("newUser", newUser);
    useEffect(() => {
        async function getChats() {
            try {
                const { data } = await ChatApi.get(`/get`, {
                    params: { userId: newUser._id },
                });
                setChats(data);
            } catch (error) {
                console.log(error);
            }
        }
        getChats();
    }, [newUser]);

    return (
        <ChatContext.Provider value={value}>
            {props.children}
        </ChatContext.Provider>
    );
};
