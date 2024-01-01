import { useState } from "react";
import classes from "../../Styles/LoginSignup.module.css";
import { Button } from "../Buttons";
import Login from "../Login";
import Signup from "../Signup";

const LoginSignup = () => {
    const [loginSignup, setLoginSignup] = useState("login");
    return (
        <div className={`${classes["LoginSignup"]}`}>
            {loginSignup === "login" && (
                <div className={`${classes["loginArea"]}`}>
                    <h3>Login</h3>
                    <Login setLoginSignup={setLoginSignup} />
                </div>
            )}
            {loginSignup === "signup" && (
                <div className={`${classes["signupArea"]}`}>
                    <h3>Signup</h3>
                    <Signup setLoginSignup={setLoginSignup} />
                </div>
            )}
        </div>
    );
};

export default LoginSignup;
