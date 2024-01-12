import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserApi from "../Apis/UserApi";
import { useAuthContext } from "../Hooks/useAuthContext";
import classes from "../Styles/LoginSignup.module.css";
import { Button } from "./Buttons";

const Signup = ({ setLoginSignup }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { setUser } = useAuthContext();

    const navigate = useNavigate();

    // useEffect(() => {
    //     toast.onChange((payload) => {
    //         if (payload.status === "removed") {
    //             navigate("/edit-profile");
    //         }
    //     });
    // }, [navigate]);

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(false);

        try {
            const response = await UserApi.post(
                "/signup",
                { fullname, email, password, confirmPassword },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            setLoading(false);
            localStorage.setItem("user", JSON.stringify(response.data.token));
            setUser(response.data.token);
            toast.success(
                "Signup Successful !! Navigating to edit profile page...",
                {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1500,
                }
            );
            console.log("Signup Response Data : ", response.data);
        } catch (err) {
            console.log("SIGNUP ERROR: ", err);
            setLoading(false);
            setError(err.response.data.error);
        }
    };
    return (
        <>
            <form
                className={`${classes["signup-form"]}`}
                onSubmit={handleSignup}
            >
                <div className={`${classes["input-field"]}`}>
                    <input
                        type="text"
                        name="fullname"
                        id=""
                        autoComplete="off"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        required
                    />
                    <span className={fullname ? `${classes["valid"]}` : ""}>
                        Full Name
                    </span>
                </div>
                <div className={`${classes["input-field"]}`}>
                    <input
                        type="email"
                        name="email"
                        id=""
                        autoComplete="off"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <span className={email ? `${classes["valid"]}` : ""}>
                        Email
                    </span>
                </div>

                <div className={`${classes["input-field"]}`}>
                    <input
                        type="password"
                        name="password"
                        id=""
                        autoComplete="off"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <span className={password ? `${classes["valid"]}` : ""}>
                        Password
                    </span>
                </div>
                <div className={`${classes["input-field"]}`}>
                    <input
                        type="password"
                        name="confirmPassword"
                        id=""
                        autoComplete="off"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <span className={password ? `${classes["valid"]}` : ""}>
                        Confirm Password
                    </span>
                </div>
                {error && (
                    <p style={{ color: "red", paddingBottom: "15px" }}>
                        {error}
                    </p>
                )}
                <div>
                    <Button type="submit" text={`Signup`} />
                </div>
                <div>
                    <p className={`${classes["switch-form"]}`}>
                        Already have an account?{" "}
                        <span onClick={() => setLoginSignup("login")}>
                            {" "}
                            Login
                        </span>
                    </p>
                </div>
            </form>
            <ToastContainer position="top-right" />
        </>
    );
};

export default Signup;
