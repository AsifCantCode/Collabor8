import { createContext, useEffect, useState } from "react";
import { useAuthContext } from "../Hooks/useAuthContext";
import UserApi from "../Apis/UserApi";

export const GlobalContext = createContext();

export const GlobalContextProvider = (props) => {
    const [rightSidebarState, setRightSidebarState] = useState(false);

    const { user, newUser, setNewUser } = useAuthContext();

    useEffect(() => {
        const checkSubscription = async () => {
            try {
                if (newUser) {
                    const response = await UserApi.put("/check-for-subscribe", {
                        headers: {
                            Authorization: `Bearer ${user}`,
                            "Content-Type": "application/json",
                        },
                    });
                    if (!response.data.status) {
                        const temp = newUser;
                        temp.subscription.status = false;
                        temp.subscription.plan = null;
                        temp.subscription.expire = null;
                        setNewUser(temp);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };
        checkSubscription();
    }, [newUser, user, setNewUser]);

    // Restrictions
    const badgeCheck = {
        newbie: {
            imageLimit: 2,
            tagCreate: false,
            instructor: false,
            messageService: false,
        },
        intermediate: {
            imageLimit: 3,
            tagCreate: false,
            instructor: false,
            messageService: false,
        },
        expert: {
            imageLimit: 5,
            tagCreate: true,
            instructor: false,
            messageService: false,
        },
        master: {
            imageLimit: 10,
            tagCreate: true,
            instructor: true,
            messageService: false,
        },
        legend: {
            imageLimit: 20,
            tagCreate: true,
            instructor: true,
            messageService: true,
        },
    };

    const value = {
        rightSidebarState,
        setRightSidebarState,
        badgeCheck,
    };
    return (
        <GlobalContext.Provider value={value}>
            {props.children}
        </GlobalContext.Provider>
    );
};
