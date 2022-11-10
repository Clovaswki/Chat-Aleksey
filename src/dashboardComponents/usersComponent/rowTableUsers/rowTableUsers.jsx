import { useEffect, useState } from 'react'
import IconButton from '@mui/material/IconButton';
import './rowTableUsers.css'

//icons
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';

//helpers
import { formatDate } from '../../../helpers/formatDate';

//dashboard context
import { ContextDashboard } from '../../../contexts/dashboard/dashboardContext'

//Api
import Api from '../../../services/api'

export default function RowTableUsers({user, usersOnline, setModalUser}) {

    const [isOnline, setIsOnline] = useState(false)  

    //data of user
    const [dataUser, setDataUser] = useState(user)

    const [date, setDate] = useState('')

    //data of dashboard context
    const { allUsers, setAllUsers } = ContextDashboard()

    //check if user it's online
    useEffect(() => {

        function checkUserOnline(){

            usersOnline.forEach( ({userId}) => {

                userId === user._id 
                ? setIsOnline(true)
                : setIsOnline(false)

            })

        }
        checkUserOnline()

        
    }, [usersOnline])
    
    useEffect(() => {
        setDataUser(user)
        //format date
        setDate(formatDate(user.createdAt))
    }, [user])

    //change state blocked 
    async function changeBlocked(bool){

        user['locked'] = bool
        
        try {    
            
            var response = await Api.post('/change-option', {
                userId: user._id,
                object: {
                    option: 'blocked',
                    bool
                }
            })

            if(response.status === 200){
                var users = allUsers.filter(u => u._id !== user._id)
                setAllUsers([...users, user])
            }

        } catch (error) {
            console.log(error)
        }

    }


    return (
        <div className='rowTableAllUsers'>
            <span style={{width: '20%'}} className='columnNameAndPicture'>
                <img 
                    src={user.picture ? user.picture : "/img/noAvatar.png"} 
                    alt="user"
                    referrerpolicy="no-referrer"
                />
                <div id='infoUser'>
                    <p>{user.name}</p>
                    <small>{user.email}</small>
                </div>
            </span>
            <span className='columnStatus'>
                {
                    isOnline ?
                        <div className='iconStatusUser' style={{backgroundColor: '#4DA751'}}>
                            <p>ONLINE</p>
                        </div>
                        :
                        <div className='iconStatusUser' style={{backgroundColor: '#58616F'}}>
                            <p>OFFLINE</p>
                        </div>
                }
            </span>
            <span className='columnDateCreated'>
                <p>
                    {date}
                </p>
            </span>
            <span onClick={() => changeBlocked(!user.locked)}>
                <IconButton>
                    {
                        user.locked ?
                            <LockIcon/>
                            :
                            <LockOpenIcon/>
                    }
                </IconButton>
            </span>
            <span className='columnBtnEdit'>
                <a href='#' onClick={() => setModalUser(dataUser)}>Editar</a>
            </span>
        </div>
    )

}