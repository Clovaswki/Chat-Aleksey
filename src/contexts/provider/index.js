import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Api from '../../services/api'
import { ContextRouter } from '../router/routerContext'

import { getUserLocalStorage, LoginReq, setUserLocalStorage } from './utils'

export const AuthContext = createContext({})

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState({})
    const [error, setError] = useState({})
    const [socket, setSocket] = useState(null) //websocket server connection instance
    const navigate = useNavigate()

    useEffect(() => {    
        async function verifyJWT(){
            try{
                var response = await Api.get('/user/verify-token')
                
                if(response.data.auth){
                    var user = getUserLocalStorage()
                    setUser(user)
                }
            }catch(error){
                !error.response.data.auth && setUserLocalStorage(null)
            }
        }
        verifyJWT()
    }, [])

    async function authenticate(email, password){
        
        var res = await LoginReq(email, password)

        if(res.auth){
            setUser(res)
            setUserLocalStorage(res)
            return res
        }else{
            return res
        }
        
    }

    function logout(){
        setUserLocalStorage(null)
        setUser(null)
        socket.emit('userDisconnected', null)
        navigate("/")
    }

    return(
        <AuthContext.Provider value={{...user, authenticate, logout, ...error, setSocket}}>
            {children}
        </AuthContext.Provider>
    )

}