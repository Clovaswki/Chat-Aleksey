import { useEffect, useState, useRef } from 'react';
import { IconButton, CircularProgress } from '@mui/material'
import { Form } from 'react-bootstrap'
import './styles.css'

//icons
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import CachedIcon from '@mui/icons-material/Cached';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

//components
import Graphs from './graph/graph'
import BasicSelect from './selectInput'
import RowTableUsers from './rowTableUsers/rowTableUsers';
import BreadcrumbsAdmin from '../breadcrumbs';

//Api
import Api from '../../services/api'

//dashboard context
import { ContextDashboard } from '../../contexts/dashboard/dashboardContext';
import CardSettingsUser from './cardSettingsUser/cardSettingsUser';


//screen load
const screenLoad = (
    <div style={{
        height: '10%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
        padding: '20px'
    }}
    >
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',flexDirection: 'column'}}>
            <PeopleAltIcon color='primary' fontSize='large'/>
            {/* <Box sx={{ display: 'flex' }}> */}
                <CircularProgress />
            {/* </Box> */}
        </div>
    </div>
)


export default function UsersComponent() {

    //all users of system
    const [allUsers, setAllUsers] = useState([])
    
    //all users of system - backup data
    const [dataUsers, setDataUsers] = useState([])

    const [usersOnline, setUsersOnline] = useState([])
    const { socket } = ContextDashboard()
    const btnRefresh = useRef(null)
    const [isLoad, setIsLoad] = useState(true)
    const [rotateIcon, setRotateIcon] = useState(false)
    const cardUsers = useRef(null)

    //collapsed modal with data of user
    const [modalUser, setModalUser] = useState(null)

    //get users online
    useEffect(() => {

        socket.current.on('getUsers', users => {

            setUsersOnline([...users])

        })

    }, [socket])

    //scroll
    useEffect(() => {

        cardUsers.current.scrollTo({ top: 1000 })

    }, [modalUser])

    useEffect(() => {

        getAllUsers()

    }, [])

    //get all users
    async function getAllUsers() {
        setIsLoad(true)
        try {
            var response = await Api.get('/user/get-users')

            if (response.data.length > 0) {
                setIsLoad(false)
                setDataUsers([...response.data])
                setAllUsers([...response.data])
            }

            setIsLoad(false)

        } catch (error) {
            setIsLoad(false)
            console.log(error)
        }

    }

    //animation btn refresh
    const rotateBtnRefresh = () => {
        var rotates = ['rotate(-360deg)', 'rotate(360deg)']

        btnRefresh.current.style.transform = rotateIcon? rotates[0] : rotates[1]
    } 

    //search users by input
    function searchUser(search){

        if(search){
            var usersFiltered = dataUsers.filter( user => 
                user.name.toLowerCase().includes(search.toLowerCase()) 
                || user.email.toLowerCase().includes(search.toLowerCase())
            )

            setAllUsers([...usersFiltered])
        }else{
            setAllUsers([...dataUsers])
        }


    }
    

    return (
        <div ref={cardUsers} className='cardUsers'>

            {
                modalUser &&
                    <CardSettingsUser 
                        setModalUser={setModalUser}
                        modalUser={modalUser}
                    /> 
            }
            
            <BreadcrumbsAdmin>
                {
                    {
                        component: 'Usuários'
                    }
                }
            </BreadcrumbsAdmin>
            
            <div className="bodyUsersAdmin">

                <Graphs/>
  
                <div className='allUsers-admin'>
                    <span className='badgeAllusers'>
                        Todos os usuários
                    </span>
                    <div className='cardFirst-allUsers'>
                        <div className="topAllUsers" style={{ marginTop: '30px' }}>
                            <div className='inputSearchUsers'>
                                <span className='iconSearchUsers'>
                                    <PersonSearchIcon fontSize='large' color='primary' />
                                </span>
                                <Form className="d-flex p-3">
                                    <Form.Control
                                        type="search"
                                        placeholder="Ache os seus amigos..."
                                        className="me-2"
                                        aria-label="Search"
                                        style={{ height: '45px', width: '300px' }}
                                        onChange={event => searchUser(event.target.value)}
                                    />
                                </Form>
                            </div>
                            <BasicSelect width={'200px'} 
                                dataUsers={dataUsers}
                                setAllUsers={setAllUsers}
                            />
                            <BasicSelect width={'200px'} 
                                dataUsers={dataUsers}
                                setAllUsers={setAllUsers}
                            />
                            <span
                                ref={btnRefresh}
                                style={{transition: '1s'}}
                                onClick={() => [
                                    rotateBtnRefresh(), 
                                    getAllUsers(), 
                                    setRotateIcon(rotateIcon ? false : true)]
                                }
                            >
                                <IconButton aria-label="refresh">
                                    <CachedIcon />
                                </IconButton>
                            </span>
                        </div>
                        <div className='tableAllUsers'>
                            <div className='topTableAllUsers'>
                                <span className='titleColumsTableAllUsers' style={{ width: '20%' }}>
                                    <p>USUÁRIOS</p>
                                </span>
                                <span className='titleColumsTableAllUsers'>
                                    <p>STATUS</p>
                                </span>
                                <span className='titleColumsTableAllUsers'>
                                    <p>CRIACÃO</p>
                                </span>
                                <span className='titleColumsTableAllUsers'>
                                    <p>BLOQUEIO</p>
                                </span>
                                <span className='titleColumsTableAllUsers'>
                                    <p>EDITAR</p>
                                </span>
                            </div>

                            {
                                isLoad ?
                                    screenLoad
                                    :
                                    allUsers.map((user, index) => (
                                        <RowTableUsers 
                                            key={index} 
                                            user={user} 
                                            usersOnline={usersOnline} 
                                            setModalUser={setModalUser}
                                        />
                                    ))
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}