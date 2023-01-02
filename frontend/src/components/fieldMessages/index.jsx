import React, { useEffect, useRef, useState } from "react";

//styles
import './styles.css'

//components
import TopBarMessages from '../topBarMessages';
import Message from "../message";
import ModalMessage from "../modalMessage";

//contexts
    //auth context
    import ContextAuth from '../../contexts/provider/auth'
    //chat context
    import { ContextChat } from "../../contexts/chat/chatContext";
//Api rest
import Api from "../../services/api";

//error handling
import { errorHandling } from "../../helpers/errorHandling";
import CardEmojis from "../cardEmojis/cardEmojis";

//manager functions backgrounds
import { getBackground } from "../../helpers/backgrounds";
import ChooseBackground from "../chooseBackground";

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
        writing,
        setMessageError,
        modalChangeBackground,
        urlBackground,
        badgeNewMessages
    } = ContextChat()//states of chat context
    const currentUser = ContextAuth() //data of user authenticated
    const [modalDeleteMessage, setModalDeleteMessage] = useState({
        state: false,
        messageId: '',
        userId: ''
    })

    //get choice of background on the local storage
    const [choosedBackground, setChoosedBackground] = useState(getBackground())

    //active card emojis
    const [cardEmojis, setCardEmojis] = useState(false)
    const [messageWithEmoji, setMessageWithEmoji] = useState('')
    
    //get new message of websocket server
    useEffect(() => {
        arrivalMessage && 
            currentChat?.members.includes(arrivalMessage.sender) &&
                setMessages([...messages, arrivalMessage])
        
    }, [arrivalMessage, currentChat])

    //get all messages of conversation
    useEffect(() => {
        async function getMessages(){
            try{
                var response = await Api.get(`/chat/get-messages?conversationId=${currentChat._id}&userId=${currentUser.id}`)
                setMessages(response.data)
                setNewMessage('')
            }catch(error){
                errorHandling(error, 'fieldMessages')
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
        event && event.preventDefault()

        const newMsg = {
            conversationId: currentChat._id,
            sender: currentUser.id,
            text: newMessage
        }
        
        try{
            if(newMessage){

                var res = await Api.post('/chat/new-message', newMsg) 

                setMessages([...messages, {
                    _id: res.data._id,
                    conversationId: currentChat._id,
                    sender: currentUser.id,
                    text: newMessage
                }])
                
                //send new message to badge of conversation
                await Api.get(`/chat/send-newMsg?conversationId=${currentChat._id}&userId=${currentUser.id}`)

                var friendId = currentChat.members.find( m => m !== currentUser.id)
                
                //send message to websocket server
                socket.current.emit('newMessage', {
                    _id: res.data._id,
                    senderId: currentUser.id,
                    receivedId: friendId,
                    text: newMessage
                })
                
                var receivedId = currentChat.members.find( id => id !== currentUser.id )
                
                //send notification of new message to websocket server
                socket.current.emit('newNotificationMsg', {
                    conversationId: currentChat?._id,
                    senderId: currentUser.id,
                    receivedId
                })
                
            }
            setNewMessage('')
        }catch(error){
            errorHandling(error, 'fieldMessages')
        }
    }

    //function delete message
    async function deleteMessage(messageId, userId){
        try {   
            var filterMessages = messages.filter( msg => msg._id !== messageId)
            
            setModalDeleteMessage({
                state: false,
                messageId: '',
                userId: ''
            })

            await Api.get(`/chat/delete-messages?messageId=${messageId}&userId=${userId}`)

            setMessages([...filterMessages])
        } catch (error) {
            if(error.response.status === 500) {
                setMessageError(error.response.data.error)
                setTimeout(() => setMessageError(''), 5000)
            }
        }
    }

    //scroll smooth
    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: 'smooth'}) 
    }, [messages])


    //add emoji at message
    useEffect(() => {
        setNewMessage(newMessage+messageWithEmoji)
        setMessageWithEmoji('')
    }, [messageWithEmoji])

    //add new background 
    useEffect(() => {
        setChoosedBackground(urlBackground || getBackground())
    }, [urlBackground])

    return (
        <>
        {
            modalDeleteMessage.state && 
            <ModalMessage 
                messageId={modalDeleteMessage.messageId}
                userId={modalDeleteMessage.userId}
                deleteMessage={deleteMessage}
                setModalDeleteMessage={setModalDeleteMessage}
            />
        }
        {
            modalChangeBackground && <ChooseBackground/>
        }
        <div className="FieldMsg">
            <TopBarMessages user={user} writing={writing}/>
            <div className="cardMessages" style={{ backgroundImage: choosedBackground}}>
                {
                    messages.map( (msg, index) => (
                        <div key={index} ref={scrollRef}>
                            <Message 
                                sender={msg.sender === currentUser.id} 
                                message={msg} 
                                setModalDeleteMessage={setModalDeleteMessage}
                            />
                        </div>
                    ))
                }
            </div>

            <CardEmojis 
                setCardEmojis={setCardEmojis} 
                cardEmojis={cardEmojis}
                setMessageWithEmoji={setMessageWithEmoji}
            />

            <div className="input">
                <form onSubmit={event => [handleSubmit(event), handleStateOfWrite(false), setCardEmojis(false)]}>
                    <input 
                        type="text" 
                        placeholder="Escreva uma mensagem" 
                        onChange={event => setNewMessage(event.target.value)}  
                        value={newMessage}
                        onFocus={() => handleStateOfWrite(true)}
                        onBlur={() => handleStateOfWrite(false)}
                        onKeyDown={() => handleStateOfWrite(true)}
                    />
                    <div className="btnsFieldMessages">
                        <a className="btnEmojis" onClick={() => setCardEmojis(cardEmojis ? false : true)}>
                            <img src="/img/emoji.png" alt="emoji" />
                        </a>
                        <a type="submit" onClick={() => [
                            handleSubmit(), 
                            handleStateOfWrite(false), 
                            setCardEmojis(false)]}
                        >
                            <img src="/img/send.png" alt="sendIcon"/>
                        </a>
                    </div>
                </form>
            </div>
        </div>
        </>
    )

}

export default FieldMessages