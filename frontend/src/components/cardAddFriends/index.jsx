import { Card, Spinner } from 'react-bootstrap'
import { Close } from '@mui/icons-material/';
import { Component, useEffect, useState } from 'react';
import './styles.css'

//components
import ComponentFriend from '../componentFriend';

//Api rest server
import Api from '../../services/api'

//error handling
import { errorHandling } from '../../helpers/errorHandling';

//Contexts
//Context Auth
import ContextAuth from '../../contexts/provider/auth'
//Context chat
import { ContextChat } from '../../contexts/chat/chatContext';

export default function CardAddFriends({ }) {

    const [users, setUsers] = useState([])
    const [conversationsOfUser, setConversationsOfUser] = useState([])
    const [isLoader, setIsLoader] = useState(true)
    const [noResults, setNoResults] = useState('')
    const currentUser = ContextAuth()

    const { setActiveCardSearchFriends, allUsers, setAllUsers, conversations } = ContextChat()//provider of component chat

    //side effect get data of database
    useEffect(() => {
        async function fetchDataUsers() {
            var getData = await getUsers()
            setTimeout(() => [setUsers([...getData]), setIsLoader(false)], 500)//test
        }
        async function getConversations() {
            try {
                setConversationsOfUser([...conversations])
                /*var response = await Api.get('/chat/get-conversations/'+currentUser.id)
                setConversationsOfUser([...response.data])*/
            } catch (error) {
                errorHandling(error, 'cardAddFriends')
            }
        }
        fetchDataUsers()
        getConversations()
    }, [])

    //get users of database
    const getUsers = async () => {
        try {
            var response = await Api.get('/user/get-users')

            var usersFiltered = response.data.filter(user => user._id !== currentUser.id)

            return usersFiltered

        } catch (error) {
            errorHandling(error, 'cardAddFriends')
        }
    }


    //function search users through of a input
    const searchUser = async (search) => {

        if (search !== '') {

            //filter layer
            var all_users = allUsers.filter(user => user._id !== currentUser.id)

            var filteredUsers = all_users.filter(user => user.name.toLowerCase().includes(search))
            setUsers([...filteredUsers])

            filteredUsers.length == 0
                ? setNoResults(search)//render message "no results"
                : setNoResults('')

        } else {

            setNoResults('')

            setIsLoader(true)//show loader icon

            var getData = await getUsers()
            setUsers([...getData])

            setAllUsers([...getData])//state of all users of chat context

            setIsLoader(false)//hide loader icon
        }

    }

    return (
        <div className='cardFirst'>
            <Card className='cardSearch w-70 h-70'>
                <Card.Body className='d-flex flex-column'>
                    <div className='topCard'>
                        <Card.Title>Procure os seus amigos</Card.Title>
                        <Close className='iconClose' onClick={() => setActiveCardSearchFriends(false)} />
                    </div>
                    <div
                        className="line"
                        style={{
                            width: '100%',
                            height: '2px',
                            marginBottom: '5px',
                            backgroundImage: 'linear-gradient(to right, #B9DCE7, #1877F2)'
                        }}
                    />
                    <div className="bodyCard">
                        <div className="form-outline mb-4 mt-3">
                            <input
                                type="search"
                                className="form-control"
                                id="datatable-search-input"
                                placeholder='Procure aqui...'
                                onChange={event => searchUser(event.target.value)}
                            />
                        </div>
                        <div className="users">
                            {
                                noResults ?
                                    <div className='cardNoResults'>
                                        <div>
                                            <img src="/img/noSearch.png" alt="noResults" />
                                            <p>Sem resultados para "{noResults}"</p>
                                        </div>
                                    </div>

                                    :
                                    isLoader ?
                                        <div className='spinnerAddFriends'><Spinner animation="grow" variant="secondary" /></div>
                                        :
                                        users.length > 0 ?
                                            <ul className="usersList">
                                                {
                                                    
                                                    users.map((user, index) => (
                                                        <ComponentFriend user={user} conversationsOfUser={conversationsOfUser} key={index} />
                                                    ))
                                                  
                                                }
                                            </ul>
                                            :
                                            <div className='component-withoutUsers'>
                                                <div>
                                                    <img src="/img/withoutUsers.png" alt="users" />
                                                    <small>Nenhum usuário encontrado</small>
                                                </div>
                                            </div>
                            }
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )

}