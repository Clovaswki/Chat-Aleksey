import React, { useEffect, useState, useRef } from "react";
import { io } from 'socket.io-client'

//styles
import './styles.css'

//components 
import CardAddFriends from "../../components/cardAddFriends";
import CardProfile from "../../components/cardProfile";
import ErrorMessage from "../../components/errorMessage";
import LoadChat from "../../components/cardLoadChat";
import ModalAddDescription from "../../components/modalAddDescription";
import ButtonShowFeedback from "../../components/cardFeedback/buttonShowFeedback";
import ScreenBlocked from '../../components/screenBlocked'
import CardFeedback from "../../components/cardFeedback";
import ChatMobileLayout from "../../components/resposiveLayout/chatMobileLayout/chatMobileLayout";
import ChatDesktopLayout from "../../components/resposiveLayout/chatDesktopLayout/chatDesktopLayout";

//helpers
import { errorHandling } from "../../helpers/errorHandling";

//contexts
//auth context
import ContextAuth from "../../contexts/provider/auth";
//chat context
import { ChatContext } from '../../contexts/chat/chatContext';
//router context
import { ContextRouter } from "../../contexts/router/routerContext";
//Api rest
import Api from "../../services/api";

//manager backgrounds of fields messages
import { getBackground } from "../../helpers/backgrounds";

//change title of document html
import { changeTitle } from '../../helpers/changeTitle'

