import React, { useEffect, useState } from 'react'
import './graph.css'

//icons
import GroupIcon from '@mui/icons-material/Group';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LockIcon from '@mui/icons-material/Lock';

//dshboard context
import { ContextDashboard } from '../../../contexts/dashboard/dashboardContext';

//function helpers date
import { checkSameWeek } from '../../../helpers/formatDate';

export default function Graph() {

    const { allUsers } = ContextDashboard()
    const [numberUsersWeek, setNumberUsersWeek] = useState({
        all: 0,
        admin: 0, 
        blocked: 0
    })

    useEffect(() => {

        //check if user is created in this week
        function countUsersWeek(){
            var numberAll = 0,
                numberAdmin = 0,
                numberBlocked = 0

            allUsers.forEach( user => {
                checkSameWeek(user.createdAt) && numberAll++
                checkSameWeek(user.createdAt) && user.admin && numberAdmin++
                checkSameWeek(user.createdAt) && user.locked && numberBlocked++
            })

            var formatAll = ((numberAll/allUsers.length)*100).toString().split('.')[0]
            var formatAdmin = ((numberAdmin/allUsers.length)*100).toString().split('.')[0]
            var formatBlocked = ((numberBlocked/allUsers.length)*100).toString().split('.')[0]

            setNumberUsersWeek({
                all: formatAll,
                admin: formatAdmin,
                blocked: formatBlocked
            })

        }
        countUsersWeek()

    }, [allUsers])

    return (
        <div className='cardGraphs-users'>
            <div className='graphOne-users'>
                <span className='badgeGraph'>
                    <GroupIcon sx={{ color: '#fff' }} fontSize='large' />
                </span>
                <div className='bodyGraph'>
                    <div className='insideGraph-partOne'>
                        <span>
                            <small>Número de usuários</small>
                            <h4>{allUsers.length}</h4>
                        </span>
                    </div>
                    <span className='divider-insideGraph'></span>
                    <div className='insideGraph-partTwo'>
                        <span>
                            <h4>+{numberUsersWeek.all}%</h4>
                            <small>esta semana</small>
                        </span>
                    </div>
                </div>
            </div>
            <div className='graphTwo-users'>
                <span className='badgeGraph'>
                    <AdminPanelSettingsIcon sx={{ color: '#fff' }} fontSize='large' />
                </span>
                <div className='bodyGraph'>
                    <div className='insideGraph-partOne'>
                        <span>
                            <small>Administradores</small>
                            <h4>{allUsers.filter( user => user.admin).length}</h4>
                        </span>
                    </div>
                    <span className='divider-insideGraph'></span>
                    <div className='insideGraph-partTwo'>
                        <span>
                            <h4>+{numberUsersWeek.admin}%</h4>
                            <small>esta semana</small>
                        </span>
                    </div>
                </div>
            </div>
            <div className='graphThree-users'>
                <span className='badgeGraph'>
                    <LockIcon sx={{ color: '#fff' }} fontSize='large' />
                </span>
                <div className='bodyGraph'>
                    <div className='insideGraph-partOne'>
                        <span>
                            <small>Usuários bloqueados</small>
                            <h4>{allUsers.filter( user => user.locked).length}</h4>
                        </span>
                    </div>
                    <span className='divider-insideGraph'></span>
                    <div className='insideGraph-partTwo'>
                        <span>
                            <h4>+{numberUsersWeek.blocked}%</h4>
                            <small>esta semana</small>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )

}