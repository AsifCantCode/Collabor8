import classes from "../../Styles/Home.module.css";
import Sidebar from "../Sidebar";

const Home = () => {
    return (
        <div className={`${classes["Home"]}`}>
            <Sidebar />
            <div className={`${classes["Main"]}`}>Main</div>
        </div>
    );
};

export default Home;
