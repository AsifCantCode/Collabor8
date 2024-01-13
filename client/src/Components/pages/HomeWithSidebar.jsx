import { cloneElement, useState } from "react";
import classes from "../../Styles/Home.module.css";
import RightSidebar from "../RightSidebar";
import Sidebar from "../Sidebar";
import PopularTagsCard from "../PopularTagsCard";
import PopularQuestionsCard from "../PopularQuestionsCard";

const HomeWithSidebar = (props) => {
    const { sidebarState, setSidebarState, children } = props;
    console.log("props", props);
    return (
        <div className={`${classes["Home"]}`}>
            <Sidebar
                sidebarState={sidebarState}
                setSidebarState={setSidebarState}
            />
            <div className={`${classes["Main"]}`}>{children}</div>
            <RightSidebar>
                <div>
                    <PopularTagsCard />
                    <PopularQuestionsCard />{" "}
                </div>
            </RightSidebar>
        </div>
    );
};

export default HomeWithSidebar;
