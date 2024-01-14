import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import ChatApi from "../../Apis/ChatApi";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { useChatContext } from "../../Hooks/useChatContext";
import { useGetAllUsers } from "../../Hooks/useGetAllUser";
import classes from "../../Styles/Chat.module.css";
import { makeProfileImageURL } from "../../Utilities/utilities";
import avatar_logo from "../../assets/avatar.png";
import ChatBox from "../chats/ChatBox";
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
                <div className={`${classes["page-header"]}`}>
                    <Link to={`/`}>
                        <FaLongArrowAltLeft />
                        <span>Go to Home</span>
                    </Link>
                </div>
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
                                filteredUsers.map((user) => {
                                    return (
                                        <>
                                            {user?._id !== newUser?._id &&
                                                user?.instructor && (
                                                    <div
                                                        onClick={() =>
                                                            accessChat(user._id)
                                                        }
                                                        className={`${classes["single-chat"]}`}
                                                        key={user._id}
                                                    >
                                                        <div
                                                            className={`${classes["user-image"]}`}
                                                        >
                                                            {user?.image !==
                                                            undefined ? (
                                                                <img
                                                                    src={makeProfileImageURL(
                                                                        user?.image
                                                                    )}
                                                                    alt="Avatar"
                                                                />
                                                            ) : (
                                                                <img
                                                                    src={
                                                                        avatar_logo
                                                                    }
                                                                    alt="Avatar"
                                                                />
                                                            )}
                                                        </div>
                                                        <div
                                                            className={`${classes["user-info"]}`}
                                                        >
                                                            <h3>
                                                                {user.fullname}
                                                            </h3>
                                                            <p>{user.email}</p>
                                                        </div>
                                                    </div>
                                                )}
                                        </>
                                    );
                                })}
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
                                            {user?.image !== undefined ? (
                                                <img
                                                    src={makeProfileImageURL(
                                                        user?.image
                                                    )}
                                                    alt="Avatar"
                                                />
                                            ) : (
                                                <img
                                                    src={avatar_logo}
                                                    alt="Avatar"
                                                />
                                            )}
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
            {!chatLoading && !selectedChat && (
                <h3 className={`${classes["no-chat-selected"]}`}>
                    Select a chat to start messaging
                </h3>
            )}
            {selectedChat && (
                <ChatBox
                    chatLoading={chatLoading}
                    setLoadingChat={chatLoading}
                />
            )}
        </div>
    );
};

export default Chat;
