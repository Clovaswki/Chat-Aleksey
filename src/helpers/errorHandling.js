import { ContextChat } from "../contexts/chat/chatContext"

//errors of requests http
export function errorHandling(error, componentName){

    const { setMessageError } = ContextChat()

    //debugging
    console.error("|||||||||||||||||||"+componentName+"|||||||||||||||||||")

    new Error(error)

    //handling
    if (error.response.status === 500) {
        setMessageError('Erro interno!')
        setTimeout(() => setMessageError(''), 5000)
    } else if (error.response.status === 401) {
        setMessageError('Sua sessão expirou!')
        setTimeout(() => document.location.reload(), 1000)//refresh
    }

}