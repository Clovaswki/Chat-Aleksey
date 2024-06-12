import React from "react";
import "./styles.css"

//components
import LinearProgress from '@mui/material/LinearProgress';


const MessagesLoadCard = () => {
    return(
        <div className="messagesLoadCard">
            <div className="messagesLoadCard-center-card">
                <div className="messagesLoadCard-container">
                    <div>
                        <img src="/img/chatIcon.png" alt="chat icon"/>
                        <h1>Carregando conversa...</h1>
                    </div>
                </div>
                <LinearProgress/>
            </div>
        </div>
    )
}

export default MessagesLoadCard