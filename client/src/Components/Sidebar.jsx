import { useState } from "react";
import { Link } from "react-router-dom";
import classes from "../Styles/Sidebar.module.css";
// Icons
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { FaHome, FaStar, FaUserGraduate } from "react-icons/fa";
import { FaQuinscape, FaTags } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { IoMailUnread } from "react-icons/io5";
import { RiMastercardFill } from "react-icons/ri";
import { toast } from "react-toastify";
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
    // {
    //     name: "My Questions",
    //     icon: <FaClipboardList />,
    //     path: "/",
    // },
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
      name: "Inbox *",
      icon: (
        <IoMailUnread
          style={{
            color: "var(--yellow)",
          }}
        />
      ),
      path: "/chat",
    },
    {
      name: "Subscriptions",
      icon: <RiMastercardFill />,
      path: "/subscription",
    },
    {
      name: "FAQ",
      icon: <FaQuinscape />,
      path: "/faq",
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
          {
            console.log(
              "newUserCHECKER",
              !newUser?.subscription?.status,
              !newUser?.instructor
            );
          }
          if (
            item.name === "Inbox" &&
            (!newUser?.subscription?.status || !newUser?.instructor)
          ) {
            return (
              <li
                key={index}
                className={`${index === activeIndex ? classes["active"] : ""}`}
                onClick={() => {
                  setActiveIndex(index);
                  console.log("INBOX");
                  toast.error(
                    "Please subscribe or register as instructor to use this feature."
                  );
                }}
              >
                <Link to={"#"}>
                  {item.icon}
                  <span
                    style={{
                      color: "var(--yellow) !important",
                    }}
                  >
                    {item.name}
                  </span>
                </Link>
              </li>
            );
          }
          return (
            <li
              key={index}
              className={`${index === activeIndex ? classes["active"] : ""}`}
              onClick={() => {
                setActiveIndex(index);
              }}
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