const Chat = () => {

    const currentUser = ContextAuth() //data of user authenticated on the context provider
    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [friendsOnline, setFriendsOnline] = useState([]) //friend connected on the websocket server
    const [modeEditProfile, setModeEditProfile] = useState(false)//mode of edition on the interface of profile user
    const [messageError, setMessageError] = useState('')//error message
    const [noResults, setNoResults] = useState('')//no results for search
    const [allUsers, setAllUsers] = useState([])//all users of database
    const [writing, setWriting] = useState({})//set writing on the input
    const socket = useRef()
    const [loadChat, setLoadChat] = useState(true)//component load chat
    const [cardFriendsMaxWidth, setCardFriendsMaxWidth] = useState(false)//component of friends online dynamic
    const [activeCardChangeProfile, setActiveChangeProfile] = useState(false)//render profile change card
    const [activeCardSearchFriends, setActiveCardSearchFriends] = useState(false) //render friends search card
    const [activeCardAddDescription, setActiveCardAddDescription] = useState(false)//add description of profile
    const [cardShowFriendProfile, setCardShowFriendProfile] = useState(null)//component that shows friend information
    const [cardFeedback, setCardFeedback] = useState(false)//render feedback card
    const [arrivalMessage, setArrivalMessage] = useState({
        sender: '',
        text: '',
        createdAt: ''
    })// new message that arrived

    //check if mobile layout
    const [mobileLayout, setMobileLayout] = useState(false)

    //chat blocked
    const [componentBlocked, setComponentBlocked] = useState(false)

    //modal change background
    const [modalChangeBackground, setModalChangeBackground] = useState(false)

    //new background url
    const [urlBackground, setUrlBackground] = useState(getBackground())

    //all conversations of user in a immutable state
    //object: filters
    const [immutableConversations, setImmutableConversations] = useState([])

    //new messages to badge of conversations
    const [badgeNewMessages, setBadgeNewMessages] = useState([])

    const { errorRedirect } = ContextRouter()//state errors on the router

    //check if a profile description exists
    useEffect(() => {
        !currentUser.description && setActiveCardAddDescription(true)
    }, [])

    //disable component friend profile
    useEffect(() => setCardShowFriendProfile(null), [currentChat])

    useEffect(() => {
        //connection with websocket server
        socket.current = io(process.env.REACT_APP_WEBSOCKET_SERVER_URL)
        //socket.current = io('https://websocket-server-aleksey-production.up.railway.app')//railway

        currentUser.setSocket(socket.current) //add websocket server instance on the auth context

        //get new message of a user
        socket.current.on('getMessage', data => {

            if (data.receivedId === currentUser.id) {
                delete data.receivedId
                setArrivalMessage(data)
            }

        })
        //

        //get state of writing of friend
        socket.current.on('getUserWriting', ({ state, senderId, receivedId }) => {

            receivedId === currentUser.id && setWriting({ state, senderId })

        })
        //

    }, [])

    useEffect(() => {
        //send user to websocket server 
        socket.current.emit('addUser', { userId: currentUser.id, userName: currentUser.name })

        //received users connected on the websocket server
        socket.current.on('getUsers', users => {
            let filteredFriends = []

            filteredFriends = [...users.filter(user => user.userId !== currentUser.id && user.userId && user.userId !== null)]

            setFriendsOnline([...filteredFriends])
        })

        //received new notifications of messages
        socket.current.on('newNotification', data => {

            if (data.receivedId === currentUser.id) {
                var notifications = badgeNewMessages
                notifications.push(data)

                setBadgeNewMessages([...notifications])
            }

        })

    }, [currentUser, socket])

    useEffect(() => {
        //add notifications number on the title of html document
        changeTitle(badgeNewMessages, currentUser.id)
    }, [badgeNewMessages])

    //listening errors redirect on the router of application
    useEffect(() => {
        setMessageError(errorRedirect)
        setTimeout(() => setMessageError(''), 3000)
    }, [errorRedirect])

    //set hide chat loader
    useEffect(() => {

        if ((conversations.length > 0 || conversations[0] == null) && allUsers.length > 0) {
            setLoadChat(false)
        }

    }, [conversations, allUsers])

    useEffect(() => {
        //get conversations of user
        async function getConversations() {
            try {
                var response = await Api.get(`/chat/get-conversations/${currentUser.id}`, {
                    headers: {
                        reservetokenaccess: currentUser.token//same token//gambiarra
                    }
                })

                if (response.data.length > 0) {
                    setConversations([...response.data])
                    setImmutableConversations([...response.data])// set state immutable conversations
                } else {
                    setConversations(['none'])
                }

            } catch (error) {
                errorHandling(error, 'chat')
            }
        }

        //get all users of chat app
        async function getAllUsers() {
            try {
                var response = await Api.get('/user/get-users', {
                    headers: {
                        reservetokenaccess: currentUser.token//same token//gambiarra
                    }
                })
                setAllUsers([...response.data])
            } catch (error) {
                errorHandling(error, 'chat')
            }
        }
        getConversations()
        getAllUsers()
    }, [currentUser])

    useEffect(() => {
        checkUserBlocked()
        getNewNotifications()
    }, [currentUser])

    //check user blocked
    async function checkUserBlocked() {
        try {

            var { status } = await Api.get('/user/check-blocked/' + currentUser.id)
            setComponentBlocked(true)
            if (status === 200) {
                setComponentBlocked(false)
            }
        } catch (error) {
            console.log(error)
            error.response.status === 401 && setComponentBlocked(true)
        }
    }

    //get new notifications to badge of conversations
    async function getNewNotifications() {
        try {
            var { data, status } = await Api.get('/chat/get-newMsg')

            if (status === 200 && data.length > 0) {
                return setBadgeNewMessages([...data])
            }

            setBadgeNewMessages(data)

        } catch (error) {
            errorHandling(error, 'chat')
        }
    }

    //responsive layout chat
    useEffect(() => {

        setMobileLayout(window.innerWidth <= 800)

        const updateStateMobile = () => {
            setMobileLayout(window.innerWidth <= 800)
        }

        window.addEventListener("resize", updateStateMobile)

        return () => window.removeEventListener("resize", updateStateMobile)
    }, [])

    return (
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
            noResults,
            cardFriendsMaxWidth,
            setCardFriendsMaxWidth,
            setActiveCardAddDescription,
            setCardShowFriendProfile,
            cardShowFriendProfile,
            setImmutableConversations,
            immutableConversations,
            setCardFeedback,
            setModalChangeBackground,
            modalChangeBackground,
            setUrlBackground,
            urlBackground,
            setBadgeNewMessages,
            badgeNewMessages,
            friendsOnline,
            setCurrentChat,
            mobileLayout
        }}>
            {
                !componentBlocked ?

                    loadChat ?
                        <LoadChat />
                        :
                        <>
                            {
                                messageError && <ErrorMessage />
                            }
                            {
                                activeCardSearchFriends && <CardAddFriends />
                            }
                            {
                                activeCardChangeProfile && <CardProfile />
                            }
                            {
                                activeCardAddDescription && <ModalAddDescription />
                            }
                            <div className="Chat">
                                {
                                    mobileLayout ?
                                        <ChatMobileLayout/>
                                        :
                                        <ChatDesktopLayout/>
                                }
                                
                                {
                                    cardFeedback && <CardFeedback />
                                }
                                {!cardFeedback && <ButtonShowFeedback />}

                            </div>
                        </>
                    :
                    <ScreenBlocked />

            }
        </ChatContext.Provider>
    )

}

export default Chat
