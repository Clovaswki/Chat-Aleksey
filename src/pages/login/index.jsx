import React, { useState } from 'react'
import { Button, TextField, Alert, LinearProgress, Box } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { FormText, Spinner } from 'react-bootstrap'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'

//Auth Context
import ContextAuth from '../../contexts/provider/auth'
//Router Context
import { ContextRouter } from '../../contexts/router/routerContext'

//styles
import './styles.css'
import { useEffect } from 'react'

//components
import CssSpriteLogin from '../../components/cssSpriteLogin/cssSpriteLogin'

//json messages css sprite
import messagesTextRight from '../../helpers/messagesTextRight.json'
import messagesTextLeft from '../../helpers/messagesTextLeft.json'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const auth = ContextAuth()
    const navigate = useNavigate()
    const { errorRedirect, setErrorRedirect } = ContextRouter()
    
    //load login normal 
    const [load, setLoad] = useState(false)//set load on the button for http calls

    //load login with google
    const [loadGoogle, setLoadGoogle] = useState(false)

    //show error message if session does not exist
    useEffect(() => {
        function errorRedirectChat() {
            if (errorRedirect) {
                setErrorMessage(errorRedirect)
                setErrorRedirect('')
                setTimeout(() => {
                    setErrorMessage('')
                }, 5000)
            }
        }
        errorRedirectChat()
    }, [])

    //error handling login
    const errorHandlingLogin = (err) => {

        var errString = typeof err !== 'string' ? 'Erro ao autenticar' : err

        setErrorMessage(err)
        setTimeout(() => {
            setErrorMessage('')
        }, 5000)
    }

    //authentication of user
    async function authenticate(event) {
        event.preventDefault()

        setLoad(true)//active load on the button

        try {
            var response = await auth.authenticate(email, password)

            setLoad(false)//disable load on the button

            if (response.auth) return navigate('/chat')

            throw response.error

        } catch (err) {
            errorHandlingLogin(err)
        }
    }

    //authentication with oauth
    const authenticateWithGoogle = useGoogleLogin({
        onSuccess: async (response) => {

            try {
                var responseData = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        "Authorization": `Bearer ${response.access_token}`
                    }
                })

                if (responseData.status === 200 && responseData.data.email_verified) {
                    try {
                        var res = await auth.authenticateGoogleApi(true, responseData.data.email)

                        if (res.data.auth) {
                            setLoadGoogle(false)
                            return navigate('/chat')
                        }

                        throw res.data.error || 'erro ao auntenticar'
                    } catch (error) {
                        setLoadGoogle(false)
                        console.log(error)
                        return errorHandlingLogin(error)
                    }
                }

                throw 'Erro ao auntenticar'

            } catch (error) {
                setLoadGoogle(false)
                console.log(error)
                errorHandlingLogin(error)
            }

        }
    })

    const LoaderAuthWithGoogle = (
        <div style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
            <Spinner animation="grow" size="sm"  />
        </div>
    )

    return (
        <div className='Login'>
            {
                errorMessage && <div className='modalError'><Alert severity="error">{errorMessage}</Alert></div>
            }
            <CssSpriteLogin position={'left'} messagesText={messagesTextLeft}/>
            <div className="divForm">
                <div className="cardForm">
                    <div className="logoLoginChat">

                        <img src="/img/chatIcon.png" alt="chatIcon" style={{ width: '100px', height: '100px' }} />

                    </div>
                    <form onSubmit={authenticate}>
                        <div className="inputs">
                            <div>
                                <TextField
                                    onChange={e => setEmail(e.target.value)}
                                    id="outlined-basic"
                                    label="E-mail"
                                    variant="outlined"
                                    style={{ width: '100%' }}
                                />
                            </div>
                            <div>
                                <TextField
                                    onChange={e => setPassword(e.target.value)}
                                    id="outlined-basic"
                                    label="Senha"
                                    type='password'
                                    variant="outlined"
                                    style={{ width: '100%' }}
                                />
                            </div>
                        </div>
                        <div id='button'>
                            <Button variant='contained' type='submit' sx={{ width: '100%' }}>
                                {
                                    !load
                                        ? 'Acessar'
                                        :
                                        <Box sx={{ width: '100%', padding: '10px' }}>
                                            <LinearProgress />
                                        </Box>
                                }
                            </Button>
                            <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'Inter Tight' }}>
                                <hr style={{ flex: '1' }} />
                                <small style={{ margin: '0 15px' }}>ou</small>
                                <hr style={{ flex: '1' }} />
                            </div>
                            <div className="btnGoogleLogin" onClick={() => [setLoadGoogle(true),authenticateWithGoogle()]}>
                                <img src="/img/google.png" alt="google" style={{ width: '20px', height: '20px' }} />
                                faça login com o google
                                {
                                    loadGoogle && LoaderAuthWithGoogle
                                }
                            </div>
                        </div>
                        <div className="buttonRegister">
                            <FormText>Sem registro ? <Link to={'/register'} className='text-dark'>Faça o seu cadastro</Link></FormText>
                        </div>
                    </form>
                </div>
            </div>
            <CssSpriteLogin position={'right'} messagesText={messagesTextRight}/>
        </div>
    )

}

export default Login