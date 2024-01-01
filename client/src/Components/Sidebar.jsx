import classes from "../Styles/Sidebar.module.css";
import { Link } from "react-router-dom";

// Icons
import { FaHome } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa";
import { FaTags } from "react-icons/fa6";
import { IoCreate } from "react-icons/io5";
import { useState } from "react";
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
            name: "Tags",
            icon: <FaTags />,
            path: "/tags",
        },
        {
            name: "Ask a Question",
            icon: <IoCreate />,
            path: "/ask",
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
