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

const Sidebar = ({ sidebarState }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const navItems = [
        {
            name: "Home",
            icon: <FaHome />,
            path: "/",
        },
        {
            name: "Profile",
            icon: <FaUserGraduate />,
            path: "/profile",
        },

        {
            name: "Ask a Question",
            icon: <BsFillQuestionSquareFill />,
            path: "/new-question",
        },
        {
            name: "My Questions",
            icon: <FaClipboardList />,
            path: "/",
        },
        {
            name: "Collections",
            icon: <FaStar />,
            path: "/",
        },
        {
            name: "Tags",
            icon: <FaTags />,
            path: "/all-tags",
        },
        {
            name: "Subscriptions",
            icon: <RiMastercardFill />,
            path: "/",
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
            </ul>
        </div>
    );
};

export default Sidebar;
