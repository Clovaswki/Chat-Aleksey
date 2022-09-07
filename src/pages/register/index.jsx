import React, { useState } from 'react'
import './styles.css'
import { Button, Card, Form, FormText, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'

//components
import AlertMessage from '../../components/alertMessage'
import CardImage from '../../components/cardImageUser'

//api rest
import Api from '../../services/api'

const Register = () => {

    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        picture: ''
    })    
    const [activeCardImg, setActiveCardImg] = useState(false) //show the card choose image
    const [alertMessages, setAlertMessages] = useState([])
    const [isLoader, setIsLoader] = useState(false)
    const [checkedForm, setCheckedForm] = useState(false)//checkbox
    var errorsText = []//message errors

    //post of data of new user and validation of form
    async function handleSubmit(event){
        event.preventDefault()

        setIsLoader(true)//active icon loader

        var name = newUser.name,
            email = newUser.email,
            password = newUser.password,
            picture = newUser.picture

        errorsText = []

        if(!name || typeof name == undefined || name == null ){
            errorsText.push({message: 'Nome inválido', errorStatus: true})        
        }
        if(!email || typeof email == undefined || email == null ){
            errorsText.push({message:'Email inválido', errorStatus: true})        
        }
        if(!password || typeof password == undefined || password == null ){
            errorsText.push({message: 'Senha inválida', errorStatus: true})        
        }
        if(!checkedForm){
            if(!picture || typeof picture == undefined || picture == null ){
                errorsText.push({message: 'Arquivo de imagem inválido', errorStatus: true})        
            }
        }

        if(errorsText.length > 0){
            setAlertMessages([...errorsText])
            setIsLoader(false)

            setTimeout(() => {
                setAlertMessages([])
            }, 10000 * 2)
        }else{
            var NewUser = newUser
            
            //post new user in database
            try{
                var response = await Api.post('/user/register', NewUser)
                
                if(response.status === 200){
                    setAlertMessages([{message: 'Usuário cadastrado', errorStatus: false}])
                    setNewUser({
                        name: '',
                        email: '',
                        password: '',
                        picture: ''
                    })
                    setActiveCardImg(false)//disabled card show image
                    setIsLoader(false)
                    setTimeout(() => {
                        setAlertMessages([])
                    }, 7000)
                }

            }catch(error){
                if(error.response.status === 401){
                    setAlertMessages([error.response.data])
                    setIsLoader(false)
                }  
                error.response.status === 413 && setAlertMessages([{message: 'Arquivo de imagem muito grande', errorStatus: true}])
            }
        }

    }

    //reader of file of picture and conversion to string base64
    function readFilePicture(event){

        var file = event.target.files[0]
        
        var reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onload = () => {

            setNewUser({...newUser, picture: reader.result})
            setActiveCardImg(true)

        }
    
    }

    return(
        <div className="cardRegister">
            {
                alertMessages.length > 0
                && 
                <div className="cardErrors">
                    {
                    alertMessages.map( (alert, index) => (
                        <AlertMessage key={index} alert={alert}/>
                    ))
                    }
                </div> 
            }
            <Card className='w-50 mt-3'>
                <Card.Body className='text-center'>
                    <FormText style={{fontSize: '12pt', fontWeight: 'bold'}}>Faça o seu registro</FormText>
                </Card.Body>
            </Card>
            <Card className='w-50 mt-5'>
                <Card.Body>
                    <Form className='d-flex flex-column gap-1' onSubmit={handleSubmit}>
                        <Form.Label>
                            Digite o seu nome
                            <Form.Control
                                placeholder='Nome'
                                name='name'
                                onChange={e => setNewUser({...newUser, name: e.target.value})}
                                value={newUser.name}
                            />
                        </Form.Label>
                        <Form.Label>
                            Digite o seu email
                            <Form.Control
                                placeholder='Email'
                                name='email'
                                onChange={e => setNewUser({...newUser, email: e.target.value})}
                                value={newUser.email}
                                />
                        </Form.Label>
                        <Form.Label>
                            Senha
                            <Form.Control
                                placeholder='Senha'
                                name='password'
                                type="password"
                                onChange={e => setNewUser({...newUser, password: e.target.value})}
                                value={newUser.password}
                                />
                        </Form.Label>
                        {
                        !checkedForm &&
                            <Form.Label>
                                Upload de uma foto
                                <input 
                                    type="file" 
                                    className='form-control' 
                                    name='file'
                                    // onChange={e => setNewUser({...newUser, picture: e.target.value})}
                                    onChange={readFilePicture}
                                />
                            </Form.Label>
                        }

                        {
                            activeCardImg && <CardImage img={newUser.picture}/>
                        }
                        <Form.Check type='checkbox' label='Sem foto' checked={checkedForm} onChange={e => setCheckedForm(e.target.checked)}/>
                        <Button className='btnRegister' type='submit'>
                            {
                                isLoader ?
                                <Spinner animation="border" variant="light" className='p-2' />
                                :
                                'Registrar'
                            }
                        </Button>
                        <Form.Text>
                            Já cadastrado ? <Link to={'/'} className='text-dark'>Faça login</Link>
                        </Form.Text>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )

}

export default Register