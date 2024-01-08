import { useEffect, useRef, useState } from "react";
import { useGetAllUsers } from "../../Hooks/useGetAllUser";
import classes from "../../Styles/Chat.module.css";
import { makeProfileImageURL } from "../../Utilities/utilities";
import { useChatContext } from "../../Hooks/useChatContext";
import ChatApi from "../../Apis/ChatApi";
import { useAuthContext } from "../../Hooks/useAuthContext";
import _ from "lodash";
import { Button } from "../Buttons";
import ScrollableFeed from "react-scrollable-feed";
const Chat = () => {
    const { newUser } = useAuthContext();
    const { users, loading, error } = useGetAllUsers();
    console.log("users", users);
    const [userSearch, setUserSearch] = useState("");

    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        if (userSearch === "") {
            setFilteredUsers(users);
        } else {
            const filtered = users.filter((user) =>
                user.fullname.toLowerCase().includes(userSearch.toLowerCase())
            );
            setFilteredUsers(filtered);
        }
    }, [userSearch, users]);

    const {
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        messages,
        setMessages,
    } = useChatContext();
    const [chatLoading, setLoadingChat] = useState(false);

    console.log("Chat", chats);

    const accessChat = async (userId) => {
        console.log(userId);

        try {
            setLoadingChat(true);
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await ChatApi.post(
                `/post`,
                { ownId: newUser._id, otherId: userId },
                config
            );
            console.log("Chat Data", data);
            if (!chats?.find((c) => c?._id === data?._id))
                setChats([data, ...chats]);
            setSelectedChat(data);
            setLoadingChat(false);
        } catch (error) {
            console.log(error);
            setLoadingChat(false);
        }
    };

    // Message Sending
    const [messageContent, setMessageContent] = useState("");
    const sendMessage = async () => {
        try {
            const config = {
                params: {
                    userId: newUser?._id,
                },
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await ChatApi.post(
                `/sendmessage`,
                {
                    chatId: selectedChat?._id,
                    content: messageContent,
                },
                config
            );
            console.log("Message Data", data);
            setMessageContent("");
            setMessages([...messages, data]);
        } catch (error) {
            console.log(error);
        }
    };

    console.log("All Messages", messages);
    const scrollableFeedRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom when messages change
        if (scrollableFeedRef.current) {
            scrollableFeedRef.current.scrollTop =
                scrollableFeedRef.current.scrollHeight;
        }
    }, [messages]);
    return (
        <div className={`${classes["Chat"]}`}>
            <div className={`${classes["user-box"]}`}>
                <div className={`${classes["search"]}`}>
                    <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Search User"
                        value={userSearch}
                        onChange={(e) => setUserSearch(e.target.value)}
                    />
                </div>
                <div className={`${classes["user-list"]}`}>
                    {!loading && !error && filteredUsers?.length === 0 && (
                        <h1>No User Found</h1>
                    )}
                    {loading && <h1>Loading...</h1>}
                    {error && <h1>{error}</h1>}
                    {userSearch ? (
                        <>
                            {userSearch &&
                                filteredUsers.map((user) => (
                                    <div
                                        onClick={() => accessChat(user._id)}
                                        className={`${classes["single-chat"]}`}
                                        key={user._id}
                                    >
                                        <div
                                            className={`${classes["user-image"]}`}
                                        >
                                            <img
                                                src={makeProfileImageURL(
                                                    user.image
                                                )}
                                                alt="Avatar"
                                            />
                                        </div>
                                        <div
                                            className={`${classes["user-info"]}`}
                                        >
                                            <h3>{user.fullname}</h3>
                                            <p>{user.email}</p>
                                        </div>
                                    </div>
                                ))}
                        </>
                    ) : (
                        <>
                            {chats?.map((chat) => {
                                const user = chat?.users?.find(
                                    (user) => user?._id !== newUser._id
                                );
                                return (
                                    <div
                                        onClick={() => setSelectedChat(chat)}
                                        className={`${classes["single-chat"]}`}
                                        key={user._id}
                                    >
                                        <div
                                            className={`${classes["user-image"]}`}
                                        >
                                            <img
                                                src={makeProfileImageURL(
                                                    user.image
                                                )}
                                                alt="Avatar"
                                            />
                                        </div>
                                        <div
                                            className={`${classes["user-info"]}`}
                                        >
                                            <h3>{user.fullname}</h3>
                                            <p>
                                                {_.truncate(
                                                    chat?.latestMessage
                                                        ?.content,
                                                    {
                                                        length: 20,
                                                        omission: "...",
                                                    }
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </>
                    )}
                </div>
            </div>

            {/* Chat Box  */}
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
                <div
                    ref={scrollableFeedRef}
                    className={`${classes["messages"]}`}
                >
                    {chatLoading && <h1>Loading...</h1>}
                    {!chatLoading && !selectedChat && (
                        <h3 className={`${classes["no-chat-selected"]}`}>
                            Select a chat to start messaging
                        </h3>
                    )}

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
                                                    : classes[
                                                          "message-receiver"
                                                      ]
                                            }`}
                                        >
                                            <p>{message.content}</p>
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
                        />
                        <Button text="Send" func={sendMessage} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chat;
