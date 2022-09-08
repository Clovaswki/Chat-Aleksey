import axios from 'axios'
import { getUserLocalStorage } from '../contexts/provider/utils'

const user = getUserLocalStorage()

const Api = axios.create({
    //baseURL: 'http://localhost:3001'
    baseURL: 'https://api-chat-aleksey.herokuapp.com'//heroku
})

Api.interceptors.request.use(
    function(config){
        config.headers.tokenaccess = user ? user.token : null
        return config
    },
    function(err){
        return Promise.reject(err)
    }
)

export default Api