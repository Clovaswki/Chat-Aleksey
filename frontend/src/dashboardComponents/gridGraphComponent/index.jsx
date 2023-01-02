import { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './styles.css'

//components
import ElevationCard from '../../components/supendedCard'
import CardGraphLine from "../../dashboardComponents/cardGraphLine";
import CardGraphCircle from '../cardGraphCircle';
import InfoDashboard from '../infoDashboard';
import BreadcrumbAdmin from '../breadcrumbs/index'
import InfoDashboardTest from '../infoDashboardTest';

//icons
import PieChartIcon from '@mui/icons-material/PieChart';
import RateReviewIcon from '@mui/icons-material/RateReview'

//dashboard context
import { ContextDashboard } from '../../contexts/dashboard/dashboardContext';

//auth context
import ContextAuth from '../../contexts/provider/auth';

export default function GridGraphComponent() {

    const { evaluationsGraphCircle, evaluationsGraphLine, allUsers, evaluations } = ContextDashboard()
    const { name, picture, logout } = ContextAuth()

    //correct number of reviews
    const [correctNumberEvaluations, setCorrectNumberEvaluations] = useState(0)

    const navigate = useNavigate()

    useEffect(() => {
        countEvaluationsByUser()
    }, [evaluations])

    //count number of users who rated
    function countEvaluationsByUser() {

        var correctNumber = []

        evaluations.forEach(evaluation => {

            if (!correctNumber.includes(evaluation.userId)) {

                correctNumber.push(evaluation.userId)

            }

        })

        setCorrectNumberEvaluations(correctNumber.length)

    }

    //data of circle graphs
    const cardsGraphsCircle = [
        {
            iconBadge: <PieChartIcon sx={{ color: '#ffff' }} fontSize='large' />,
            background: 'lightblue',
            headTitle: 'Preferência',
            value: `${evaluationsGraphCircle.like}/${evaluations.length}`,
            stringOfValue: 'de usuários estão gostando',
            iconValue: '/img/like.png',
            like: evaluationsGraphCircle.like,
            total: evaluations.length
        },
        {
            iconBadge: <RateReviewIcon sx={{ color: '#ffff' }} fontSize='large' />,
            background: 'lightgreen',
            headTitle: 'Feedbacks',
            value: `${correctNumberEvaluations}/${allUsers.length}`,
            stringOfValue: 'de feedbacks no sistema',
            iconValue: '/img/feedback.png',
            like: correctNumberEvaluations,
            total: allUsers.length
        }
    ]

    return (
        <div className="dashboardCard" >
            <div className='header-dashboardCard'>
                <BreadcrumbAdmin>
                    {{
                        component: 'Dashboard'
                    }}
                </BreadcrumbAdmin>
                <div className='welcome-headerDashboard'>
                    <img src="/img/handshake.png" alt="welcome" />
                    <small>Bem vindo, Mr {name}</small>
                </div>
                <div className='infoUser-headerDashboard'>
                    <span id='infoUser-header'>
                        <img src={picture ? picture : '/img/noAvatar.png'} alt="user" />
                        <div>
                            <p>{name}</p>
                            <small>Admin</small>
                        </div>
                    </span>
                    <span id='btn-headerDashboard' onClick={() => [logout(), navigate('/')]}>
                        <IconButton>
                            <img src="/img/quit.png" alt="quit" />
                        </IconButton>
                    </span>
                </div>
            </div>
            <div className="bodyDashboard">
                {
                    evaluationsGraphCircle === '' && evaluationsGraphLine === '' ?
                        <div className='noEvaluations'>
                            <ElevationCard height={'100%'} border_radius={'5px'}>
                                <div className='noEvaluations-inside'>
                                    <div>
                                        <img
                                            src="/img/evaluationIcon.png"
                                            alt="evaluationIcon"
                                            style={{
                                                width: '100px',
                                                height: '100px'
                                            }}
                                        />
                                        <p>Nenhuma avaliação no sistema</p>
                                    </div>
                                </div>
                            </ElevationCard>
                        </div>
                        :
                        <div className="graphs">
                            <div className="graphsGroupOne">

                                {/* reformando */}
                                {
                                    cardsGraphsCircle.map((card, index) => (
                                        <CardGraphCircle key={index}>
                                            {
                                                card
                                            }
                                        </CardGraphCircle>
                                    ))
                                }

                            </div>
                            <div className="graphsGroupTwo">
                                <CardGraphLine evaluationsGraphLine={evaluationsGraphLine} />
                            </div>
                        </div>
                }
                <div className="infoDashboard">
                    <div style={{ flex: 1 }}>
                        <InfoDashboardTest />
                    </div>
                </div>
            </div>
        </div>

    )

}