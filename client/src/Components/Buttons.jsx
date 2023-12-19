import classes from "../styles/Buttons.module.css";

export function ButtonTransarent({ text }) {
    return (
        <button className={`${classes["ButtonTransarent"]}`}>
            <span>{text}</span>
        </button>
    );
}

export function Button() {
    return (
        <button className={`${classes["Button"]}`}>
            <span>Button 2</span>
        </button>
    );
}
