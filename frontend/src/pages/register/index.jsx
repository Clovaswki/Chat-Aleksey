import React, { useState, useRef } from 'react'
import './styles.css'
import { Button, Form, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'

//components
import AlertMessage from '../../components/alertMessage'
import CardImage from '../../components/cardImageUser'

//api rest
import Api from '../../services/api'
import { useEffect } from 'react'

const Register = () => {

    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        picture: '',
        oauth: false
    })
    const [repeatPass, setRepeatPass] = useState('')
    const [activeCardImg, setActiveCardImg] = useState(false) //show the card choose image
    const [alertMessages, setAlertMessages] = useState([])
    const [isLoader, setIsLoader] = useState(false)
    const [checkedForm, setCheckedForm] = useState(false)//checkbox
    const scrollRegister = useRef()
    var errorsText = []//message errors

    //post of data of new user and validation of form
    async function handleSubmit(event) {
        event.preventDefault()

        setIsLoader(true)//active icon loader

        var name = newUser.name,
            email = newUser.email,
            password = newUser.password,
            picture = newUser.picture

        errorsText = []

        if (!name || typeof name == undefined || name == null) {
            errorsText.push({ message: 'Nome inválido', errorStatus: true })
        }
        if (!email || typeof email == undefined || email == null) {
            errorsText.push({ message: 'Email inválido', errorStatus: true })
        }
        if (!password || typeof password == undefined || password == null) {
            errorsText.push({ message: 'Senha inválida', errorStatus: true })
        }
        if (!repeatPass || repeatPass !== password) {
            errorsText.push({ message: 'As senhas são diferentes', errorStatus: true })
        }
        if (!checkedForm) {
            if (!picture || typeof picture == undefined || picture == null) {
                errorsText.push({ message: 'Arquivo de imagem inválido', errorStatus: true })
            }
        }

        if (errorsText.length > 0) {
            setAlertMessages([...errorsText])
            setIsLoader(false)

            setTimeout(() => {
                setAlertMessages([])
            }, 7000)
        } else {
            var NewUser = newUser

            //post new user in database
            try {
                var response = await Api.post('/user/register', NewUser)

                if (response.status === 200) {
                    setAlertMessages([{ message: 'Usuário cadastrado', errorStatus: false }])
                    setNewUser({
                        name: '',
                        email: '',
                        password: '',
                        picture: '',
                        oauth: false
                    })
                    setActiveCardImg(false)//disabled card show image
                    setIsLoader(false)
                    setTimeout(() => {
                        setAlertMessages([])
                    }, 7000)
                }

            } catch (error) {
                if (error.response.status === 401) {
                    setAlertMessages([error.response.data])
                    setTimeout(() => setAlertMessages([]), 7000)
                    setIsLoader(false)
                }
                error.response.status === 413 && setAlertMessages([{ message: 'Arquivo de imagem muito grande', errorStatus: true }])
            }
        }

    }

    //reader of file of picture and convert to string base64
    function readFilePicture(event) {

        var file = event.target.files[0]

        var reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onload = () => {

            setNewUser({ ...newUser, picture: reader.result })
            setActiveCardImg(true)


        }

    }

    const registerWithGoogle = useGoogleLogin({
        onSuccess: async response => {
            try {
                const dataResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        "Authorization": `Bearer ${response.access_token}`
                    }
                })
                console.log(dataResponse)
                if(dataResponse.status === 200){

                    const NewUser = {
                        name: dataResponse.data.given_name,
                        email: dataResponse.data.email,
                        password: '',
                        picture: dataResponse.data.picture,
                        oauth: true
                    }
                    try {
                        var response = await Api.post('/user/register', NewUser)
    
                        if (response.status === 200) {
                            setAlertMessages([{ message: 'Usuário cadastrado', errorStatus: false, oauth: true }])
                            setActiveCardImg(false)//disabled card show image
                            setTimeout(() => {
                                setAlertMessages([])
                            }, 7000)
                        }
    
                    } catch (error) {
                        if (error.response.status === 401) {
                            setAlertMessages([error.response.data])
                            setTimeout(() => setAlertMessages([]), 7000)
                            setIsLoader(false)
                        }
                        error.response.status === 413 && setAlertMessages([{ message: 'Arquivo de imagem muito grande', errorStatus: true }])
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
    })//google oauth

    //scroll 
    useEffect(() => {

        alertMessages.length > 0 && scrollRegister.current.scrollTo({ top: 0 })
        activeCardImg && scrollRegister.current.scrollTo({ top: 1000 })

    }, [alertMessages, activeCardImg])

    return (
        <div className='registerComponent'>
            <aside>
                <div>
                    <img src='/img/chatIcon.png' />
                    <p>Bem-vindo</p>
                    <Link to={'/'}><Button style={{ borderRadius: '24px' }} variant="outline-light">Login</Button></Link>
                </div>
            </aside>
            <div className='registerForm' ref={scrollRegister}>
                {
                    alertMessages.length > 0
                    &&
                    <div className="cardErrors">
                        {
                            alertMessages.map((alert, index) => (
                                <AlertMessage key={index} alert={alert} />
                            ))
                        }
                    </div>
                }
                <div className='body-registerForm'>
                    <header>
                        <div>Crie a sua conta</div>
                    </header>
                    <Form className='d-flex flex-column gap-1' onSubmit={handleSubmit}>
                        <Form.Label>
                            Digite o seu nome
                            <Form.Control
                                placeholder='Nome'
                                name='name'
                                onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                                value={newUser.name}
                            />
                        </Form.Label>
                        <Form.Label>
                            Digite o seu email
                            <Form.Control
                                placeholder='Email'
                                name='email'
                                onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                                value={newUser.email}
                            />
                        </Form.Label>
                        <Form.Label>
                            Senha
                            <Form.Control
                                placeholder='Senha'
                                name='password'
                                type="password"
                                onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                                value={newUser.password}
                            />
                        </Form.Label>
                        <Form.Label>
                            Repita a senha
                            <Form.Control
                                placeholder='Repita a senha'
                                name='password'
                                type="password"
                                onChange={e => setRepeatPass(e.target.value)}
                                value={repeatPass}
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
                            !checkedForm && activeCardImg && <CardImage img={newUser.picture} />
                        }
                        <Form.Check type='checkbox' label='Sem foto' checked={checkedForm} onChange={e => setCheckedForm(e.target.checked)} />
                        <div className="btnsRegister">
                            <Button className='btnRegister' size='lg' type='submit' style={{ borderRadius: '24px', width: '150px' }}>
                                {
                                    isLoader ?
                                        <Spinner animation="border" variant="light" className='p-2' />
                                        :
                                        'Registrar'
                                }
                            </Button>
                            <button className='btnGoogle' type='button' onClick={() => registerWithGoogle()}>
                                <img src="/img/google.png" alt="google" style={{ width: '20px', height: '20px' }} />
                                cadastre-se com o google
                            </button>
                        </div>
                        <Form.Text className='mb-4'>
                            Já cadastrado ? <Link to={'/'} className='text-dark'>Faça login</Link>
                        </Form.Text>
                    </Form>

                </div>
            </div>
        </div>
    )

}

export default Register