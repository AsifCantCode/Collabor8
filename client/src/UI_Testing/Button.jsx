import React from "react";
import classes from "./Button.module.css";

export default function Button() {
    return (
        <button className={`${classes["Button"]}`}>
            <span>Button 1</span>
        </button>
    );
}
