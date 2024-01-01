import { Button } from "./Buttons";
import classes from "../Styles/LoginSignup.module.css";

const Login = ({ setLoginSignup }) => {
    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
    };
    return (
        <form className={`${classes["login-form"]}`} onSubmit={handleLogin}>
            <div>
                <input type="text" name="email" id="" placeholder="Email" />
            </div>

            <div>
                <input
                    type="password"
                    name="password"
                    id=""
                    placeholder="password"
                />
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
