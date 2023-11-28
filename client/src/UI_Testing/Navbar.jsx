import classes from "./Navbar.module.css";
import react_logo from "../assets/react.svg";
export default function Navbar() {
    return (
        <div className={`${classes["navbar"]}`}>
            <button className={`${classes[""]}`}>Click Here</button>
            <img src={react_logo} alt="" />
        </div>
    );
}
