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
import { Button, SmallButtonAc } from "../Buttons";
// import io from "socket.io-client";
// const ENDPOINT = "http://localhost:5001";
// let socket, selectedChatCompare;
import { LuImagePlus } from "react-icons/lu";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { set } from "lodash";
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
                if (
                    !chats.find(
                        (chat) => chat._id === newMessageRecieved.chat._id
                    )
                )
                    setChats([newMessageRecieved?.chat, ...chats]);
                if (newMessageRecieved?.messageType === "request") {
                    setSelectedChat({ ...selectedChat, isOpen: "pending" });
                } else if (newMessageRecieved?.messageType === "accept") {
                    console.log("Accept");
                    setSelectedChat({ ...selectedChat, isOpen: "open" });
                } else if (newMessageRecieved?.messageType === "reject") {
                    setSelectedChat({ ...selectedChat, isOpen: "close" });
                }
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
    const handleDeleteImage = (index) => {
        console.log(index);
        const newImages = selectedImage.filter((image, i) => i !== index);
        const newImageViewer = imageViewer.filter((image, i) => i !== index);
        setImageViewer(newImageViewer);
        setSelectedImage(newImages);
    };
    const sendMessage = async (acceptOrReject) => {
        const formData = new FormData();
        formData.append("content", messageContent);
        formData.append("chatId", selectedChat?._id);

        let messageType;
        console.log(
            !selectedChat?.latestMessage,
            selectedChat?.isOpen === "close"
        );
        if (selectedChat?.isOpen === "close") {
            messageType = "request";
        } else if (selectedChat?.isOpen === "pending") {
            console.log("Accept or Reject", acceptOrReject);
            messageType = acceptOrReject;
        } else {
            messageType = "normal";
        }

        formData.append("messageType", messageType);
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
            setImageViewer([]);
            socket.emit("new message", data);
            setMessages([...messages, data]);
            if (messageType === "request") {
                setSelectedChat({ ...selectedChat, isOpen: "pending" });
            } else if (messageType === "accept") {
                setSelectedChat({ ...selectedChat, isOpen: "open" });
            } else if (messageType === "reject") {
                setSelectedChat({ ...selectedChat, isOpen: "close" });
            }
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

    console.log("Selected Chat", selectedChat);
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
                                    {message?.messageType !== "normal" && (
                                        // Special Message

                                        <div
                                            className={`${classes["special-message"]}`}
                                        >
                                            {message?.messageType ===
                                                "request" &&
                                                selectedChat?.isOpen ===
                                                    "pending" && (
                                                    <>
                                                        <p>
                                                            Request Pending...
                                                        </p>
                                                        {newUser?._id !==
                                                            message?.sender
                                                                ?._id && (
                                                            <>
                                                                <SmallButtonAc
                                                                    func={(
                                                                        e
                                                                    ) => {
                                                                        e.preventDefault();
                                                                        sendMessage(
                                                                            "accept"
                                                                        );
                                                                    }}
                                                                    text={
                                                                        "Accept"
                                                                    }
                                                                />
                                                                <SmallButtonAc
                                                                    func={(
                                                                        e
                                                                    ) => {
                                                                        e.preventDefault();
                                                                        sendMessage(
                                                                            "reject"
                                                                        );
                                                                    }}
                                                                    text={
                                                                        "Reject"
                                                                    }
                                                                />
                                                            </>
                                                        )}
                                                    </>
                                                )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </ScrollableFeed>
                    </>
                )}
            </div>
            {selectedChat && (
                <div className={`${classes["message-input"]}`}>
                    {imageViewer?.length > 0 && (
                        <div className={`${classes["image-previwer"]}`}>
                            {imageViewer &&
                                imageViewer.length > 0 &&
                                imageViewer.map((image, index) => (
                                    <div
                                        key={index}
                                        className={classes.imageBox}
                                        onClick={() => {
                                            handleDeleteImage(index);
                                        }}
                                    >
                                        <span
                                            className={`${classes["delete-btn"]}`}
                                        >
                                            <RiDeleteBin5Fill />
                                        </span>
                                        <img src={image} alt="Selected" />
                                    </div>
                                ))}
                        </div>
                    )}

                    {selectedChat?.isOpen !== "pending" && (
                        <>
                            <input
                                type="text"
                                name=""
                                id=""
                                placeholder={
                                    selectedChat?.isOpen === "open"
                                        ? "Type a message"
                                        : "Write Request Message"
                                }
                                value={messageContent}
                                onChange={(e) =>
                                    setMessageContent(e.target.value)
                                }
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
                            <Button
                                text={
                                    selectedChat?.isOpen === "open"
                                        ? "Send"
                                        : "Request"
                                }
                                func={sendMessage}
                            />
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default ChatBox;
