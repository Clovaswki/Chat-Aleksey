import React, { useState } from "react";
import { useEffect } from "react";
import Api from "../../services/api";

//chat context
import { ContextChat } from "../../contexts/chat/chatContext";

//styles
import './styles.css'

const FriendOnline = ({friend}) => {

    const [user, setUser] = useState({})
    const { cardFriendsMaxWidth, allUsers } = ContextChat()

    useEffect(() => {
        const getUser = async () => {
             
            var userFriend = allUsers.filter( u => u._id === friend.userId)

            if(userFriend.length > 0){
                return setUser(...userFriend)
            }

            var response = await Api.get(`/user/get-users?id=${friend.userId}`)
            setUser(response.data)
        }
        getUser()
    }, [friend])

    return(
        <li className="cardFriend">
            <div className="iconImage">
                <img src={user.picture ? user.picture : "/img/noAvatar.png"} alt="friendImg"/>
                <span></span>
            </div>
            {
                cardFriendsMaxWidth && <p>{user.name}</p>
            }
        </li>
    )

}

export default FriendOnline