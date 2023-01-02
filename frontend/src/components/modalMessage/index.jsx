import './styles.css'
import { Button } from 'react-bootstrap'

export default function ModalMessage({messageId, userId, deleteMessage, setModalDeleteMessage}){

    return(
        <div className='modalMsgBackground'>
            <div className="modalContent">
                <div className='questionModal'>
                    <p>Você tem certeza ?</p>
                </div>
                <div className='buttonsModal'>
                    <Button 
                        variant='outline-danger' 
                        onClick={() => deleteMessage(messageId, userId)}
                    >
                        deletar
                    </Button>
                    <Button 
                        variant='outline-secondary' 
                        onClick={() => setModalDeleteMessage({
                            state: false,
                            messageId: '',
                            userId: ''
                        })}
                    >
                        cancelar
                    </Button>
                </div>
            </div>
        </div>
    )

}