import classes from "../Styles/RightSidebar.module.css";

// Icons
import { ImCross } from "react-icons/im";
const RightSidebar = ({
    setRightSidebarState,
    rightSidebarState,
    children,
}) => {
    return (
        <div
            className={`${classes["RightSidebar"]} ${
                rightSidebarState ? classes["active"] : ""
            }`}
        >
            <div className={`${classes["close-btn"]}`}>
                <ImCross
                    onClick={() => setRightSidebarState((prev) => !prev)}
                />
            </div>

            {children}

            <div style={{ visibility: "hidden", height: "100px" }}>sfsd</div>
            <div style={{ visibility: "hidden", height: "100px" }}>sfsd</div>
            {/* <div style={{ visibility: "hidden", height: "100px" }}>sfsd</div> */}
        </div>
    );
};

export default RightSidebar;
