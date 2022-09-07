import React from "react";
import { Button } from '@mui/material'

//styles
import './styles.css'

import LongMenu from "../menuList";
import ButtonAddFriends from "../buttonAddFriends";

//context
    //context Auth
    import ContextAuth from "../../contexts/provider/auth";
    //context chat
    import { ContextChat } from "../../contexts/chat/chatContext";

const TopBar = ({ }) => {

    const { picture } = ContextAuth()//data of current user
    const { setActiveCardSearchFriends } = ContextChat()//context of component chat

    return (
        <div className="topBarChat">
            <div className="icons">
                <img src={picture ? picture : "/img/noAvatar.png"} alt="user" />
            </div>
            <div className="menuList">
                <div onClick={() => setActiveCardSearchFriends(true)}>
                    <ButtonAddFriends/>
                </div>
                <LongMenu/>
            </div>
        </div>
    )

}

export default TopBar