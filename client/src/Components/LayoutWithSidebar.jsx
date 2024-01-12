import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useState } from "react";
import HomeWithSidebar from "./pages/HomeWithSidebar";
import { ToastContainer } from "react-toastify";
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
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    );
};

export default LayoutWithSidebar;
