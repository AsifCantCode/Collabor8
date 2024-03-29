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

export function Button({ text, type = "button", func }) {
    return (
        <button onClick={func} type={type} className={`${classes["Button"]}`}>
            <span>{text}</span>
        </button>
    );
}
export function SmallButton({ text, to }) {
    return (
        <Link to={to} className={`${classes["SmallButton"]}`}>
            <span>{text}</span>
        </Link>
    );
}
export function SmallButtonLite({ text, to }) {
    return (
        <Link to={to} className={`${classes["SmallButtonLite"]}`}>
            <span>{text}</span>
        </Link>
    );
}
export function SmallButtonAc({ text, func, icon }) {
    return (
        <button onClick={func} className={`${classes["SmallButton"]}`}>
            <span>
                {text} {icon}
            </span>
        </button>
    );
}
export function SmallButtonLiteAc({ text, func }) {
    return (
        <button onClick={func} className={`${classes["SmallButtonLite"]}`}>
            <span>{text}</span>
        </button>
    );
}
export function SmallButtonDeepAc({ text, func }) {
    return (
        <button onClick={func} className={`${classes["SmallButtonDeep"]}`}>
            <span>{text}</span>
        </button>
    );
}
export function LinkButton({ text, to }) {
    return (
        <Link to={to} className={`${classes["Button"]}`}>
            <span>{text}</span>
        </Link>
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

export function ButtonSpinner({ text, func }) {
    return (
        <button onClick={func} className={`${classes["ButtonSpinner"]}`}>
            {/* <span className={`${classes["text-content"]}`}>{text}</span> */}
            <span className={`${classes["spninner"]}`}></span>
        </button>
    );
}
