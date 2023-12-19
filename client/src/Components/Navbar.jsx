import classes from "../styles/Navbar.module.css";
import collabor8_logo from "../assets/collaboration.png";
import search_logo from "../assets/magnifying-glass.png";
import expert_logo from "../assets/badge.png";
import inbox_logo from "../assets/messages.png";
import avatar_logo from "../assets/avatar.png";
import exit_logo from "../assets/exit.png";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button, ButtonTransarent } from "./Buttons";
const Navbar = () => {
    const [tempState, setTempState] = useState(false);
    return (
        <div className={classes.navbar}>
            <Helmet>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Kaushan+Script:wght@400&display=swap"
                />
            </Helmet>
            {/* Logo  */}
            <Link className={classes.logoContainer}>
                <img
                    src={collabor8_logo}
                    alt="Icon"
                    className={classes.logoIcon}
                />
                <span className={classes.collabor8Text}>Collabor8</span>
            </Link>

            {/* Search Bar  */}
            <div className={classes.searchBarContainer}>
                <input
                    type="text"
                    placeholder="Search"
                    className={classes.searchBar}
                />
                <img
                    src={search_logo}
                    alt="Search Icon"
                    className={classes.searchLogo}
                />
            </div>

            {/* Navbar Items  */}
            {tempState ? (
                <div className={`${classes["navItems"]}`}>
                    <div className={classes.navbarItem}>
                        <img
                            src={expert_logo}
                            alt="Icon"
                            className={classes.expertIcon}
                        />
                        <span className={classes.navbarText}>Expert</span>
                    </div>

                    <div className={classes.navbarItem}>
                        <img
                            src={inbox_logo}
                            alt="Icon"
                            className={classes.icon}
                        />
                        <span className={classes.navbarText}>Inbox</span>
                    </div>
                    <div className={classes.navbarItem}>
                        <img
                            src={avatar_logo}
                            alt="Icon"
                            className={classes.icon}
                        />
                        <span className={classes.navbarText}>Asif</span>
                    </div>
                    <div className={classes.navbarItem}>
                        <img
                            src={exit_logo}
                            alt="Icon"
                            className={classes.iconExit}
                        />
                    </div>
                </div>
            ) : (
                <div className={`${classes["navItems"]}`}>
                    <div className={classes.navbarItem}>
                        <Button text={`Login`} />
                    </div>
                    <div className={classes.navbarItem}>
                        <ButtonTransarent text={`Registration`} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
