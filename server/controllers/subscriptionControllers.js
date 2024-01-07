const moment = require("moment");

const jwt = require("jsonwebtoken");
const Question = require("../model/questionModel");
const Tag = require("../model/tagModel");
const User = require("../model/userModel");
const Collection = require("../model/collectionModel");

const subscribe = async (req, res) => {
    try {
        const { _id } = req.body.profile;
        const { plan } = req.query;
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (user.subscription.status) {
            return res.status(400).json({ error: "Already subscribed" });
        }
        const subscriptionDetails = {
            status: true,
            plan: plan,
            expire: calculateSubscriptionExpiration(plan),
        };
        user.subscription = subscriptionDetails;
        await user.save();

        console.log(user);
        return res.status(200).json({ message: "Subscription updated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

function calculateSubscriptionExpiration(plan) {
    const currentDate = new Date();
    plan = plan.toLowerCase();

    if (plan === "monthly") {
        // Add 1 month to the current date
        currentDate.setMonth(currentDate.getMonth() + 1);
    } else if (plan === "yearly") {
        // Add 1 year to the current date
        currentDate.setFullYear(currentDate.getFullYear() + 1);
    }
    return currentDate;
}

//Function to check expiration, can be invoked periodically
const checkSubscription = async (req, res) => {
    try {
        const {_id} = req.body.profile;

        // Check if the user exists
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if the subscription is active and has expired
        if (user.subscription && user.subscription.status) {
            const currentDate = new Date();
            const expirationDate = new Date(user.subscription.expire);

            if (currentDate > expirationDate) {
                // Subscription has expired, update all three parameters
                user.subscription.status = false;
                user.subscription.plan = null;
                user.subscription.expire = null;
                await user.save();

                return res.status(200).json({ message: "Subscription expired, status updated to false" });
            }
        }

        return res.status(200).json({ message: "Subscription is still active" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    subscribe,
    checkSubscription,
}