import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useState } from "react";
import HomeWithSidebar from "./pages/HomeWithSidebar";
// import "react-notifications/lib/notifications.css";
const LayoutWithSidebar = () => {
    const [sidebarState, setSidebarState] = useState(false);
    return (
        <div className={`Layout`}>
            <Navbar setSidebarState={setSidebarState} />
            <HomeWithSidebar
                sidebarState={sidebarState}
                setSidebarState={setSidebarState}
            >
                <Outlet />
            </HomeWithSidebar>

            {/* <NotificationContainer /> */}
        </div>
    );
};

export default LayoutWithSidebar;
