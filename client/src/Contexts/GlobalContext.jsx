import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

export const GlobalContextProvider = (props) => {
    const [rightSidebarState, setRightSidebarState] = useState(false);
    const value = {
        rightSidebarState,
        setRightSidebarState,
    };
    return (
        <GlobalContext.Provider value={value}>
            {props.children}
        </GlobalContext.Provider>
    );
};
