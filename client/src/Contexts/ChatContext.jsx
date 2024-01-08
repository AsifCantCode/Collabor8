import { createContext, useEffect, useState } from "react";
import { useAuthContext } from "../Hooks/useAuthContext";
import ChatApi from "../Apis/ChatApi";

export const ChatContext = createContext();

export const ChatContextProvider = (props) => {
    const [selectedChat, setSelectedChat] = useState();
    const [notification, setNotification] = useState([]);
    const [chats, setChats] = useState();
    const [messages, setMessages] = useState([]);

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

    useEffect(() => {
        async function getMessages() {
            try {
                const { data } = await ChatApi.get(`/getmessage`, {
                    params: { chatId: selectedChat?._id },
                });
                setMessages(data);
            } catch (error) {
                console.log(error);
            }
        }
        if (selectedChat) getMessages();
    }, [selectedChat]);

    const value = {
        selectedChat,
        setSelectedChat,
        notification,
        setNotification,
        chats,
        setChats,
        messages,
        setMessages,
    };
    return (
        <ChatContext.Provider value={value}>
            {props.children}
        </ChatContext.Provider>
    );
};
