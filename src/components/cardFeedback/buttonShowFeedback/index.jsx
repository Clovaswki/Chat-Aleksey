import { ContextChat } from "../../../contexts/chat/chatContext"

export default function ButtonShowFeedback(){

    const { setCardFeedback } = ContextChat()

    const stylesCard = {
        position: 'absolute',
        backgroundColor: '#ffff',
        padding: '5px',
        border: '1px solid lightgray',
        zIndex: 3,
        left: '100%',
        transform: 'translateX(-100%)',
        top: '90%',
        borderBottomRightRadius: '5px',
        borderTopLeftRadius: '5px',
        boxShadow: '1px 1px 5px rgba(0, 0, 0, .9)',
        outline: '1',
        cursor: 'pointer'
    }

    const stylesImg = {
        width: '25px',
        height: '25px'
    }

    return(
        <div className="btnShowFeedback" style={stylesCard} onClick={() => setCardFeedback(true)}>
            <img src="/img/chatIcon.png" style={stylesImg} alt="logo" />
        </div>
    )

}