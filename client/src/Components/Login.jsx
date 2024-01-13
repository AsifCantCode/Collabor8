import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "../Hooks/useAuthContext";
import classes from "../Styles/LoginSignup.module.css";
import { Button, ButtonSpinner } from "./Buttons";

const Login = ({ setLoginSignup }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuthContext();

    // useEffect(() => {
    //   toast.onChange((payload) => {
    //     if (payload.status === "removed") {
    //       navigate("/");
    //     }
    //   });
    // }, [navigate]);
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(false);
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        try {
            const response = await login(email, password);

            toast.success("Login Successful !! Navigating to home page...");
            console.log("LOGIN Response Data : ", response.data);

            setTimeout(() => {
                setLoading(false);
                navigate("/");
            }, 1500);
        } catch (err) {
            console.log("LOGIN ERROR: ", err);
            setLoading(false);
            setError(err.response.data.error);
        }
    };
    return (
        <>
            <form
                className={`${classes["login-form"]}`}
                autoComplete="off"
                onSubmit={handleLogin}
            >
                <div className={`${classes["input-field"]}`}>
                    <input
                        type="email"
                        name="email"
                        id=""
                        autoComplete="off"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    />
                    <span className={password ? `${classes["valid"]}` : ""}>
                        Password
                    </span>
                </div>
                {error && (
                    <p style={{ color: "red", paddingBottom: "15px" }}>
                        {error}
                    </p>
                )}
                <div>
                    {loading ? (
                        <ButtonSpinner />
                    ) : (
                        <Button type="submit" text={`Login`} />
                    )}
                    {/* <ButtonSpinner text={"Loading"} /> */}
                </div>
                <div>
                    <p className={`${classes["switch-form"]}`}>
                        Don't have an account?{" "}
                        <span onClick={() => setLoginSignup("signup")}>
                            {" "}
                            Signup
                        </span>
                    </p>
                </div>
            </form>
        </>
    );
};

export default Login;
