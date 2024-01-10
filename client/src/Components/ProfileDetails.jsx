import { useEffect, useState } from "react";
import classes from "../Styles/ProfileDetails.module.css";
import {
    ButtonWithIconOnlyTransparent,
    LinkButton,
    SmallButton,
    SmallButtonAc,
    SmallButtonDeepAc,
    SmallButtonLite,
    SmallButtonLiteAc,
} from "./Buttons";
import SingleQuestion from "./questions/SingleQuestion";
import _ from "lodash";

// Icons
import { GoSidebarExpand } from "react-icons/go";
import { useAuthContext } from "../Hooks/useAuthContext";
import { useGlobalContext } from "../Hooks/useGlobalContext";
import { makeProfileImageURL } from "../Utilities/utilities";
import UserApi from "../apis/UserApi";
const ProfileDetails = ({
    profile,
    profileLoading,
    profileError,
    question,
    questionLoading,
    questionError,
}) => {
    const [followState, setFollowState] = useState(false);
    const { user, newUser } = useAuthContext();
    const [currentUser, setCurrentUser] = useState(
        newUser?._id === profile?._id
    );

    const { rightSidebarState, setRightSidebarState } = useGlobalContext();
    useEffect(() => {
        setCurrentUser(newUser?._id === profile?._id);
        const findFollwingUser = newUser?.following?.find(
            (followingUser) => followingUser._id === profile?._id
        );
        if (findFollwingUser) {
            setFollowState(true);
        } else {
            setFollowState(false);
        }
    }, [newUser, profile]);

    const handleFollowUnfollow = async (follow) => {
        try {
            console.log("profile", profile);
            /**FOLLOW-UNFOLLOW (if follow is given true will follow, if given false will unfollow) */
            const response = await UserApi.put(
                "/follow-unfollow",
                { userId: profile?._id, follow },
                {
                    headers: {
                        Authorization: `Bearer ${user}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        setFollowState((prev) => !prev);
    };
    return (
        <div className={`${classes["ProfileDetails"]}`}>
            <div className={`${classes["responsive-button"]}`}>
                <ButtonWithIconOnlyTransparent
                    func={() => {
                        console.log("Active Function Called");
                        console.log(rightSidebarState);
                        setRightSidebarState((prev) => !prev);
                    }}
                    icon={<GoSidebarExpand />}
                />
            </div>
            <div className={`${classes["personal-info"]}`}>
                <div className={`${classes["info-part"]}`}>
                    <div className={`${classes["profile-img"]}`}>
                        <img
                            src={makeProfileImageURL(profile?.image)}
                            alt="Avatar"
                        />
                    </div>
                    <div className={`${classes["info"]}`}>
                        <h2 className={`${classes["username"]}`}>
                            {profile?.fullname}
                        </h2>
                        <p className={`${classes["email"]}`}>
                            {profile?.email}
                        </p>
                        <p className={`${classes["bio"]}`}>
                            {profile?.bio || ""}
                        </p>
                        {!currentUser && newUser && (
                            <>
                                {!followState ? (
                                    <SmallButtonLiteAc
                                        text={`+ Follow`}
                                        func={() => {
                                            handleFollowUnfollow(true);
                                        }}
                                    />
                                ) : (
                                    <SmallButtonDeepAc
                                        text={`- Unfollow`}
                                        func={() => {
                                            handleFollowUnfollow(false);
                                        }}
                                    />
                                )}
                            </>
                        )}
                    </div>
                </div>
                <div className={`${classes["profile-btn"]}`}>
                    {currentUser && (
                        <div className={`${classes["desktop-view-button"]}`}>
                            <LinkButton
                                text="Edit Profile"
                                to="/edit-profile"
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className={`${classes["personal-cards"]}`}>
                <div
                    className={`${classes["card"]} ${classes["question-answer"]}`}
                >
                    <div>
                        <span>{profile?.questionCount}</span>
                        <span>Question</span>
                    </div>
                    <div>
                        <span>{profile?.answerCount}</span>
                        <span>Answer</span>
                    </div>
                </div>
                <div className={`${classes["card"]} ${classes["points"]}`}>
                    <div>
                        <span>{profile?.followers}</span>
                        <span>Followers</span>
                    </div>
                    <div>
                        <span>{profile?.following?.length}</span>
                        <span>Following</span>
                    </div>
                </div>
                <div className={`${classes["card"]} ${classes["badge"]}`}>
                    <div>
                        <span>{profile?.points}</span>
                        <span>Points</span>
                    </div>
                    <div>
                        <span>{_.capitalize(profile?.badge)}</span>
                        <span>Badge</span>
                    </div>
                </div>
            </div>

            <div className={`${classes["message-area"]}`}>
                <p>
                    Do you want to be a instructor? Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Distinctio a quod harum
                    voluptatibus laudantium architecto consectetur, voluptas
                    magnam tenetur minus!
                </p>
                <div className={`${classes["message-btn"]}`}>
                    <LinkButton text="Apply Now" to="/apply" />
                    <LinkButton text="Apply Now" to="/apply" />
                </div>
            </div>
            <div className={`${classes["questions"]}`}>
                <h3>My Questions</h3>
                {!questionLoading &&
                    !questionError &&
                    question &&
                    question?.map((question, index) => (
                        <SingleQuestion
                            key={index}
                            question={question}
                            editPost={newUser?._id === profile?._id}
                        />
                    ))}
            </div>
        </div>
    );
};

export default ProfileDetails;
