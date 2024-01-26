import React from "react";

//styles
import './styles.css'

//icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {IconButton }from "@mui/material";

//chat context
import { ContextChat } from "../../contexts/chat/chatContext";

const TopBarMessages = ({user, writing}) => {

    const { setCardShowFriendProfile, mobileLayout, setCurrentChat } = ContextChat()

    return(
        <div className="topBarMessages" onClick={() => setCardShowFriendProfile({id: user._id})}>
            <div className="icons">
                <div>
                    {
                        mobileLayout && 
                            <span onClick={() => setCurrentChat(null)}>
                                <IconButton>
                                   <ArrowBackIcon/>
                                </IconButton>
                            </span>
                    }
                    <div>
                        <img src={user.picture ? user.picture : "/img/noAvatar.png"} alt="user" referrerpolicy="no-referrer"/>
                        <div>{user.name}</div>
                    </div>
                </div>
                {
                    writing.state &&  writing.senderId === user._id && <p>Digitando...</p>
                }
            </div>
        </div>
    )

}

export default TopBarMessages