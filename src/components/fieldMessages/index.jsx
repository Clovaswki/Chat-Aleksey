import React, { useEffect, useRef, useState } from "react";

//styles
import './styles.css'

//components
import TopBarMessages from '../topBarMessages';
import Message from "../message";

//contexts
    //auth context
    import ContextAuth from '../../contexts/provider/auth'
    //chat context
    import { ContextChat } from "../../contexts/chat/chatContext";
//Api rest
import Api from "../../services/api";

const FieldMessages = () => {

    const [messages, setMessages] = useState([]) //messages of conversation
    const [user, setUser] = useState({})
    const [newMessage, setNewMessage] = useState('')//new input
    const scrollRef = useRef()
    const { 
        currentChat, 
        arrivalMessage, 
        socket, 
        allUsers, 
        setAllUsers,
        writing 
    } = ContextChat()//states of chat context
    const currentUser = ContextAuth() //data of user authenticated
    
    //get new message of websocket server
    useEffect(() => {
        //entender essa lógica
        arrivalMessage && 
            currentChat?.members.includes(arrivalMessage.sender) &&
                setMessages([...messages, arrivalMessage])
        
    }, [arrivalMessage, currentChat])

    //get all messages of conversation
    useEffect(() => {
        async function getMessages(){
            try{
                var response = await Api.get('/chat/get-messages/'+currentChat._id)
                setMessages(response.data)
                setNewMessage('')
            }catch(error){
                console.log(error)
            }
        }
        getMessages()
    }, [currentChat])

    //get user to topBar of conversation
    useEffect(() => {
        var friendId = currentChat.members.find( m => m !== currentUser.id)
        async function getUser(){
            var user = allUsers.filter( user => user._id === friendId)
            
            if(user.length > 0){
                setUser(...user)
            }else{
                var response = await Api.get('/user/get-users?id='+friendId)
                setUser(response.data)
                setAllUsers([...allUsers, response.data])//set all users on the chat context
            }
        }
        getUser()
    }, [currentChat, allUsers])
    
    //function set state user writing
    const handleStateOfWrite = (bool) => {
        
        var stateWriting = bool
        
        var friendId = currentChat.members.find( m => m !== currentUser.id)
        
        socket.current.emit('userWriting', {
            senderId: currentUser.id,
            receivedId: friendId,
            state: stateWriting
        })
        
    }

    //post of new message
    const handleSubmit = async (event) => {
        event.preventDefault()
        
        const newMsg = {
            conversationId: currentChat._id,
            sender: currentUser.id,
            text: newMessage
        }
        
        try{
            if(newMessage){
                setMessages([...messages, newMsg])
                await Api.post('/chat/new-message', newMsg) 
                
                var friendId = currentChat.members.find( m => m !== currentUser.id)
                
                //send message to server websocket
                socket.current.emit('newMessage', {
                    senderId: currentUser.id,
                    receivedId: friendId,
                    text: newMessage
                })
                
            }
            setNewMessage('')
        }catch(error){
            console.log(error)
        }
    }

    //scroll smooth
    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: 'smooth'}) 
    }, [messages])

    return (
        <div className="FieldMsg">
            <TopBarMessages user={user} writing={writing}/>
            <div className="cardMessages" style={{ backgroundImage: 'url(/img/background1.png)' }}>
                {
                    messages.map( (msg, index) => (
                        <div key={index} ref={scrollRef}>
                            <Message sender={msg.sender === currentUser.id} message={msg}/>
                        </div>
                    ))
                }
            </div>
            <div className="input">
                <form onSubmit={event => [handleSubmit(event), handleStateOfWrite(false)]}>
                    <input 
                        type="text" 
                        placeholder="Escreva uma mensagem" 
                        onChange={event => setNewMessage(event.target.value)}  
                        value={newMessage}
                        onFocus={() => handleStateOfWrite(true)}
                        onBlur={() => handleStateOfWrite(false)}
                        onKeyDown={() => handleStateOfWrite(true)}
                    />
                    <a type="submit" onClick={() => [handleSubmit(), handleStateOfWrite(false)]}><img src="/img/send.png" alt="sendIcon"/></a>
                </form>
            </div>
        </div>
    )

}

export default FieldMessages