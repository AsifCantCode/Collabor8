import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useState } from "react";
import Home from "./pages/Home";

const Layout = () => {
    const [sidebarState, setSidebarState] = useState(false);
    return (
        <div className={`Layout`}>
            <Navbar setSidebarState={setSidebarState} />
            <Home sidebarState={sidebarState} setSidebarState={setSidebarState}>
                <Outlet />
            </Home>
        </div>
    );
};

export default Layout;
