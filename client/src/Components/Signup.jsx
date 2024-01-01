import { useState } from "react";
import classes from "../Styles/LoginSignup.module.css";
import { Button } from "./Buttons";

const Signup = ({ setLoginSignup }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const handleSingup = (e) => {
        e.preventDefault();
        const fullname = e.target.fullname.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(fullname, email, password);
    };
    return (
        <form className={`${classes["signup-form"]}`} onSubmit={handleSingup}>
            <div className={`${classes["input-field"]}`}>
                <input
                    type="text"
                    name="fullname"
                    id=""
                    autoComplete="off"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
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
                <Button type="submit" text={`Signup`} />
            </div>
            <div>
                <p className={`${classes["switch-form"]}`}>
                    Already have an account?{" "}
                    <span onClick={() => setLoginSignup("login")}> Login</span>
                </p>
            </div>
        </form>
    );
};

export default Signup;
