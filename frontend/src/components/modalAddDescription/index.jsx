import { useState } from 'react';
import './styles.css'

import CloseIcon from '@mui/icons-material/Close';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import { Form, Button, Spinner } from 'react-bootstrap'

//auth context
import ContextAuth from '../../contexts/provider/auth'
//chat context
import { ContextChat } from '../../contexts/chat/chatContext'

//function change localStorage of user
import { insertDescriptionLocalStorage } from '../../helpers/changeUserLocalStorage';

//Api rest
import Api from '../../services/api'

//error handling
import { errorHandling } from '../../helpers/errorHandling';

export default function ModalAddDescription(){

    const { picture, id, name } = ContextAuth()
    const { setMessageError, setActiveCardAddDescription } = ContextChat()
    const [description, setDescription] = useState('')
    const [loader, setLoader] = useState(false)

    //insert a description on the database
    async function handleDescription(){

        setLoader(true)//active loader icon

        if(!description || typeof description == undefined || description == null){
            setMessageError('descrição inválida!')
            setLoader(false)
            return setTimeout(() => setMessageError(''), 5000)
        }

        try{
            var response = await Api.post('/user/change-user', {
                _id: id, description
            })

            if(response.status === 200){
                insertDescriptionLocalStorage(description)
                setLoader(false)
                setActiveCardAddDescription(false)
            }else{
                setMessageError(response.data.error || 'Erro interno!')
                setTimeout(() => setMessageError(''), 5000)
            }
            

        }catch(error){
            errorHandling(error, 'modalAddDescription')
        }

    }

    return(
        <div className='ModalAddDescriptionCardFirst'>
            <div className="modalAddDescription">
                <div className='topBarDescription'>
                    <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                        <img src={picture ? picture : '/img/noAvatar.png'} alt="user" referrerpolicy="no-referrer"/>
                        <span className='textWelcomeDes'>Bem-vindo{'(a)'} ao Chat Aleksey</span>
                    </div>
                    <span className='closeIconDescription' onClick={() => setActiveCardAddDescription(false)}><CloseIcon/></span>
                </div>
                <hr />
                <div className='inputDescription'>
                    <Form.Control
                        as='textarea'
                        placeholder={`Insira aqui a sua descrição de perfil, ${name} !`}
                        style={{height: '150px', resize: 'none'}}
                        onChange={event => setDescription(event.target.value)}
                    />
                </div>
                <div className='buttonsOfDescription'>
                    <span>
                        <ContactSupportIcon/>
                    </span>
                    <div className='d-flex gap-2'>
                        <Button className='btnSaveDescription'variant='outline-success' onClick={() => [handleDescription(), setLoader(true)]}>
                            {
                                loader
                                ? <Spinner animation="border" variant="success" />
                                : 'salvar'
                            }
                        </Button>
                        <Button variant='outline-secondary' onClick={() => setActiveCardAddDescription(false)}>cancelar</Button>
                    </div>
                </div>
            </div>
        </div>
    )

}