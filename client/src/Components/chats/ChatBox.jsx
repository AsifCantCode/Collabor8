import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { useChatContext } from "../../Hooks/useChatContext";
import classes from "../../Styles/Chat.module.css";
import {
    makeChatImageURL,
    makeProfileImageURL,
} from "../../Utilities/utilities";
import ChatApi from "../../Apis/ChatApi";
import ScrollableFeed from "react-scrollable-feed";
import { Button } from "../Buttons";
// import io from "socket.io-client";
// const ENDPOINT = "http://localhost:5001";
// let socket, selectedChatCompare;
import { LuImagePlus } from "react-icons/lu";
const ChatBox = ({ chatLoading, setLoadingChat }) => {
    const {
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        messages,
        setMessages,
        socket,
        selectedChatCompare,
        setSelectedChatCompare,
        notification,
    } = useChatContext();
    const { newUser } = useAuthContext();
    const imageInputRef = useRef(null);

    // console.log("Notification", notification);
    // Socket Connection
    // const [socketConnected, setSocketConnected] = useState(false);
    // useEffect(() => {
    //     socket = io(ENDPOINT);
    //     socket.emit("setup", newUser, (error) => {
    //         if (error) {
    //             alert(error);
    //         }
    //     });
    //     socket.on("connection", () => {
    //         console.log("Connected to Socket");
    //         setSocketConnected(true);
    //     });
    // }, [newUser]);

    useEffect(() => {
        socket.on("message recieved", (newMessageRecieved) => {
            console.log("Message Recieved", newMessageRecieved);
            if (
                !selectedChatCompare ||
                selectedChatCompare._id !== newMessageRecieved.chat._id
            ) {
                // if (!notification.includes(newMessageRecieved)) {
                //     setNotification([newMessageRecieved, ...notification]);
                //     setFetchAgain(!fetchAgain);
                // }
            } else {
                setMessages([...messages, newMessageRecieved]);
            }
        });
    });
    // Message Sending
    const [messageContent, setMessageContent] = useState("");
    const [selectedImage, setSelectedImage] = useState([]);
    const [imageViewer, setImageViewer] = useState([]);
    const [fileError, setFileError] = useState(false);
    const handleImageClick = () => {
        // Trigger the file input when the box is clicked
        imageInputRef.current.click();
    };
    const handleImageChange = (event) => {
        setFileError(false);
        const allowedImageTypes = ["image/jpeg", "image/jpg", "image/png"];
        const file = event.target.files[0];
        if (allowedImageTypes.includes(file.type)) {
            setSelectedImage([...selectedImage, file]);
            console.log(file);
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImageViewer([...imageViewer, reader.result]);
                };
                reader.readAsDataURL(file);
            }
        } else {
            setFileError(true);
        }
    };
    const sendMessage = async () => {
        const formData = new FormData();
        formData.append("content", messageContent);
        formData.append("chatId", selectedChat?._id);
        for (let i = 0; i < selectedImage.length; i++) {
            formData.append("images", selectedImage[i]);
        }
        try {
            const config = {
                params: {
                    userId: newUser?._id,
                },
                // headers: {
                //     "Content-type": "application/json",
                // },
            };
            const { data } = await ChatApi.post(
                `/sendmessage`,
                // {
                //     chatId: selectedChat?._id,
                //     content: messageContent,
                // },
                formData,
                config
            );
            console.log("Message Data", data);
            setMessageContent("");
            setSelectedImage([]);
            socket.emit("new message", data);
            setMessages([...messages, data]);
        } catch (error) {
            console.log(error);
        }
    };

    console.log("All Messages", messages);
    const scrollableFeedRef = useRef(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await ChatApi.get(`/getmessage`, {
                    params: { chatId: selectedChat?._id },
                });
                setMessages(data);
                socket.emit("join room", selectedChat?._id);
            } catch (error) {
                console.log(error);
            }
        };
        if (selectedChat) fetchMessages();
        // selectedChatCompare = selectedChat;
        setSelectedChatCompare(selectedChat);
    }, [selectedChat, setMessages, socket, setSelectedChatCompare]);
    useEffect(() => {
        // Scroll to the bottom when messages change
        if (scrollableFeedRef.current) {
            scrollableFeedRef.current.scrollTop =
                scrollableFeedRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className={`${classes["chat-box"]}`}>
            {/* Chat Header  */}
            {selectedChat && (
                <div className={`${classes["chat-header"]}`}>
                    <div
                        className={`${classes["user-image"]}`}
                        onClick={() => setSelectedChat(null)}
                    >
                        <img
                            src={makeProfileImageURL(
                                selectedChat?.users?.find(
                                    (user) => user?._id !== newUser._id
                                ).image
                            )}
                            alt="Avatar"
                        />
                    </div>
                    <div
                        className={`${classes["user-info"]}`}
                        onClick={() => setSelectedChat(null)}
                    >
                        <h3>
                            {
                                selectedChat?.users?.find(
                                    (user) => user?._id !== newUser._id
                                ).fullname
                            }
                        </h3>
                        <p>
                            {
                                selectedChat?.users?.find(
                                    (user) => user?._id !== newUser._id
                                ).email
                            }
                        </p>
                    </div>
                </div>
            )}
            {/* Chat Messages  */}
            <div ref={scrollableFeedRef} className={`${classes["messages"]}`}>
                {chatLoading && <h1>Loading...</h1>}

                {!chatLoading && selectedChat && (
                    <>
                        <ScrollableFeed>
                            {messages?.map((message) => (
                                <div
                                    className={`${classes["message"]}`}
                                    key={message?._id}
                                >
                                    <div
                                        className={`${
                                            message?.sender?._id ===
                                            newUser?._id
                                                ? classes["message-sender"]
                                                : classes["message-receiver"]
                                        }`}
                                    >
                                        {message?.content && (
                                            <p>{message?.content}</p>
                                        )}

                                        {message?.images && (
                                            <div>
                                                {message?.images?.map(
                                                    (image) => (
                                                        <img
                                                            key={image}
                                                            src={makeChatImageURL(
                                                                image
                                                            )}
                                                            alt="Image"
                                                        />
                                                    )
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </ScrollableFeed>
                    </>
                )}
            </div>
            {selectedChat && (
                <div className={`${classes["message-input"]}`}>
                    <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Type a message"
                        value={messageContent}
                        onChange={(e) => setMessageContent(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                sendMessage();
                            }
                        }}
                    />
                    <div className={`${classes["image-selector"]}`}>
                        <LuImagePlus onClick={handleImageClick} />
                        <input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: "none" }}
                            ref={imageInputRef}
                        />
                    </div>
                    <Button text="Send" func={sendMessage} />
                </div>
            )}
        </div>
    );
};

export default ChatBox;
