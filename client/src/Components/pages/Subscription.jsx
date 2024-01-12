import { Link } from "react-router-dom";
import classes from "../../Styles/Subscription.module.css";
import { SmallButton, SmallButtonLite, SmallButtonLiteAc } from "../Buttons";
// Icons
import { FaLongArrowAltLeft } from "react-icons/fa";
import UserApi from "../../Apis/UserApi";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { useEffect, useState } from "react";
import { formatDateAndTimeFromString } from "../../Utilities/utilities";
const Subscription = () => {
    const { user, newUser } = useAuthContext();
    const [subscription, setSubscription] = useState(null);
    useEffect(() => {
        console.log("New User: ", newUser);
        if (newUser) {
            setSubscription(newUser?.subscription);
        }
    }, [newUser]);
    const handleSubscription = async (plan) => {
        try {
            // Call API to subscribe
            const response = await UserApi.post(
                "/subscribe",
                {
                    plan,
                },
                {
                    headers: {
                        Authorization: `Bearer ${user}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("Response: ", response.data);
        } catch (error) {
            console.log(error);
        }
    };
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
                    <h2>
                        You have {subscription ? subscription?.plan : "no"}{" "}
                        subscription
                    </h2>
                    {subscription && (
                        <p>
                            Expire date:{" "}
                            <span>
                                {formatDateAndTimeFromString(
                                    subscription?.expire
                                )}
                            </span>
                        </p>
                    )}
                </div>
                {!subscription && (
                    <div className={`${classes["subscription-plan"]}`}>
                        <h3>Subcription Plans</h3>
                        <div className={`${classes["plan-cards"]}`}>
                            <div className={`${classes["card"]}`}>
                                <h2>Monthly</h2>
                                <p>Price: $10</p>
                                <p>Duration: 1 Month</p>
                                <p>Features: 1</p>
                                <SmallButtonLiteAc
                                    func={() => handleSubscription("monthly")}
                                    text="Buy Now"
                                />
                            </div>
                            <div className={`${classes["card"]}`}>
                                <h2>Yearly</h2>
                                <p>Price: $100</p>
                                <p>Duration: 12 Month</p>
                                <p>Features: 1</p>
                                <SmallButtonLiteAc
                                    func={() => handleSubscription("yearly")}
                                    text="Buy Now"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Subscription;
