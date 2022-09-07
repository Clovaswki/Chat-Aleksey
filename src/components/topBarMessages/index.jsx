import React from "react";

//styles
import './styles.css'

const TopBarMessages = ({user, writing}) => {

    return(
        <div className="topBarMessages">
            <div className="icons">
                <div>
                    <img src={user.picture ? user.picture : "/img/noAvatar.png"} alt="user"/>
                    <div>{user.name}</div>
                </div>
                {
                    writing.state &&  writing.senderId === user._id && <p>Digitando...</p>
                }
            </div>
        </div>
    )

}

export default TopBarMessages