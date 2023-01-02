import { useContext } from "react";
import { AuthContext } from './index'

const ContextAuth = () => {
    var context = useContext(AuthContext)
    return context
}

export default ContextAuth