// TagBox.jsx
import React from "react";
import classes from "./TagBox.module.css";

export default function TagBox() {
    return (
        <div className={classes.TagBox}>
            <div className={classes.headerSection}>
                Tags
            </div>
            <div className={classes.boxContent}>
                {/* Your main content for the TagBox */}
            </div>
        </div>
    );
}
