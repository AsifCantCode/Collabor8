import { Button } from "./Buttons";
import classes from "../Styles/LoginSignup.module.css";
import { useState } from "react";

const Login = ({ setLoginSignup }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
    };
    return (
        <form
            className={`${classes["login-form"]}`}
            autoComplete="off"
            onSubmit={handleLogin}
        >
            <div className={`${classes["input-field"]}`}>
                <input
                    type="text"
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
            <div>
                <Button type="submit" text={`Login`} />
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
    );
};

export default Login;
