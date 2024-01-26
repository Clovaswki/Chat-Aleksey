import React from "react";
import "../../../pages/chat/styles.css"

//components
import TopBar from "../../topBarChat"
import SearchTopBar from "../../searchTopBar";
import ButtonAddFriendsInConversations from "../../buttonAddFriendsInConversations";
import Conversation from "../../conversation";
import FieldMessages from "../../fieldMessages";
import CardShowFriendProfile from "../../cardShowFriendProfile";

//chat context
import { ContextChat } from "../../../contexts/chat/chatContext";
//auth context
import ContextAuth from "../../../contexts/provider/auth";

//resposive layout for desktop
const ChatMobileLayout = () => {

    const { 
        noResults, 
        conversations, 
        setCurrentChat,
        currentChat,
        cardShowFriendProfile
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
                {
                    currentChat && <FieldMessages/>
                }
                {
                    cardShowFriendProfile && <CardShowFriendProfile/>
                }
            </div>                                                                                                              
        </>
    )
}

export default ChatMobileLayout                     