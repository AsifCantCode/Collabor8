import { useState } from "react";
import classes from "../../Styles/Profile.module.css";
import ProfileDetails from "../ProfileDetails";
import RightSidebar from "../RightSidebar";
import { useGetProfileInfo } from "../../Hooks/useGetProfileInfo";
import { useParams } from "react-router-dom";
import { useGetPersonalQuestion } from "../../Hooks/useGetPersonalQuestion";

const Profile = () => {
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
                profile={profile}
                questionLoading={questionLoading}
                questionError={questionError}
                question={question}
                profileLoading={profileLoading}
                profileError={profileError}
            />
            <RightSidebar />
        </div>
    );
};

export default Profile;
