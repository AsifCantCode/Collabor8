import { useEffect, useState } from "react";
import { useGetAllUsers } from "../../Hooks/useGetAllUser";
import classes from "../../Styles/Chat.module.css";
import { makeProfileImageURL } from "../../Utilities/utilities";
import { useChatContext } from "../../Hooks/useChatContext";
import ChatApi from "../../Apis/ChatApi";
import { useAuthContext } from "../../Hooks/useAuthContext";
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

    const { selectedChat, setSelectedChat, chats, setChats } = useChatContext();
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
                                        onClick={() => selectedChat(chat)}
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
                                );
                            })}
                        </>
                    )}

                    {/* <div className={`${classes["single-chat"]}`}>
                        <div className={`${classes["user-image"]}`}>
                            <img
                                src="https://thumbs.dreamstime.com/z/student-avatar-illustration-user-profile-icon-youth-avatar-student-avatar-illustration-simple-cartoon-user-portrait-user-profile-276214170.jpg?w=768"
                                alt="Avatar"
                            />
                        </div>
                        <div className={`${classes["user-info"]}`}>
                            <h3>Tanvir Hossain Dihan</h3>
                            <p>tanvirh.dihan@gmail.com</p>
                        </div>
                    </div>
                    <div className={`${classes["single-chat"]}`}>
                        <div className={`${classes["user-image"]}`}>
                            <img
                                src="https://thumbs.dreamstime.com/z/student-avatar-illustration-user-profile-icon-youth-avatar-student-avatar-illustration-simple-cartoon-user-portrait-user-profile-276214170.jpg?w=768"
                                alt="Avatar"
                            />
                        </div>
                        <div className={`${classes["user-info"]}`}>
                            <h3>Tanvir Hossain Dihan</h3>
                            <p>tanvirh.dihan@gmail.com</p>
                        </div>
                    </div> */}
                </div>
            </div>
            <div className={`${classes["chat-box"]}`}></div>
        </div>
    );
};

export default Chat;
