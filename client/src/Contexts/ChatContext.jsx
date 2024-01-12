import { createContext, useEffect, useState } from "react";
import { useAuthContext } from "../Hooks/useAuthContext";
import ChatApi from "../Apis/ChatApi";
import io from "socket.io-client";
import NotificationApi from "../Apis/NotificationApi";

export const ChatContext = createContext();

const ENDPOINT = "http://localhost:5001";
// let socket, selectedChatCompare;
export const ChatContextProvider = (props) => {
    const [selectedChat, setSelectedChat] = useState();
    const [notification, setNotification] = useState([]);
    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState([]);
    const [socketConnected, setSocketConnected] = useState(false);
    const [socket, setSocket] = useState(io(ENDPOINT));
    const [selectedChatCompare, setSelectedChatCompare] = useState();

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
        // socket = io(ENDPOINT);
        // setSocket(io(ENDPOINT));
        socket.emit("setup", newUser, (error) => {
            if (error) {
                alert(error);
            }
        });
        socket.on("connection", () => {
            console.log("Connected to Socket");
            setSocketConnected(true);
        });
    }, [newUser, socket]);

    useEffect(() => {
        console.log("USEEFFECT");
        console.log("Socket", socket);
        socket.on("notification", (newNotification) => {
            console.log("NEW NOTIFICATION", newNotification);
            console.log("NOTIFICATION", notification);
            if (!notification.includes(newNotification))
                setNotification((prevNotifications) => [
                    ...prevNotifications,
                    newNotification,
                ]);
            if (newNotification?.notificationType === "message") {
                console.log(
                    "NEW MESSAGE",
                    newNotification?.entityId?.entityId?.chat
                );
                setChats([newNotification?.entityId?.entityId?.chat, ...chats]);
            }
        });
    }, [socket]);

    useEffect(() => {
        const fetchNotification = async () => {
            try {
                const { data } = await NotificationApi.get(`/`, {
                    params: { userId: newUser?._id },
                });
                setNotification(data);
                console.log("NOTIFICATION", data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchNotification();
    }, [newUser]);

    // useEffect(() => {
    //     async function getMessages() {
    //         try {
    //             const { data } = await ChatApi.get(`/getmessage`, {
    //                 params: { chatId: selectedChat?._id },
    //             });
    //             setMessages(data);

    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     if (selectedChat) getMessages();
    // }, [selectedChat]);

    const value = {
        selectedChat,
        setSelectedChat,
        notification,
        setNotification,
        chats,
        setChats,
        messages,
        setMessages,
        socketConnected,
        setSocketConnected,
        socket,
        setSocket,
        selectedChatCompare,
        setSelectedChatCompare,
    };
    return (
        <ChatContext.Provider value={value}>
            {props.children}
        </ChatContext.Provider>
    );
};
