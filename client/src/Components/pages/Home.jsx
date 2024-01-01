import classes from "../../Styles/Home.module.css";
import Sidebar from "../Sidebar";

const Home = ({ sidebarState }) => {
    return (
        <div className={`${classes["Home"]}`}>
            <Sidebar sidebarState={sidebarState} />
            <div className={`${classes["Main"]}`}>Main</div>
        </div>
    );
};

export default Home;
