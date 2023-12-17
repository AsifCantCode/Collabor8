
import React from "react";
import classes from "./QuestionBox.module.css";

export default function QuestionBox() {
    return (
        <div className={classes.QuestionBox}>
            <div className={classes.headerSection}>
                Related Questions
            </div>
            <div className={classes.boxContent}>
                {/* Your main content for the TagBox */}
                <div className={classes.question}>
                    <div className={classes.status}>12</div>
                    <div className={classes.questionTxt}>Sample</div>
                </div>
            </div>
        </div>
    );
}
