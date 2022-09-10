import { useState } from 'react'
//styles
import './styles.css'
import { format, register } from 'timeago.js'

//function locale string pt_BR
import { locale } from '../../helpers/localeStringTimeAgo'

//Api rest
import Api from '../../services/api'

//auth context
import ContextAuth from '../../contexts/provider/auth'
//chat context
import { ContextChat } from '../../contexts/chat/chatContext'

export default function Message({sender, message, setModalDeleteMessage}){

    const { id } = ContextAuth()
    const [optionDelete, setOptionDelete] = useState(false)

    //format date of createdAt
    register('pt_BR', locale)

    return(
        <div className={sender ? 'messageCard' : 'messageCard own'} onMouseOver={() => setOptionDelete(true)} onMouseOut={() => setOptionDelete(false)}>
            <div className='messageTextAndDelete'>
                <p className={sender ? 'messageTextSender' : 'messageTextReceived'}>
                    {message.text}
                </p>
                {
                    optionDelete && 
                        <img 
                            className='iconDeleteMsg' 
                            src="/img/deleteIcon.png" 
                            alt="delete" 
                            onClick={() => setModalDeleteMessage({state: true, messageId: message._id, userId: id})}
                        />
                }
            </div>
            <div className='messageBottom'>{format(message.createdAt, 'pt_BR')}</div>
        </div>
    )

}