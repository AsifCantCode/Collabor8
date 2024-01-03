import { useState } from "react";
import classes from "../../Styles/Profile.module.css";
import ProfileDetails from "../ProfileDetails";
import RightSidebar from "../RightSidebar";

const Profile = () => {
    const [rightSidebarState, setRightSidebarState] = useState(false);
    return (
        <div className={`${classes["Profile"]}`}>
            <ProfileDetails
                setRightSidebarState={setRightSidebarState}
                rightSidebarState={rightSidebarState}
            />
            <RightSidebar
                setRightSidebarState={setRightSidebarState}
                rightSidebarState={rightSidebarState}
            />
        </div>
    );
};

export default Profile;
