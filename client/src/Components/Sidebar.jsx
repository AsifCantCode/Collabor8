import classes from "../Styles/Sidebar.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
// Icons
import { FaHome } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa";
import { FaTags } from "react-icons/fa6";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { RiMastercardFill } from "react-icons/ri";
import { FaClipboardList } from "react-icons/fa";
import { FaQuinscape } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { useAuthContext } from "../Hooks/useAuthContext";

const Sidebar = ({ sidebarState, setSidebarState }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const { newUser } = useAuthContext();
    const navItems = [
        {
            name: "Home",
            icon: <FaHome />,
            path: "/",
        },
        {
            name: "Profile",
            icon: <FaUserGraduate />,
            path: `/profile/${newUser?._id}`,
        },

        {
            name: "Ask a Question",
            icon: <BsFillQuestionSquareFill />,
            path: "/question/new-question",
        },
        {
            name: "My Questions",
            icon: <FaClipboardList />,
            path: "/",
        },
        {
            name: "Collections",
            icon: <FaStar />,
            path: "/collection",
        },
        {
            name: "Tags",
            icon: <FaTags />,
            path: "/question/all-tags",
        },
        {
            name: "Subscriptions",
            icon: <RiMastercardFill />,
            path: "/subscription",
        },
        {
            name: "FAQ",
            icon: <FaQuinscape />,
            path: "/",
        },
    ];
    return (
        <div
            className={`${classes["Sidebar"]} ${
                sidebarState ? classes["sidebar-active"] : ""
            }`}
        >
            <div className={`${classes["close-btn"]}`}>
                <ImCross onClick={() => setSidebarState((prev) => !prev)} />
            </div>
            <ul>
                {navItems.map((item, index) => {
                    return (
                        <li
                            key={index}
                            className={`${
                                index === activeIndex ? classes["active"] : ""
                            }`}
                            onClick={() => setActiveIndex(index)}
                        >
                            <Link to={item.path}>
                                {item.icon}
                                <span>{item.name}</span>
                            </Link>
                        </li>
                    );
                })}
                {/* <li style={{ visibility: "hidden" }}>dsfsd</li>
                <li style={{ visibility: "hidden" }}>dsfsd</li>
                <li style={{ visibility: "hidden" }}>dsfsd</li> */}
            </ul>
        </div>
    );
};

export default Sidebar;
