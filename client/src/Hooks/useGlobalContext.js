import { useContext } from "react";
import { GlobalContext } from "../Contexts/GlobalContext";

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw Error("useAuthContext must be inside an AuthContextProvider");
    }
    return context;
};
