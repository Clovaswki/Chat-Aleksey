import { Card, Spinner, FormText, FormLabel, Button, Form, FormControl } from 'react-bootstrap'
import { Close } from '@mui/icons-material/';
import EmailIcon from '@mui/icons-material/AlternateEmail';
import { useEffect, useState } from 'react';
import './styles.css'

//components
import CardChangeProfile from '../cardChangeProfile'

//Api rest server
import Api from '../../services/api'

//Contexts
//context auth
import ContextAuth from '../../contexts/provider/auth'
//context chat
import { ContextChat } from '../../contexts/chat/chatContext';

export default function CardProfile({ }) {

    const [currentUser, setCurrentUser] = useState({})
    const { 
        setActiveChangeProfile, 
        setModeEditProfile, 
        modeEditProfile, 
        setMessageError,
        allUsers
    } = ContextChat()
    const { id } = ContextAuth()

    //informations of user
    const fields = [
        {
            content: currentUser.email,
            label: "E-mail"
        },
        {
            content: currentUser.description,
            label: 'Descrição'
        }
    ]

    //get user authenticated
    useEffect(() => {
        async function getCurrentUser() {
            try {
                var user = allUsers.filter( user => user._id === currentUser.id)
                if(user.length > 0){
                    return setCurrentUser(...user)
                }
                var response = await Api.get('/user/get-users/?id=' + id)
                setCurrentUser(response.data)
            } catch (error) {
                if(error.response.status === 401){
                    setMessageError('Sua sessão expirou!')
                    setTimeout(() => document.location.reload(), 1000)//refresh
                }
            }
        }
        getCurrentUser()
    }, [])

    return (
        <div className='cardFirstProfile'>
            <Card className='cardProfile'>
                {
                    modeEditProfile ?
                        <CardChangeProfile currentUser={currentUser} setCurrentUser={setCurrentUser}/>
                        :
                        <Card.Body className='bodyProfile'>
                            <div className='topCardProfile d-flex w-100'>
                                <Close className='iconClose' onClick={() => [setActiveChangeProfile(false), setModeEditProfile(false)]} />
                            </div>
                            <div className='cardImg'>
                                <Card.Img src={currentUser.picture ? currentUser.picture : '/img/noAvatar.png'} className='imgProfile' />
                            </div>
                            <div className='infoProfile'>
                                <div className="name">
                                    <Card.Text><strong>{currentUser.name}</strong></Card.Text>
                                </div>
                                {
                                    fields.map((field, index) => (

                                        <Card className='fieldInfo' key={index}>
                                            <Card.Body className='d-flex gap-2'>
                                                <FormLabel className='m-0'><EmailIcon /></FormLabel>
                                                <FormText>{field.content}</FormText>
                                            </Card.Body>
                                        </Card>

                                    ))
                                }
                                <div className="buttonEdit">
                                    <Button variant="outline-secondary" onClick={() => setModeEditProfile(true)}>
                                        Editar
                                    </Button>
                                </div>
                            </div>
                        </Card.Body>
                }
            </Card>
        </div>
    )

}