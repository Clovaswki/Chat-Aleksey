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

//error handling
import { errorHandling } from '../../helpers/errorHandling';

export default function ComponentFriend({ user, conversationsOfUser }) {

    const currentUser = ContextAuth()
    const { 
        setMessageError, 
        setConversations, 
        conversations, 
        setImmutableConversations,
        immutableConversations 
    } = ContextChat()
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
             
                //payload of new conversation
                var payload = {
                    _id: response.data._id,
                    members: [NewConversation.senderId, NewConversation.receivedId]
                }

                if(conversations.includes('none')){
                     //if there are no conversations
                        setConversations([payload])
                        setImmutableConversations([payload])
                }else{
                    //if there are conversations
                       setConversations([...conversations, payload])
                       setImmutableConversations([...immutableConversations, payload])
                }
            }

        } catch (error) {
            errorHandling(error, 'componentFriend')
        }       
    }

    return (
        <li>
            <Card>
                <Card.Body className='cardBodyUser'>
                    <div className="userInfo">
                        <img src={user.picture ? user.picture : "/img/noAvatar.png"} alt="user" referrerpolicy="no-referrer" />
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