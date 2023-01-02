import React, { useEffect, useState } from "react";
import Badge from '@mui/material/Badge';
import Api from "../../services/api";

//styles
import './styles.css'

//chat context
import { ContextChat } from '../../contexts/chat/chatContext'

//change title of document html
import { changeTitle } from '../../helpers/changeTitle'

const Conversation = ({ conv, currentUser }) => {

    const [user, setUser] = useState({})
    const { allUsers, currentChat, badgeNewMessages, setBadgeNewMessages, conversations } = ContextChat()

    const [activeLineBottom, setActiveLineBottom] = useState(false)
    
    //click in this conversation
    const [pressConv, setPressConv] = useState(false)
    
    //badge new messages
    const [notificationNewMessages, setNotificationNewMessages] = useState(null)
    
    //verify new notifications
    function checkNotificationsNewMessages() {
        
        var messages = badgeNewMessages.filter(badgeMsg =>
            badgeMsg.conversationId === conv._id && badgeMsg.senderId !== currentUser.id
        )
            
        setNotificationNewMessages(messages.length > 0 ? messages.length : null)
        
    }
    useEffect(() => {
        
        checkNotificationsNewMessages()
        
    }, [badgeNewMessages, conversations])

    //check if user clicked on this conversation
    useEffect(() => {
        setPressConv(currentChat?._id === conv._id)
        
        //delete new message notification
        const deleteNewMsgBadge = async () => {
            
            await Api.delete('/chat/delete-newMsg/' + currentChat?._id)
            
            var notifications = badgeNewMessages.filter(b => b.conversationId !== currentChat._id)
            
            //add notifications number on the title of html document
            changeTitle(notifications, currentUser.id)
            
            setBadgeNewMessages([...badgeNewMessages.filter(b => b.conversationId !== currentChat._id)])
            
        }
        deleteNewMsgBadge()

        //muitos bugs
        //corrigir todos
        //

    }, [currentChat])

    useEffect(() => {
        var friendId = conv.members.find(m => m !== currentUser.id)

        async function getUserFriend() {

            var userFriend = allUsers.filter(u => u._id === friendId)

            if (userFriend.length > 0) {
                return setUser(...userFriend)
            }

            var response = await Api.get('/user/get-users?id=' + friendId)
            setUser(response.data)

        }
        getUserFriend()
    }, [currentUser, user, conv])

    useEffect(() =>{
        
        setActiveLineBottom(conversations.length === 1 )
        
    }, [conversations])
    
    const lineBottom = (
        activeLineBottom &&
            <div className="line" style={{bottom: '0'}}></div>
    )

    return (
        <>
            <li className='Conversation'>
                <div className={"cardConv " + (pressConv && 'pressConv')}>
                    <div className="imgConv">
                        <img src={user.picture ? user.picture : "/img/noAvatar.png"} referrerpolicy="no-referrer" alt="userContact" />
                    </div>
                    <div className="infoConv">
                        <div className="line" style={{top: '0'}}></div>
                        <div className="name_and_badge">
                            <p>{user.name}</p>
                            {notificationNewMessages && <Badge badgeContent={notificationNewMessages} color='success' />}
                        </div>
                        {lineBottom}
                    </div>
                </div>
            </li>
        </>
    )

}

export default Conversation