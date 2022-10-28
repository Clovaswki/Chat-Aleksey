import React from 'react'
import './cssSpriteLogin.css'

export default function CssSpriteLogin({ messagesText, position }) {

    const message = React.useRef(null)
    const cssSpriteLogin = React.useRef(null)
    const [messagesDomNumber, setMessagesDomNumber] = React.useState(0)
    const [messagesList, setMessagesList] = React.useState([])


    React.useEffect(() => {

        setTimeout( () => showMessagesSprite(), 1000)

    }, [])


    function showMessagesSprite() {

        let messagesList = []

        messagesText.forEach((msg, index) => {
            let newElement = message.current.cloneNode(true)
            
            msg[1] === 'left' 
            ? newElement.classList.add('leftMessage')
            : newElement.classList.add('rightMessage')

            newElement.children[0].innerHTML = msg[0]
            newElement.style.display = 'flex'
            newElement.classList.add('showMessages')
            messagesList.push(newElement)
        })
        
        messagesList.map( (msg, index) => {
            setTimeout(() => {
    
                cssSpriteLogin.current.appendChild(msg)
    
            }, parseInt(index.toString()+'000'))
        } )

        setTimeout(() => hideMessageSprite(messagesList), 8000)

    }

    function hideMessageSprite(messagesList){

        messagesList.map( (msg, index) => {
            setTimeout(() => {
                
                msg.classList.remove('showMessages')
                msg.classList.add('hideMessages')
                setTimeout(() => msg.remove(), 1000)

            }, parseInt(index.toString()+'000'))
        })

        showMessagesSprite()

    }

    return (
        <div ref={cssSpriteLogin} className='cssSpriteLogin' style={position === 'left' ? { left: 0 } : { right: 0 }}>

            <span ref={message} className='conversationComponent' style={{display:'none'}}>
                <p></p>
            </span>

        </div>
    )

}