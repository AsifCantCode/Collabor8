import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useState } from "react";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
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

export default Layout;
