import Api from '../../services/api'

export async function LoginReq(email, password){//authentication local
    
    try{
        var response = await Api.post('/user/login', {
            username: email,
            password,
            oauth: false
        })

        return response.data

    }catch(err){
        return err.response.data
    }

}

export async function LoginReqGoogle(authWithGoogle, email){//authenticate with google api: oauth method

    try{
        var response = await Api.post('/user/login', {
            authWithGoogle,
            oauth: true,
            email
        })

        return response

    }catch(error){
        console.log(error)
        return error.response
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