import { useState, useEffect, useRef } from 'react';
import './cardSettingsUser.css'
import { IconButton } from '@mui/material';
import Switch from '@mui/material/Switch';

//icons
import CloseIcon from '@mui/icons-material/Close';
import MessageIcon from '@mui/icons-material/Message';
import FeedbackIcon from '@mui/icons-material/Feedback';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LockIcon from '@mui/icons-material/Lock';

//components
import LinearProgress from '../../linearProgress/linearProgress';

//dashboard context
import { ContextDashboard } from '../../../contexts/dashboard/dashboardContext'

//react draggable
import Draggable from 'react-draggable'

//Api
import Api from '../../../services/api'

export default function CardSettingsUser({ modalUser, setModalUser }) {

    //user
    const [user, setUser] = useState(modalUser)

    //messages number
    const [numberOfMessages, setNumberOfMessages] = useState(0)

    //evaluations number
    const [numberOfEvaluations, setNumberOfEvaluations] = useState(0)

    //refs of icons
    const iconMessage = useRef(null)
    const iconFeedback = useRef(null)

    //data of dashboard context
    const { allMessages, evaluations, allUsers, setAllUsers } = ContextDashboard()

    //options of user
    const [options, setOptions] = useState({
        admin: modalUser.admin,
        blocked: modalUser.locked
    })

    useEffect(() => {
        setUser(modalUser)
    }, [modalUser])

    useEffect(() => {
        
        //count all messages of user
        function countMessagesOfUser() {
            
            var numberMsg = 0
            
            allMessages.forEach(msg => {
                if (msg.sender === user._id) numberMsg += 1
            })
            
            iconMessage.current.dataset.content = numberMsg.toString()//pseudo class before of badge of icon
            
            setNumberOfMessages(numberMsg)
            
        }
        //count all evaluations of user
        function countEvaluationsOfUser() {

            var numberEvaluations = 0

            evaluations.forEach(e => {
                if (e.userId === user._id) numberEvaluations += 1
            })

            iconFeedback.current.dataset.content = numberEvaluations.toString()//pseudo class before of badge of icon

            setNumberOfEvaluations(numberEvaluations)

        }
        countEvaluationsOfUser()
        countMessagesOfUser()

    }, [allMessages, modalUser])

    //change blocked or admin
    async function changeOptions(option, bool){

        try {
            var response = await Api.post('/change-option', {
                userId: user._id,
                object: {
                    option,
                    bool
                }
            })

            if(response.status === 200){
                var users = allUsers.filter(u => u._id !== user._id)
                modalUser[option === 'admin' ? 'admin' : 'locked'] = bool
                setAllUsers([...users, modalUser])
            }

        } catch (error) {
            console.log(error)
        }

    }

    const label = { inputProps: { 'aria-label': 'Switch demo' } }

    return (
        <Draggable positionOffset={{ x: '-7%', y: '-50%' }}>
            <div
                className={"cardSettingsUser " + (modalUser ? "show-cardSettingsUser" : "hide-cardSettingsUser")}
            >
                <div className='header-cardSettingsUser'>
                    <span className='btnClose-cardSettingsUser'>
                        <span onClick={() => setModalUser(null)}>
                            <IconButton>
                                <CloseIcon />
                            </IconButton>
                        </span>
                    </span>
                    <div className='infoUser-cardSettingsUser'>
                        <img src={user.picture ? user.picture : "/img/noAvatar.png"} alt="user" referrerpolicy="no-referrer"/>
                        <span className='line-cardSettingsUser'></span>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                        >
                            <p>{user.name}</p>
                            <small>{user.admin ? 'admin' : 'usuário'}</small>
                        </div>
                    </div>
                </div>
                <div className="body-cardSettingsUser">
                    <div className="card-info">
                        <div className='messages-cardInfo'>
                            <span ref={iconMessage} id='iconMessage'>
                                <MessageIcon sx={{ opacity: '.7' }} />
                            </span>
                            <span id='textsMessage'>
                                <p>Mensagens</p>
                                <small>Mensagens Enviadas</small>
                            </span>
                            <span id='progressMessage'>
                                <LinearProgress progress={((numberOfMessages / allMessages.length) * 100).toString()} />
                            </span>
                        </div>
                        <div className='messages-cardInfo'>
                            <span ref={iconFeedback} id='iconMessage'>
                                <FeedbackIcon sx={{ opacity: '.7' }} />
                            </span>
                            <span id='textsMessage'>
                                <p>Avaliações</p>
                                <small>Avaliações Enviadas</small>
                            </span>
                            <span id='progressMessage'>
                                <LinearProgress progress={((numberOfEvaluations / evaluations.length) * 100).toString()} />
                            </span>
                        </div>
                    </div>
                    <div className="card-options">
                        <div className='card-switch'>
                            <span className='line-cardSettingsUser'></span>
                            <div className='optionOne'>
                                <AdminPanelSettingsIcon sx={{opacity: .7}}/>
                                <p>permissão de administrador</p>
                                <Switch 
                                    {...label} 
                                    checked={options.admin} 
                                    onChange={() =>[
                                        changeOptions('admin', !options.admin),
                                        setOptions({admin: !options.admin, blocked: options.blocked})
                                    ]}
                                />
                            </div>
                            <div className='optionTwo'>
                                <LockIcon sx={{opacity: .7}}/>
                                <p>bloquear usuário</p>
                                <Switch 
                                    {...label} 
                                    checked={options.blocked}
                                    onChange={() => [
                                        changeOptions('blocked', !options.blocked), 
                                        setOptions({blocked: !options.blocked, admin: options.admin})
                                    ]}
                                />    
                            </div>
                            <span className='line-cardSettingsUser'></span>
                        </div>
                    </div>
                </div>
            </div>
        </Draggable>
    )

}