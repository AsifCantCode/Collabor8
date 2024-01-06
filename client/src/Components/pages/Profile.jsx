import { useState } from "react";
import classes from "../../Styles/Profile.module.css";
import ProfileDetails from "../ProfileDetails";
import RightSidebar from "../RightSidebar";
import { useGetProfileInfo } from "../../Hooks/useGetProfileInfo";
import { useParams } from "react-router-dom";
import { useGetPersonalQuestion } from "../../Hooks/useGetPersonalQuestion";

const Profile = () => {
    const [rightSidebarState, setRightSidebarState] = useState(false);
    const { userId } = useParams();
    // console.log("userId", userId);
    const {
        profile,
        loading: profileLoading,
        error: profileError,
    } = useGetProfileInfo(userId);

    const {
        question,
        loading: questionLoading,
        error: questionError,
    } = useGetPersonalQuestion(userId);
    return (
        <div className={`${classes["Profile"]}`}>
            <ProfileDetails
                setRightSidebarState={setRightSidebarState}
                rightSidebarState={rightSidebarState}
                profile={profile}
                questionLoading={questionLoading}
                questionError={questionError}
                question={question}
                profileLoading={profileLoading}
                profileError={profileError}
            />
            <RightSidebar
                setRightSidebarState={setRightSidebarState}
                rightSidebarState={rightSidebarState}
            />
        </div>
    );
};

export default Profile;
