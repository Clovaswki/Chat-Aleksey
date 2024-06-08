import axios from 'axios'
import { getUserLocalStorage } from '../contexts/provider/utils'

const user = getUserLocalStorage()

const Api = axios.create({
    baseURL: process.env.API_URL
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
