import { useContext } from "react";
import { ChatContext } from "../Contexts/ChatContext";

export const useChatContext = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw Error("useChatContext must be inside an ChatContextProvider");
    }
    return context;
};
