import { useState } from "react";
import classes from "../../Styles/Home.module.css";
import RightSidebar from "../RightSidebar";
import Sidebar from "../Sidebar";
import PopularTagsCard from "../PopularTagsCard";

const Home = (props) => {
    const { sidebarState, setSidebarState, children } = props;
    console.log("props", props);
    return (
        <div className={`${classes["Home"]}`}>
            <Sidebar
                sidebarState={sidebarState}
                setSidebarState={setSidebarState}
            />
            <div className={`${classes["Main"]}`}>{children}</div>
        </div>
    );
};

export default Home;
