import { Link } from "react-router-dom";
import classes from "../../Styles/Subscription.module.css";
import { SmallButton, SmallButtonLite } from "../Buttons";
// Icons
import { FaLongArrowAltLeft } from "react-icons/fa";
const Subscription = () => {
    return (
        <div className={`${classes["Subscription"]}`}>
            <div
                className={`${classes["page-header"]} global-single-page-header`}
            >
                <Link to={`/`}>
                    <FaLongArrowAltLeft />
                    Go to Home
                </Link>
            </div>

            <div className={`${classes["subscription-area"]}`}>
                <div className={`${classes["personal-subscription-info"]}`}>
                    <h2>You have no subscription</h2>
                    <p>
                        Last Plan Expired On: <span>12 February, 2024</span>
                    </p>
                </div>
                <div className={`${classes["subscription-plan"]}`}>
                    <h3>Subcription Plans</h3>
                    <div className={`${classes["plan-cards"]}`}>
                        <div className={`${classes["card"]}`}>
                            <h2>Monthly</h2>
                            <p>Price: $10</p>
                            <p>Duration: 1 Month</p>
                            <p>Features: 1</p>
                            <SmallButtonLite text="Buy Now" />
                        </div>
                        <div className={`${classes["card"]}`}>
                            <h2>Yearly</h2>
                            <p>Price: $100</p>
                            <p>Duration: 12 Month</p>
                            <p>Features: 1</p>
                            <SmallButtonLite text="Buy Now" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Subscription;
