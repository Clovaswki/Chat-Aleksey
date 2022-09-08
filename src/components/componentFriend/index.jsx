import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap'
import './styles.css'
import { PersonAdd, Check } from '@mui/icons-material';

//context current user
import ContextAuth from '../../contexts/provider/auth'
//chat context
import { ContextChat } from '../../contexts/chat/chatContext';

//Api rest
import Api from '../../services/api';

export default function ComponentFriend({ user, conversationsOfUser }) {

    const currentUser = ContextAuth()
    const { setMessageError, setConversations, conversations } = ContextChat()
    const [myFriend, setMyFriend] = useState(false)

    //format name
    const [name, setName] = useState(user.name)

    if(name.length > 9){

        var nameArray = name.split('')

        var nameFilter = nameArray.splice(0, 9)

        nameFilter = `${nameFilter.join('')}`

        setName(nameFilter)

    }
    //...

    //verify if the user is a contact
    useEffect(() => {
        async function verifyMyFriend() {
            var filterConv = conversationsOfUser.some(conv => conv.members.includes(user._id))
            setMyFriend(filterConv)
        }
        verifyMyFriend()
    }, [user])

    //post new conversation
    const newConversation = async () => {
        try {

            var NewConversation = {
                senderId: currentUser.id,
                receivedId: user._id
            }

            var response = await Api.post('/chat/new-conversation', NewConversation)

            if(response.status === 201){
                setMyFriend(true)
                setConversations([...conversations, {
                    _id: response.data._id,
                    members: [NewConversation.senderId, NewConversation.receivedId]
                }])
            }

        } catch (error) {
            if(error.response.status === 401){
                setMessageError('Sua sessão expirou!')
                setTimeout(() => document.location.reload(), 1000)//refresh
            }
            if(error.message.status === 500){
                setMessageError('Erro interno!')
            }
        }       
    }

    return (
        <li>
            <Card>
                <Card.Body className='cardBodyUser'>
                    <div className="userInfo">
                        <img src={user.picture ? user.picture : "/img/noAvatar.png"} alt="user" />
                        <div>{name}</div>
                    </div>
                    <div className="Buttons">
                        {
                            myFriend
                                ?
                            <div className="iconCheck">
                                <Check />
                            </div>
                                :
                            <div className='iconAdd' onClick={newConversation}>
                                <PersonAdd />
                            </div>
                        }
                    </div>
                </Card.Body>
            </Card>
        </li>

    )

}