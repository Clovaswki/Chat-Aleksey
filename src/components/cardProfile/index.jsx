import { Card, Spinner, FormText, FormLabel, Button, Form, FormControl } from 'react-bootstrap'
import EmailIcon from '@mui/icons-material/AlternateEmail';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { useEffect, useState } from 'react';
import './styles.css'

//timeago
import { format, register } from 'timeago.js'
import { locale } from '../../helpers/localeStringTimeAgo'
//...

//components
import CardChangeProfile from '../cardChangeProfile'
import ElevationCard from '../supendedCard';

//Api rest server
import Api from '../../services/api'

//Contexts
//context auth
import ContextAuth from '../../contexts/provider/auth'
//context chat
import { ContextChat } from '../../contexts/chat/chatContext';

//error handling
import { errorHandling } from '../../helpers/errorHandling';


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

    //timeago register pt_br language
    register('pt_BR', locale)
    //...

    //informations of user
    const fields = [
        {
            content: currentUser.email,
            label: "E-mail",
            icon: <EmailIcon/>
        },
        {
            content: currentUser.description,
            label: 'Descrição',
            icon: <PersonPinIcon/>
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
                errorHandling(error, 'cardProfile')
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
                            <ElevationCard>
                                <div className='topCardProfile d-flex w-100'>
                                    <small onClick={() => [setActiveChangeProfile(false), setModeEditProfile(false)]}>
                                        Fechar
                                    </small>
                                </div>
                            </ElevationCard>
                            <ElevationCard>
                                <div style={{display:'flex',justifyContent: 'center', width: '100%', alignItems: 'center', flexDirection: 'column', gap: '10px'}}>
                                    <Card.Img src={currentUser.picture ? currentUser.picture : '/img/noAvatar.png'} className='imgProfile mt-2' referrerpolicy="no-referrer"/>
                                    <div className="name">
                                        <Card.Text><strong>{currentUser.name}</strong></Card.Text>
                                    </div>
                                </div>
                            </ElevationCard>
                            <div className='infoProfile'>
                                {
                                    fields.map((field, index) => (
                                        <ElevationCard key={index} height={'60px'}>
                                                <FormLabel className='m-0'>{field.icon}</FormLabel>
                                                <FormText className='m-0'>{field.content}</FormText>
                                        </ElevationCard>
                                    ))
                                }
                                <ElevationCard>
                                    <div className="buttonEdit">
                                        <div><FormText>última atualização {format(currentUser.updatedAt, 'pt_BR')}</FormText></div>
                                        <Button variant="outline-secondary" onClick={() => setModeEditProfile(true)}>
                                            Editar
                                        </Button>
                                    </div>
                                </ElevationCard>
                            </div>
                        </Card.Body>
                }
            </Card>
        </div>
    )

}