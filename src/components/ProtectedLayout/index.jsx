import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ContextAuth from "../../contexts/provider/auth";
import { ContextRouter } from "../../contexts/router/routerContext";

const ProtectedLayout = ({children}) => {

    const currentUser = ContextAuth()
    const { setErrorRedirect } = ContextRouter()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if(location.pathname === '/chat'){
            //redirect to page login if authentication does not exist
            if(!currentUser.auth) {
                setErrorRedirect('Faça o seu login primeiro')    
                return navigate('/') 
            }   
        }else if(location.pathname === '/'){
            //redirect to page chat if authentication exist
            if(currentUser?.auth) {
                return navigate('/chat') 
            }   
        }else if(location.pathname === '/admin'){

            //redirect to page login if authentication does not exist
            if(!currentUser?.auth) return navigate('/')

        }
    }, [currentUser])

    return children

}

export default ProtectedLayout