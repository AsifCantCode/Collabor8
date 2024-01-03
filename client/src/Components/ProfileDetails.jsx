import classes from "../Styles/ProfileDetails.module.css";
import { LinkButton } from "./Buttons";

const ProfileDetails = ({ rightSidebarState, setRightSidebarState }) => {
    return (
        <div className={`${classes["ProfileDetails"]}`}>
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
                    </div>
                </div>
                <div className={`${classes["profile-btn"]}`}>
                    <div className={`${classes["desktop-view-button"]}`}>
                        <LinkButton text="Edit Profile" to="/new-question" />
                    </div>

                    {/* <div className={`${classes["responsive-button"]}`}>
                        <ButtonWithIconOnly icon={<MdOutlineEditCalendar />} />
                        <ButtonWithIconOnlyTransparent
                            func={() => {
                                console.log("Active Function Called");
                                console.log(rightSidebarState);
                                setRightSidebarState((prev) => !prev);
                            }}
                            icon={<GoSidebarExpand />}
                        />
                    </div> */}
                </div>
                <div></div>
            </div>
            <div></div>
            <div></div>
        </div>
    );
};

export default ProfileDetails;
