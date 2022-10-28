import React, { useState, useEffect, useRef } from 'react'
import { Close } from '@mui/icons-material'
import { LinearProgress, Box } from '@mui/material';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import './styles.css'

//components
import ElevationCard from '../supendedCard'

//chat context
import { ContextChat } from '../../contexts/chat/chatContext'
//auth context
import ContextAuth from '../../contexts/provider/auth'

//error handling
import { errorHandling } from '../../helpers/errorHandling'

//Api
import Api from '../../services/api'

//component not exists mutual friends
const ComponentNotMutualFriends = (
    <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <img
                src="/img/notFriends.png"
                alt="notFriend"
                style={{
                    width: '60px',
                    height: '60px',
                    marginTop: '-10px'
                }}
            />
            <small style={{ marginTop: '-19px', fontFamily: 'Roboto' }}>Nenhum amigo em comum</small>
        </div>
    </div>
)

//component loader
const LoaderMutualFriends = (
    <Box sx={{ width: '85%', padding: '10px', marginBottom: '20px' }}>
        <LinearProgress />
    </Box>
)

export default function CardShowFriendProfile() {

    const [currentUser, setCurrentUser] = useState({})
    const [mutualFriends, setMutualFriends] = useState([])
    const { allUsers, setCardShowFriendProfile, cardShowFriendProfile, immutableConversations } = ContextChat()
    const me = ContextAuth()

    //load state
    const [loader, setLoader] = useState(true)

    const id = cardShowFriendProfile.id

    //get friend user
    useEffect(() => {
        async function getFriendUser() {

            var userFilter = allUsers.filter(user => user._id === id)

            if (userFilter) return setCurrentUser(...userFilter)

            try {
                var response = await Api.get('/user/get-users?id=' + id)

                setCurrentUser(response.data)

            } catch (error) {
                var componentName = 'CardShowFriendProfile'
                errorHandling(error, componentName)
            }

        }

        getFriendUser()
    }, [])

    useEffect(() => {
        async function getConversatiosOfFriendUser() {

            try {
                var response = await Api.get('/chat/get-conversations/' + id)

                var convs = response.data

                var all_users = [...allUsers.filter(user => user._id !== me.id)]

                //filter
                if (convs.length > 0) {

                    var ids_of_friend = [] //ids of friends of contact
                    var ids_of_user = [] //ids of friends of user

                    //filter: get id's of friends of contact
                    convs.forEach(conv => {

                        ids_of_friend.push(...conv.members.filter(member => member !== id))

                    })

                    //filter: get id's of friends of user
                    immutableConversations.forEach(conv => {

                        ids_of_user.push(...conv.members.filter(member => member !== me.id))

                    })

                    var users_mutual = all_users.filter(user =>
                        ids_of_friend.includes(user._id) && ids_of_user.includes(user._id)
                    )

                    setLoader(false)
                    setMutualFriends(users_mutual)

                }

                setLoader(false)

            } catch (error) {
                setLoader(false)
                var componentName = 'CardShowFriendProfile'
                errorHandling(error, componentName)
            }

        }

        getConversatiosOfFriendUser()
    }, [])

    return (
        <div className='cardShowFriendProfile'>
            <header>
                <ElevationCard border_radius={'5px'} elevation={3}>
                    <span onClick={() => setCardShowFriendProfile(false)}><Close /></span>
                    <p>Dados do contato</p>
                </ElevationCard>
            </header>
            <div className="info_friendUser">
                <ElevationCard border_radius={'5px'} elevation={3}>
                    <div className="info_card_01">
                        <img src={currentUser.picture ? currentUser.picture : '/img/noAvatar.png'} referrerpolicy="no-referrer" alt='imgUser' />
                        <div>{currentUser.name}</div>
                    </div>
                </ElevationCard>
                <ElevationCard border_radius={'5px'} elevation={3}>
                    <div className="info_card_02">
                        <div className='text_mutualFriends'>Amigos em comum</div>
                        {
                            loader ?
                                LoaderMutualFriends
                                :
                                <div className='mutual_users'>
                                    {
                                        mutualFriends.length > 0 ?
                                            <ul>
                                                {
                                                    mutualFriends.map((mutualFriend, index) => (
                                                        <li key={index}>
                                                            <img src={mutualFriend.picture ? mutualFriend.picture : '/img/noAvatar.png'} alt="mutualUser" />
                                                            <p>{mutualFriend.name}</p>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                            :
                                            ComponentNotMutualFriends
                                    }
                                </div>
                        }
                    </div>
                </ElevationCard>
                <ElevationCard border_radius={'5px'}>
                    <div className='info_card_03'>
                        <PersonPinIcon />
                        <p>{currentUser.description}</p>
                    </div>
                </ElevationCard>
            </div>
        </div>
    )

}