import { useState } from 'react';
import './styles.css'

import CloseIcon from '@mui/icons-material/Close';
import { Form, Button, Spinner } from 'react-bootstrap'

//auth context
import ContextAuth from '../../contexts/provider/auth'
//chat context
import { ContextChat } from '../../contexts/chat/chatContext'

//function change localStorage of user
import { insertDescriptionLocalStorage } from '../../helpers/changeUserLocalStorage';

//Api rest
import Api from '../../services/api'

export default function ModalAddDescription(){

    const { picture, id } = ContextAuth()
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
            console.log(error)
            if(error.status === 500) {
                setMessageError(error.response.data.error)
                setTimeout(() => setMessageError(''), 5000)
            }
        }

    }

    return(
        <div className='ModalAddDescriptionCardFirst'>
            <div className="modalAddDescription">
                <div className='topBarDescription'>
                    <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                        <img src={picture ? picture : '/img/noAvatar.png'} alt="user"/>
                        <span className='textWelcomeDes'>Bem-vindo ao Chat Aleksey</span>
                    </div>
                    <span className='closeIconDescription' onClick={() => setActiveCardAddDescription(false)}><CloseIcon/></span>
                </div>
                <hr />
                <div className='inputDescription'>
                    <Form.Control
                        as='textarea'
                        placeholder='Insira aqui a sua descrição de perfil !'
                        style={{height: '150px', resize: 'none'}}
                        onChange={event => setDescription(event.target.value)}
                    />
                </div>
                <div className='buttonsOfDescription'>
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
    )

}