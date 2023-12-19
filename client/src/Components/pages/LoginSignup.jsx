import classes from "../../Styles/LoginSignup.module.css";
import { Button } from "../Buttons";

const LoginSignup = () => {
    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
    };

    const handleSingup = (e) => {
        e.preventDefault();
        const fullname = e.target.fullname.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(fullname, email, password);
    };
    return (
        <div className={`${classes["LoginSignup"]}`}>
            <div className={`${classes["loginArea"]}`}>
                <h3>Login</h3>
                <form
                    className={`${classes["login-form"]}`}
                    onSubmit={handleLogin}
                >
                    <div>
                        <input
                            type="text"
                            name="email"
                            id=""
                            placeholder="Email"
                        />
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
                </form>
            </div>
            <div className={`${classes["signupArea"]}`}>
                <h3>Signup</h3>
                <form
                    className={`${classes["signup-form"]}`}
                    onSubmit={handleSingup}
                >
                    <div>
                        <input
                            type="text"
                            name="fullname"
                            id=""
                            placeholder="Full Name"
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            name="email"
                            id=""
                            placeholder="Email"
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            name="password"
                            id=""
                            placeholder="Password"
                        />
                    </div>
                    <div>
                        <Button type="submit" text={`Signup`} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginSignup;
