import React from "react";
import classes from "./FinalNav.module.css";

export default function FinalNav() {
    return (
        <div className={classes.navbar}>
            <div className={classes.navbarItem}>
                {/* Icon */}
                <img
                    src="icon_path" // Replace with the actual path to your icon
                    alt="Icon"
                    className={classes.icon}
                />
            </div>
            <div className={classes.navbarItem}>
                {/* Text: Collabor8 */}
                <span className={classes.collabor8Text}>Collabor8</span>
            </div>
            <div className={classes.navbarItem}>
                {/* Search Bar */}
                <textarea
                    placeholder="Search"
                    className={classes.searchBar}
                ></textarea>
            </div>
            <div className={classes.navbarItem}>
                {/* Icon */}
                <img
                    src="icon_path" // Replace with the actual path to your icon
                    alt="Icon"
                    className={classes.icon}
                />
                {/* Text: Expert */}
                <span className={classes.navbarText}>Expert</span>
            </div>
            <div className={classes.navbarItem}>
                {/* Icon */}
                <img
                    src="icon_path" // Replace with the actual path to your icon
                    alt="Icon"
                    className={classes.icon}
                />
                {/* Text: Inbox */}
                <span className={classes.navbarText}>Inbox</span>
            </div>
            <div className={classes.navbarItem}>
                {/* Icon */}
                <img
                    src="icon_path" // Replace with the actual path to your icon
                    alt="Icon"
                    className={classes.icon}
                />
                {/* Text: Asif */}
                <span className={classes.navbarText}>Asif</span>
            </div>
            <div className={classes.navbarItem}>
                {/* Icon */}
                <img
                    src="icon_path" // Replace with the actual path to your icon
                    alt="Icon"
                    className={classes.icon}
                />
                {/* Add more icons and texts as needed */}
            </div>
        </div>
    );
}
