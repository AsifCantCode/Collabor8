import { useState } from "react";
import classes from "../../Styles/LoginSignup.module.css";
import { Button } from "../Buttons";
import Login from "../Login";
import Signup from "../Signup";
import { Link } from "react-router-dom";
// Icons
import { FaLongArrowAltLeft } from "react-icons/fa";
import { ToastContainer } from "react-toastify";

// Todo : Validation for Login and Signup must be added.
const LoginSignup = () => {
    const [loginSignup, setLoginSignup] = useState("login");
    return (
        <>
            <div className={`${classes["LoginSignup"]}`}>
                {loginSignup === "login" && (
                    <div className={`${classes["loginArea"]}`}>
                        <Link to={`/`}>
                            <FaLongArrowAltLeft /> Back to Home
                        </Link>
                        <Login setLoginSignup={setLoginSignup} />
                    </div>
                )}
                {loginSignup === "signup" && (
                    <div className={`${classes["signupArea"]}`}>
                        <Link to={`/`}>
                            <FaLongArrowAltLeft /> Back to Home
                        </Link>
                        <Signup setLoginSignup={setLoginSignup} />
                    </div>
                )}
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    );
};

export default LoginSignup;
