import { createContext, useState } from "react";

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
    return (
        <ChatContext.Provider value={value}>
            {props.children}
        </ChatContext.Provider>
    );
};
