import React, { useEffect, useState } from "react";
import Api from "../../services/api";

//styles
import './styles.css'

//chat context
import { ContextChat } from '../../contexts/chat/chatContext'

const Conversation = ({conv, currentUser}) => {

    const [user, setUser] = useState({})
    const { allUsers } = ContextChat()


    useEffect(() => {
        var friendId = conv.members.find( m => m !== currentUser.id)

        async function getUserFriend(){
            
            var userFriend = allUsers.filter( u => u._id === friendId)
                        
            if(userFriend.length > 0){
                return setUser(...userFriend)
            }
            
            var response = await Api.get('/user/get-users?id='+friendId)
            setUser(response.data)

        }
        getUserFriend()
    }, [currentUser, user])

    return(
        <>
        <li className="Conversation">
            <div className="line"></div>
            <div className="cardConv"> 
                <div className="d-flex cardInfo">
                    <div className="gap-3">
                        <img src={user.picture? user.picture: "/img/noAvatar.png"} alt="userContact"/>
                        {/* <p style={{margin: 0, marginTop: "50%", transform: "translateY(-50%)"}}>{user.name}</p> */}
                        <div>{user.name}</div>
                    </div>
                    {/* <span id="badgeNewMessage"><p>1</p></span> */}
                </div>
            </div>
            <div className="line"></div>
        </li>
        </>
    )

}

export default Conversation