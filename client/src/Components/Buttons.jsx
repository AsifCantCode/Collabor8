import { Link } from "react-router-dom";
import classes from "../styles/Buttons.module.css";

export function ButtonTransarent({ text, type = "button" }) {
    return (
        <button type={type} className={`${classes["ButtonTransarent"]}`}>
            <span>{text}</span>
        </button>
    );
}
export function LinkButtonTransarent({ text, to }) {
    return (
        <Link to={to} className={`${classes["ButtonTransarent"]}`}>
            <span>{text}</span>
        </Link>
    );
}

export function Button({ text, type = "button" }) {
    return (
        <button type={type} className={`${classes["Button"]}`}>
            <span>{text}</span>
        </button>
    );
}
export function ButtonWithIconOnly({ icon, type = "button" }) {
    return (
        <Link type={type} className={`${classes["ButtonWithIconOnly"]}`}>
            <span>{icon}</span>
        </Link>
    );
}
export function ButtonWithIconOnlyTransparent({ icon, type = "button", func }) {
    return (
        <Link
            onClick={func}
            type={type}
            className={`${classes["ButtonWithIconOnlyTransparent"]}`}
        >
            <span>{icon}</span>
        </Link>
    );
}
