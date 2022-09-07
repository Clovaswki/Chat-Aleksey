//styles
import './styles.css'
import { format, register } from 'timeago.js'

//function locale string pt_BR
import { locale } from '../../helpers/localeStringTimeAgo'

export default function Message({sender, message}){

    //format date of createdAt
    register('pt_BR', locale)

    return(
        <div className={sender ? 'messageCard' : 'messageCard own'}>
            <p className={sender ? 'messageTextSender' : 'messageTextReceived'}>{message.text}</p>
            <div className='messageBottom'>{format(message.createdAt, 'pt_BR')}</div>
        </div>
    )

}