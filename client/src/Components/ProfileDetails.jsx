import { useState } from "react";
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

// Icons
import { GoSidebarExpand } from "react-icons/go";
const ProfileDetails = ({ rightSidebarState, setRightSidebarState }) => {
    const [followState, setFollowState] = useState(false);
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
                            src="https://thumbs.dreamstime.com/z/student-avatar-illustration-user-profile-icon-youth-avatar-student-avatar-illustration-simple-cartoon-user-portrait-user-profile-276214170.jpg?w=768"
                            alt="Avatar"
                        />
                    </div>
                    <div className={`${classes["info"]}`}>
                        <h2 className={`${classes["username"]}`}>
                            User Fullname
                        </h2>
                        <p className={`${classes["email"]}`}>
                            username@email.com
                        </p>
                        <p className={`${classes["bio"]}`}>
                            Bio: Lorem ipsum dolor sit amet consectetur
                            adipisicing elit. Blanditiis, voluptates.
                        </p>
                        {followState ? (
                            <SmallButtonLiteAc
                                text={`+ Follow`}
                                func={() => {
                                    setFollowState((prev) => !prev);
                                }}
                            />
                        ) : (
                            <SmallButtonDeepAc
                                text={`- Unfollow`}
                                func={() => {
                                    setFollowState((prev) => !prev);
                                }}
                            />
                        )}
                    </div>
                </div>
                <div className={`${classes["profile-btn"]}`}>
                    <div className={`${classes["desktop-view-button"]}`}>
                        <LinkButton text="Edit Profile" to="/edit-profile" />
                    </div>
                </div>
            </div>
            <div className={`${classes["personal-cards"]}`}>
                <div
                    className={`${classes["card"]} ${classes["question-answer"]}`}
                >
                    <div>
                        <span>1</span>
                        <span>Question</span>
                    </div>
                    <div>
                        <span>0</span>
                        <span>Answer</span>
                    </div>
                </div>
                <div className={`${classes["card"]} ${classes["points"]}`}>
                    <div>
                        <span>4</span>
                        <span>Follower</span>
                    </div>
                    <div>
                        <span>10</span>
                        <span>Following</span>
                    </div>
                </div>
                <div className={`${classes["card"]} ${classes["badge"]}`}>
                    <div>
                        <span>0</span>
                        <span>Points</span>
                    </div>
                    <div>
                        <span>Beginner</span>
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
                <SingleQuestion />
                <SingleQuestion />
                <SingleQuestion />
            </div>
        </div>
    );
};

export default ProfileDetails;
