import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useState } from "react";
import Home from "./pages/Home";
// import "react-notifications/lib/notifications.css";
const Layout = () => {
    const [sidebarState, setSidebarState] = useState(false);
    return (
        <div className={`Layout`}>
            <Navbar setSidebarState={setSidebarState} />
            <Home sidebarState={sidebarState} setSidebarState={setSidebarState}>
                <Outlet />
            </Home>
            {/* <NotificationContainer /> */}
        </div>
    );
};

export default Layout;
