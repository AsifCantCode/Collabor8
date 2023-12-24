// QcomponentDesk.jsx
import React from "react";
import classes from "./QcomponentDesk.module.css";
import Button2 from "./Button2"; 

export default function QcomponentDesk() {
    return (
        <div className={classes.QcomponentDesk}>
            <div className={classes.sidebox}>
                <div className={classes.votes}>0 Votes</div>
                <div className={classes.messages}>5 Messages</div>
                <div className={classes.views}>0 Views</div>
            </div>
            <div className={classes.mainbox}>
                <div className={classes.question}>How to create singleton
                object, which could be used both as type and value (similar to 
                None)?</div>
                <div className={classes.asker}>-by Mark Zuckerberg</div>
                <Button2 />
            </div>
            
        </div>
    );
}
