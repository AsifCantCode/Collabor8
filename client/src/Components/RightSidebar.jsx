import classes from "../Styles/RightSidebar.module.css";

// Icons
import { ImCross } from "react-icons/im";
const RightSidebar = ({ setRightSidebarState, rightSidebarState }) => {
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

            <h4>Right Sidebar</h4>
        </div>
    );
};

export default RightSidebar;
