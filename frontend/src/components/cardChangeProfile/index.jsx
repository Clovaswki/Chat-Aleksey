import { Card, Spinner, FormText, FormLabel, Button, Form, FormControl } from 'react-bootstrap'
import { Close } from '@mui/icons-material/';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useEffect, useState } from 'react';
import './styles.css'

//Api rest server
import Api from '../../services/api'

//Contexts
//context auth
import ContextAuth from '../../contexts/provider/auth'
//context chat
import { ContextChat } from '../../contexts/chat/chatContext';

import { getUserLocalStorage, setUserLocalStorage } from '../../contexts/provider/utils';

//error handling
import { errorHandling } from '../../helpers/errorHandling';

export default function CardChangeProfile({ currentUser, setCurrentUser }) {

    const { setModeEditProfile, setActiveChangeProfile, setMessageError } = ContextChat()
    const [dataOfEdit, setDataOfEdit] = useState({
        name: currentUser.name,
        email: currentUser.email,
        picture: '',
        description: currentUser.description
    })
    const [renderNewImage, setRenderNewImage] = useState(false) //render image choose on the input
    const [isLoader, setIsLoader] = useState(false)//loader icon
    const contextAuth = ContextAuth()

    //change data of user
    const handleEdit = () => {

        var { _id, description } = currentUser //id of user

        var name = '',
            email = '',
            picture = '',
            descriptionProfile =''

        if(dataOfEdit.name && dataOfEdit.name != currentUser.name){
            name = dataOfEdit.name
        }
        if(dataOfEdit.email && dataOfEdit.email != currentUser.email){
            email = dataOfEdit.email
        }
        if(dataOfEdit.picture && dataOfEdit.picture != currentUser.picture){
            picture = dataOfEdit.picture
        }
        if(description){
            if(dataOfEdit.description && dataOfEdit.description != currentUser.description){
                descriptionProfile = dataOfEdit.description
            }
        }

        if(name || email || picture || descriptionProfile){

            async function changeData(){
                try{
                    var response = await Api.post('/user/change-user', {
                      _id , name, email, picture, description: descriptionProfile
                    })
                    
                    var { data } = response
                    
                    setCurrentUser(data)
                    
                    var { token } = getUserLocalStorage()

                    setUserLocalStorage({
                        auth: true,
                        id: data._id,
                        name: data.name,
                        email: data.email,
                        picture: data.picture,
                        token: token  
                    })

                    if(picture) contextAuth.picture = picture //set new picture 
                    
                    setIsLoader(false)//hide loader
                    setModeEditProfile(false)
                
                }catch(error){
                    errorHandling(error, 'cardChangeProfile')
                }
            }
            
            return changeData()
            
        }
        
        setMessageError('Sem alterações!')//show error message
        setTimeout(() => setMessageError(''), 5000)//hide error message
        setIsLoader(false)
        setModeEditProfile(false)
    
    }

    //function of read file picture
    const readPicture = (event) => {

        var file = event.target.files[0]

        var reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onload = () => {

            setDataOfEdit({ picture: reader.result })
            setRenderNewImage(true)

        }

    }

    return (
        <Card.Body className='bodyChangeProfile'>
            <div className='topCardChangeProfile d-flex w-100'>
                <Close className='iconClose' onClick={() => [setActiveChangeProfile(false), setModeEditProfile(false)]} />
            </div>
            <div className='cardImg'>
                {
                    renderNewImage ?
                        <>
                            <div className='newImg'>
                                <Card.Img src={dataOfEdit.picture} className='imgProfile' referrerpolicy="no-referrer" />
                            </div>
                        </>
                        :
                        <>
                            <div className="buttonImgEdit">
                                <AddAPhotoIcon />
                                <input type="file" onChange={readPicture} />
                            </div>
                            <Card.Img src={currentUser.picture ? currentUser.picture : '/img/noAvatar.png'} className='imgProfile' referrerpolicy="no-referrer" />
                        </>
                }
            </div>
            <div className='infoChangeProfile'>
                
                <div>
                    <FormLabel>Name</FormLabel>
                    <FormControl
                        type='text'
                        value={dataOfEdit.name}
                        onChange={event => setDataOfEdit({ name: event.target.value })}
                    />
                </div>
                <div>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl
                        type='text'
                        value={dataOfEdit.email}  
                        onChange={event => setDataOfEdit({ email: event.target.value })}
                    />
                </div>
                <div>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl
                        as='textarea'
                        style={{height: '130px', resize: 'none'}}
                        type='text'
                        value={dataOfEdit.description}  
                        onChange={event => setDataOfEdit({ description: event.target.value })}
                    />
                </div>

                <div className="buttonEdit gap-2">
                    <Button className='loadButton' variant="outline-secondary" onClick={() => [handleEdit(), setIsLoader(true)]}>
                        {
                            isLoader 
                            ? <Spinner animation="border" variant="secondary" style={{width: '20px', height: '20px'}}/>
                            : "Salvar alterações"
                        }
                    </Button>
                    <Button variant="outline-secondary" onClick={() => setModeEditProfile(false)}>
                        Voltar
                    </Button>
                </div>
            </div>
        </Card.Body>
    )
}