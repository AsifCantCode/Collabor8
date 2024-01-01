import classes from "../Styles/LoginSignup.module.css";
import { Button } from "./Buttons";

const Signup = ({ setLoginSignup }) => {
    const handleSingup = (e) => {
        e.preventDefault();
        const fullname = e.target.fullname.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(fullname, email, password);
    };
    return (
        <form className={`${classes["signup-form"]}`} onSubmit={handleSingup}>
            <div>
                <input
                    type="text"
                    name="fullname"
                    id=""
                    placeholder="Full Name"
                />
            </div>
            <div>
                <input type="email" name="email" id="" placeholder="Email" />
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
