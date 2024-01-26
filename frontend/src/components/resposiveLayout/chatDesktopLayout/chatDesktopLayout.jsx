import React from "react";
import "../../../pages/chat/styles.css"

//components
import TopBar from "../../topBarChat"
import SearchTopBar from "../../searchTopBar";
import ButtonAddFriendsInConversations from "../../buttonAddFriendsInConversations";
import Conversation from "../../conversation";
import FieldMessages from "../../fieldMessages";
import WelcomeChat from "../../welcomeChat";
import CardShowFriendProfile from "../../cardShowFriendProfile";
import FriendOnline from "../../friendOnline";

//chat context
import { ContextChat } from "../../../contexts/chat/chatContext";
//auth context
import ContextAuth from "../../../contexts/provider/auth";

const componentText_friendsOnline = (
    <div className="content p-3 showText">
        <p>Amigos Online</p>
    </div>
)

//resposive layout for desktop
const ChatDesktopLayout = () => {

    const { 
        currentChat, 
        noResults, 
        conversations, 
        setCurrentChat,
        cardShowFriendProfile,
        cardFriendsMaxWidth,
        setCardFriendsMaxWidth,
        friendsOnline 
    } = ContextChat()

    const currentUser = ContextAuth() //data of user authenticated on the context provider

    return (
        <>
            <div className="Conversations">
                <TopBar />
                <SearchTopBar />
                <ul className="Contacts">
                    {
                        noResults &&
                        <div className='cardNoResultsChat'>
                            <div>
                                <img src="/img/userNotFound.png" alt="noResults" />
                                <p>Nenhum usuário encontrado</p>
                            </div>
                        </div>
                    }
                    {
                        conversations.includes('none') ?

                            <ButtonAddFriendsInConversations />

                            :

                            conversations.map((conv, index) => (
                                <div key={index} onClick={() => setCurrentChat(conv)} style={{ height: '60px' }} className='mt-3'>
                                    <Conversation conv={conv} currentUser={currentUser} />
                                </div>
                            ))
                    }
                </ul>
            </div>
            {
                currentChat
                    ? <FieldMessages />
                    : <WelcomeChat />
            }
            {
                cardShowFriendProfile ?
                    <CardShowFriendProfile />
                    :
                    <div className={"FriendsOnline " + (cardFriendsMaxWidth ? "maxWidth" : "minWidth")}>
                        <div className="topBarOnline">
                            <div className="divIconBack">
                                <img className="iconBack" src="/img/iconBack.png" alt="back" onClick={() => setCardFriendsMaxWidth(cardFriendsMaxWidth ? false : true)} />
                            </div>
                            {
                                cardFriendsMaxWidth && componentText_friendsOnline
                            }
                        </div>
                        <ul>
                            {
                                friendsOnline.map((friend, index) => (
                                    <FriendOnline key={index} friend={friend} />
                                ))
                            }
                        </ul>
                    </div>
            }
        </>
    )
}

export default ChatDesktopLayout