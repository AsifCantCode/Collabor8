import classes from "../styles/Navbar.module.css";
import collabor8_logo from "../assets/collaboration.png";
import search_logo from "../assets/magnifying-glass.png";
import expert_logo from "../assets/badge.png";
import inbox_logo from "../assets/messages.png";
import avatar_logo from "../assets/avatar.png";
import exit_logo from "../assets/exit.png";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Button, ButtonTransarent, LinkButtonTransarent } from "./Buttons";
import { useAuthContext } from "../Hooks/useAuthContext";
import { useChatContext } from "../Hooks/useChatContext";
import _ from "lodash";
// Icons
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { FaAward } from "react-icons/fa6";
import { MdOutlineLogout } from "react-icons/md";
import { MdNotifications } from "react-icons/md";
import { MdNotificationsActive } from "react-icons/md";
import NotificationApi from "../Apis/NotificationApi";
const Navbar = ({ setSidebarState }) => {
    const [tempState, setTempState] = useState(false);
    const [notificationBox, setNotificationBox] = useState(false);

    const navRef = useRef();
    const { user, newUser, logout } = useAuthContext();
    console.log("NEW USER From Navbar", newUser);
    useEffect(() => {
        console.log("NAV HEIGHT", navRef.current.offsetHeight);
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
    };
    const { notification } = useChatContext();
    const [unOpenedNotification, setUnOpenedNotification] = useState([]);
    useEffect(() => {
        if (notification) {
            const temp = notification?.filter((noti) => !noti?.opened);
            setUnOpenedNotification(temp);
        }
    }, [notification]);

    const handleMarkAsOpened = async (notificationId) => {
        try {
            const { data } = await NotificationApi.put(
                `/markAsOpened`,
                { notificationId },
                {
                    header: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("MARKED AS OPENED", data);
            setNotificationBox((prev) => !prev);
            const temp = unOpenedNotification?.filter(
                (noti) => noti?._id !== notificationId
            );
            setUnOpenedNotification(temp);
        } catch (error) {
            console.log(error);
        }
    };

    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const handleSearch = (e) => {
        e.preventDefault();
        setSearchQuery("");
        if (searchQuery) {
            navigate(`/search/${searchQuery}`);
        }
    };
    return (
        <div ref={navRef} className={classes.navbar}>
            <Helmet>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Kaushan+Script:wght@400&display=swap"
                />
            </Helmet>
            {/* Logo  */}
            <Link to="/" className={classes.logoContainer}>
                <img
                    src={collabor8_logo}
                    alt="Icon"
                    className={classes.logoIcon}
                />
                <span className={classes.collabor8Text}>Collabor8</span>
            </Link>

            {/* Search Bar  */}
            <div className={classes.searchBarContainer}>
                <input
                    type="text"
                    placeholder="Search"
                    className={classes.searchBar}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <img
                    src={search_logo}
                    alt="Search Icon"
                    className={classes.searchLogo}
                    onClick={handleSearch}
                />
            </div>

            {/* Navbar Items  */}
            <div className={`${classes["navItems"]}`}>
                <div
                    className={`${classes["navbarItem"]} ${
                        classes["sidebarIcon"]
                    } ${tempState ? classes["active"] : ""}`}
                >
                    <GiHamburgerMenu
                        onClick={() => setSidebarState((prev) => !prev)}
                    />
                </div>

                {user && newUser ? (
                    <>
                        {/* Badge  */}
                        <div
                            className={`${classes["navbarItem"]} ${classes["badge"]}`}
                        >
                            <img
                                src={expert_logo}
                                alt="Icon"
                                className={classes.expertIcon}
                            />
                            <span className={classes.navbarText}>
                                {_.capitalize(newUser?.badge)}
                            </span>
                        </div>

                        {/* Notification  */}
                        <div
                            className={`${classes["navbarItem"]} ${classes["notification"]}`}
                        >
                            {unOpenedNotification?.length > 0 ? (
                                <div
                                    onClick={() => {
                                        setNotificationBox((prev) => !prev);
                                    }}
                                >
                                    <MdNotificationsActive
                                        className={
                                            classes.notificationIconActive
                                        }
                                    />
                                    <span className={classes.navbarText}>
                                        {unOpenedNotification?.length}
                                    </span>
                                </div>
                            ) : (
                                <MdNotifications
                                    className={classes.notificationIcon}
                                />
                            )}
                        </div>
                        {/* Profile  */}
                        <div
                            className={`${classes["navbarItem"]} ${classes["profile"]}`}
                        >
                            <Link to={`/profile/${newUser?._id}`}>
                                <img
                                    src={avatar_logo}
                                    alt="Icon"
                                    className={classes.icon}
                                />
                                <span className={classes.navbarText}>
                                    {newUser?.fullname?.split(" ")[0]}
                                </span>
                            </Link>
                            <div>
                                <MdOutlineLogout
                                    className={classes.iconExit}
                                    onClick={handleLogout}
                                />
                                {/* <img src={exit_logo} alt="Icon" /> */}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className={classes.navbarItem}>
                        <LinkButtonTransarent
                            to="/accounts"
                            text={`Login | Signup`}
                        />
                    </div>
                )}
            </div>
            <div
                className={`${classes["floating-notification"]} ${
                    notificationBox ? classes["active"] : ""
                }`}
            >
                <ul>
                    {unOpenedNotification &&
                        unOpenedNotification?.map((noti, index) => {
                            console.log("NOTI", noti);
                            let message = "";
                            let link = "";
                            if (noti?.notificationType === "message") {
                                message = `You have a new message from ${noti?.entityId?.entityId?.sender?.fullname}`;
                                link = `/chat`;
                            } else if (noti?.notificationType === "answer") {
                                message = `You question "${noti?.entityId?.entityId?.title}" has new answer`;
                                link = `/single-question/${noti?.entityId?.entityId?._id}`;
                            } else if (noti?.notificationType === "reply") {
                                console.log("REPLY", noti);
                                message = `Someone replied to your answer in the question "${noti?.entityId?.entityId?.title}"`;
                                link = `/single-question/${noti?.entityId?.entityId?._id}`;
                            }
                            return (
                                <li key={index}>
                                    <Link
                                        onClick={() =>
                                            handleMarkAsOpened(noti?._id)
                                        }
                                        to={link}
                                    >
                                        {message}
                                    </Link>
                                </li>
                            );
                        })}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
