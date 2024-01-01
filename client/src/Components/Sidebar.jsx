import classes from "../Styles/Sidebar.module.css";
import { Link } from "react-router-dom";

// Icons
import { FaHome } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa";
import { FaTags } from "react-icons/fa6";
import { IoCreate } from "react-icons/io5";
const Sidebar = ({ sidebarState }) => {
    return (
        <div
            className={`${classes["Sidebar"]} ${
                sidebarState ? classes["sidebar-active"] : ""
            }`}
        >
            <ul>
                <li className={`${classes["active"]}`}>
                    <Link>
                        <FaHome />
                        <span>Home</span>
                    </Link>
                </li>
                <li>
                    <Link>
                        <FaUserGraduate />
                        <span>Profile</span>
                    </Link>
                </li>
                <li>
                    <Link>
                        <FaTags />
                        <span>Tags</span>
                    </Link>
                </li>
                <li>
                    <Link>
                        <IoCreate />
                        <span>Ask a Question</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
