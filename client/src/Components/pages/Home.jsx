import classes from "../../Styles/Home.module.css";
import Sidebar from "../Sidebar";

const Home = (props) => {
    const { sidebarState, children } = props;
    console.log("props", props);
    return (
        <div className={`${classes["Home"]}`}>
            <Sidebar sidebarState={sidebarState} />
            <div className={`${classes["Main"]}`}>{children}</div>
        </div>
    );
};

export default Home;
