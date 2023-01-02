import { ContextChat } from "../../contexts/chat/chatContext"

import './styles.css'

export default function ButtonAddFriendsInConversations(){

    const { setActiveCardSearchFriends } = ContextChat()

    const showEffect = (target) => {
        target.style.opacity = '.5'
    }

    const hideEffect = (target) => {
        target.style.opacity = '1'
    }

    return(
        <div className="buttonAddFriendsInConversationsComponent" style={{
            height: '100vh',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <img 
                src="/img/addFriends2.png" 
                alt="add friends" 
                style={{
                    width: '100px',
                    height: '100px',
                    cursor: 'pointer'
                }} 
                onClick={() => setActiveCardSearchFriends(true)}
                onMouseOver={e => showEffect(e.target)}
                onMouseOut={ e => hideEffect(e.target)}
            />
        </div>
    )

}