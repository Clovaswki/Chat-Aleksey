import React, { useState } from 'react'
import { Button, TextField, Alert, LinearProgress, Box } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { FormText } from 'react-bootstrap'

//Auth Context
import ContextAuth from '../../contexts/provider/auth'
//Router Context
import { ContextRouter } from '../../contexts/router/routerContext'

//styles
import './styles.css'
import { useEffect } from 'react'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [load, setLoad] = useState(false)//set load on the button for http calls
    const auth = ContextAuth()
    const navigate = useNavigate()
    const { errorRedirect, setErrorRedirect } = ContextRouter()

    //show error message if session does not exist
    useEffect(() => {
        function errorRedirectChat(){
            if(errorRedirect){
                setErrorMessage(errorRedirect)
                setErrorRedirect('')
                setTimeout(() => {
                    setErrorMessage('')
                }, 5000)
            } 
        }
        errorRedirectChat()
    }, [])

    //authentication of user
    async function authenticate(event){
        event.preventDefault()
        
        setLoad(true)//active load on the button

        try{
            var response = await auth.authenticate(email, password)
            
            setLoad(false)//disable load on the button

            if(response.auth) return navigate('/chat')

            throw response.error

        }catch(err){
            setErrorMessage(err)
            setTimeout(() => {
                setErrorMessage('')
            }, 5000)
        }
    }
    return (
        <div className='Login'>
            {
                errorMessage && <div className='modalError'><Alert severity="error">{errorMessage}</Alert></div>
            }
            <div className='divName'>
                <div className="cardName">
                    <h4>Chat Aleksey</h4>
                    <p>Converse com o mundo</p>
                </div>
            </div>
            <div className="divForm">
                <div className="cardForm">
                    <div id='textFirst'>Faça login</div>
                    <form onSubmit={authenticate}>
                        <div className="inputs">
                            <div>
                                <TextField 
                                    onChange={e => setEmail(e.target.value)}
                                    id="outlined-basic" 
                                    label="E-mail" 
                                    variant="outlined"
                                    style={{width: 290}}
                                    />
                            </div>
                            <div>   
                                <TextField 
                                    onChange={e => setPassword(e.target.value)}
                                    id="outlined-basic" 
                                    label="Senha" 
                                    type='password' 
                                    variant="outlined" 
                                    style={{width: 290}}
                                />
                            </div>
                        </div>
                        <div id='button'>
                            <Button variant='contained' type='submit' sx={{width: '100%'}}>
                                {
                                    !load 
                                    ?'Acessar'
                                    :
                                    <Box sx={{width: '100%', padding: '10px'}}>
                                        <LinearProgress/>
                                    </Box>
                                }
                            </Button>
                        </div>
                        <div className="buttonRegister">
                            <FormText>Sem registro ? <Link to={'/register'} className='text-dark'>Faça o seu cadastro</Link></FormText>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default Login