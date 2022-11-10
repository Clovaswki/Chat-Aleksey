import { useState, useEffect } from 'react'
import LinearProgress from './linearProgress/linearProgress'
import './styles.css'

//dashboard context
import { ContextDashboard } from '../../contexts/dashboard/dashboardContext'

export default function InfoDashboardTest(){

    //usersData
    const [usersData, setUsersData] = useState({
        usersSentMessages: ''
    })

    const { allMessages, allUsers } = ContextDashboard()

    useEffect(() => {
        verifyAllUsersAndAllMessages()
    }, [allMessages, allUsers])

    //verify how much users sent a messages
    function verifyAllUsersAndAllMessages(){

        var usersSentMessages = 0

        allUsers.forEach( user => {
            var check = allMessages.some( msg => msg.sender === user._id) 

            check && usersSentMessages++
        })

        setUsersData({usersSentMessages: ((usersSentMessages/allUsers.length)*100).toString()})

    }

    return (
        <div className='card-infoDashboard'>
            <span className='badge-infoDashboard'>
                <p>Dados</p>
            </span>
            <div className="body-infoDashboard">
                <div className="data-users">
                    <div className="cardOne">
                        <span id='logoAndTitle'>
                            <img src="/img/usersGroup.png" alt="users"/>
                            <p>Usuários</p>
                        </span>
                        <span id='lineAndProgress'>
                            <div className='title-cardOne'>
                                Usuários que mandaram mensagem
                            </div>
                            <div className='line-cardOne'></div>
                            <div className='linearProgress-cardOne'>
                                <LinearProgress data={usersData}/>
                            </div>
                        </span>
                    </div>
                </div>  
            </div>
        </div>
    )

}