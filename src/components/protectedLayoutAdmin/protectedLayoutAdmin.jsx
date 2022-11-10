import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

//Api
import Api from '../../services/api'

//auth context
import ContextAuth from '../../contexts/provider/auth'
//router context
import { ContextRouter } from '../../contexts/router/routerContext'

export default function ProtectedLayoutAdmin({children}){

    const { pathname } = useLocation()
    const navigate = useNavigate()
    const { auth } = ContextAuth()
    const { setErrorRedirect, errorRedirect } = ContextRouter()

    //api call - check if user is a admin
    React.useEffect(() => {
        if(pathname === '/admin'){

            Api.get('/check-admin').then( response => {

                console.log(response.data.admin)

                if(!response.data.admin){
                    setErrorRedirect('Você não tem permissão')
                    return navigate('/chat')
                }

            }).catch( error => {
                
                if(!error.response.data.admin) {
                    setErrorRedirect('Você não tem permissão')
                    return navigate('/chat')
                }
                
            })

        }
    }, [])

    return children

}