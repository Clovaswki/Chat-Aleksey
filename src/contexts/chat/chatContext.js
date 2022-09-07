import { createContext, useContext } from "react";

export const ChatContext = createContext({})

export const ContextChat = () => {
    var context = useContext(ChatContext)
    return context
}