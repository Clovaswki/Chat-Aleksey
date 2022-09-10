import React, { useEffect, useState, useRef} from "react";
import { io } from 'socket.io-client'

//styles
import './styles.css'

//components 
import TopBar from "../../components/topBarChat";
import SearchTopBar from "../../components/searchTopBar";
import Conversation from "../../components/conversation";
import FriendOnline from "../../components/friendOnline";
import FieldMessages from "../../components/fieldMessages"; //field of messages
import WelcomeChat from "../../components/welcomeChat";
import CardAddFriends from "../../components/cardAddFriends";
import CardProfile from "../../components/cardProfile";
import ErrorMessage from "../../components/errorMessage";
import LoadChat from "../../components/cardLoadChat";
import ButtonAddFriendsInConversations from "../../components/buttonAddFriendsInConversations";
import ModalAddDescription from "../../components/modalAddDescription";

//contexts
    //auth context
    import ContextAuth from "../../contexts/provider/auth";
    //chat context
    import { ChatContext } from '../../contexts/chat/chatContext';
//Api rest
import Api from "../../services/api";

const Chat = () => {

    const currentUser = ContextAuth() //data of user authenticated on the context provider
    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [friendsOnline, setFriendsOnline] = useState([]) //friend connected on the websocket server
    const [activeCardSearchFriends, setActiveCardSearchFriends] = useState(false) //render friends search card
    const [activeCardChangeProfile, setActiveChangeProfile] = useState(false)//render profile change card
    const [modeEditProfile, setModeEditProfile] = useState(false)//mode of edition on the interface of profile user
    const [messageError, setMessageError] = useState('')//error message
    const [noResults, setNoResults] = useState('')//no results for search
    const [allUsers, setAllUsers] = useState([])//all users of database
    const [writing, setWriting] = useState({})//set writing on the input
    const socket = useRef()
    const [cardFriendsMaxWidth, setCardFriendsMaxWidth] = useState(false)//component of friends online dynamic
    const [loadChat, setLoadChat] = useState(true)//component load chat
    const [activeCardAddDescription, setActiveCardAddDescription] = useState(false)//add description of profile
    const [arrivalMessage, setArrivalMessage] = useState({
        sender: '',
        text: '',
        createdAt: ''
    })// new message that arrived

    //check if a profile description exists
    useEffect(() => {
        !currentUser.description && setActiveCardAddDescription(true)
    }, [])

    useEffect(() => {
        //connection with websocket server
        //socket.current = io('ws://localhost:3002')
        socket.current = io('https://server-socket-chat-aleksey.herokuapp.com')//heroku
        
        currentUser.setSocket(socket.current) //add websocket server instance on the auth context
        
        //get new message of a user
        socket.current.on('getMessage', data => {
            
            if(data.receivedId === currentUser.id){
                delete data.receivedId
                setArrivalMessage(data)
            }
            
        })
        //
        
        //get state of writing of friend
        socket.current.on('getUserWriting', ({state, senderId, receivedId}) => {
            
            receivedId === currentUser.id && setWriting({state, senderId})
            
        })
        //
        
    }, [])
    
    useEffect(() => {
        //send user to websocket server 
        socket.current.emit('addUser', {userId: currentUser.id, userName: currentUser.name})
        
        //received users connected on the websocket server
        socket.current.on('getUsers', users => {
            let filteredFriends = []
            
            filteredFriends = [...users.filter( user => user.userId !== currentUser.id && user.userId && user.userId !== null)]
            
            setFriendsOnline([...filteredFriends])
        })
        //test
        
        //test
    }, [currentUser, socket])
    
    //set hide chat loader
    useEffect(() => {

        if((conversations.length > 0 || conversations[0] == null) && allUsers.length > 0){
            setLoadChat(false)
        }
        
    }, [conversations, allUsers])
    
    useEffect(() => {
        //get conversations of user
        async function getConversations(){
            try{
                var response = await Api.get(`/chat/get-conversations/${currentUser.id}`)
                
                response.data.length > 0
                ? setConversations([...response.data])
                : setConversations(['none'])
                
            }catch(error){
                if(error.response.status === 401){
                    setMessageError('Sua sessão expirou!')
                    setTimeout(() => document.location.reload(), 1000)//refresh
                }
                console.error(error)
            }
        }

        //get all users of chat app
        async function getAllUsers(){
            try{
                var response = await Api.get('/user/get-users')
                setAllUsers([...response.data])
            }catch(error){
                if(error.response.status === 401){
                    setMessageError('Sua sessão expirou!')
                    setTimeout(() => document.location.reload(), 1000)//refresh
                }
                new Error(error)
            }
        }
        getConversations()
        getAllUsers()
    }, [currentUser])

    const componentText_friendsOnline = (
        <div className="content p-3 showText">
            <p>Amigos Online</p>
        </div>
    )

    return(
        <ChatContext.Provider value={{
            setActiveChangeProfile,
            setActiveCardSearchFriends,
            setConversations,
            conversations,
            setMessageError,
            messageError,
            currentChat,
            arrivalMessage,
            socket,
            setAllUsers,
            allUsers,
            setWriting,
            writing,
            setModeEditProfile,
            modeEditProfile,
            setNoResults,
            cardFriendsMaxWidth,
            setActiveCardAddDescription
        }}>
            {
                loadChat ?
                    <LoadChat/>
                :
                <>
                {
                    messageError && <ErrorMessage/>
                }
                {
                    activeCardSearchFriends && <CardAddFriends/>
                }
                {   
                    activeCardChangeProfile && <CardProfile/>   
                }
                {
                    activeCardAddDescription && <ModalAddDescription/>
                }
                <div className="Chat">
                    <div className="Conversations">
                        <TopBar/>
                        <SearchTopBar/>
                        <ul className="Contacts">
                            {
                                noResults && 
                                <div className='cardNoResultsChat'>
                                    <div>
                                        <img src="/img/userNotFound.png" alt="noResults"/>
                                        <p>Nenhum usuário encontrado</p>
                                    </div>
                                </div>
                            }
                            {
                                conversations.includes('none')  ?
                                
                                <ButtonAddFriendsInConversations/>
                                
                                :
                                
                                conversations.map( (conv, index) => (
                                    <div key={index} onClick={() => setCurrentChat(conv)} style={{height: '60px'}} className='mt-3'>
                                        <Conversation conv={conv} currentUser={currentUser} />
                                    </div>
                                ))
                            }
                        </ul>
                    </div>
                    {
                        currentChat
                        ? <FieldMessages/> 
                        : <WelcomeChat/>
                    }
                    <div className={"FriendsOnline " + (cardFriendsMaxWidth ? "maxWidth" : "minWidth")}>
                        <div className="topBarOnline">
                            <div className="divIconBack">
                                <img className="iconBack" src="/img/iconBack.png" alt="back" onClick={() => setCardFriendsMaxWidth(cardFriendsMaxWidth ? false : true)}/>
                            </div>
                            {
                                cardFriendsMaxWidth && componentText_friendsOnline
                            }
                        </div>
                        <ul>
                            {
                                friendsOnline.map( (friend, index) => (
                                    <FriendOnline key={index} friend={friend}/>
                                )) 
                            }
                        </ul>
                    </div>
                </div>
                </>
            }
        </ChatContext.Provider>
    )

}

export default Chat