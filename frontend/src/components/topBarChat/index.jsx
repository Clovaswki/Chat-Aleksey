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

//icons
import CollectionsIcon from '@mui/icons-material/Collections';
import {IconButton }from "@mui/material";

const TopBar = ({ }) => {

    const { picture } = ContextAuth()//data of current user
    const { setActiveCardSearchFriends, setModalChangeBackground } = ContextChat()//context of component chat

    return (
        <div className="topBarChat">
            <div className="icons">
                <img src={picture ? picture : "/img/noAvatar.png"} alt="user" referrerpolicy="no-referrer"/>
            </div>
            <div className="menuList">
                <div onClick={() => setModalChangeBackground(true)}>
                    <IconButton>
                        <CollectionsIcon/>
                    </IconButton>
                </div>
                <div onClick={() => setActiveCardSearchFriends(true)}>
                    <ButtonAddFriends/>
                </div>
                <LongMenu/>
            </div>
        </div>
    )

}

export default TopBar