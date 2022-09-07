import Api from '../../services/api'

export async function LoginReq(email, password){
    
    try{
        var response = await Api.post('/user/login', {
            username: email,
            password
        })

        return response.data

    }catch(err){
        return err.response.data
    }

}

export function setUserLocalStorage(user){
    localStorage.setItem('u', user ? JSON.stringify(user) : null)
}

export function getUserLocalStorage(){
    var user = localStorage.getItem('u')

    if(!user){
        return null
    }

    var userJson = JSON.parse(user)

    return userJson

}