import { Alert, Card, Row, Col } from 'react-bootstrap'
import './styles.css'

//chat context
import { ContextChat } from '../../contexts/chat/chatContext'

export default function ErrorMessage() {

    const { messageError } = ContextChat()

    return (

        <Alert variant='danger' className='cardChatError d-flex'>
            <div>
                <img src='/img/alert.png' style={{ width: '25px', height: '25px' }} />
                <p>{messageError}</p>
            </div>
        </Alert>

    )

}