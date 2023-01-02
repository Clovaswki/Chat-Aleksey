import { getUserLocalStorage, setUserLocalStorage } from '../contexts/provider/utils'

export function insertDescriptionLocalStorage(description){

    var user = getUserLocalStorage()

    user.description = description

    setUserLocalStorage(user)
}
