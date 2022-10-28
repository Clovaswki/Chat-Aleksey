import './styles.css'

//components
import ElevationCard from '../../components/supendedCard'
import GraphLine from "../../dashboardComponents/graphLine";
import GraphCircle from "../../dashboardComponents/graphCircle";

//dashboard context
import { ContextDashboard } from '../../contexts/dashboard/dashboardContext';
import InfoDashboard from '../infoDashboard';
import { useEffect } from 'react';
import { useState } from 'react';

export default function GridGraphComponent() {

    const { evaluationsGraphCircle, evaluationsGraphLine, allUsers, evaluations } = ContextDashboard()

    //correct number of reviews
    const [correctNumberEvaluations, setCorrectNumberEvaluations] = useState(0)

    useEffect(() => {
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
        countEvaluationsByUser()
    }, [evaluations, allUsers])

    return (
        <div className="dashboardCard">
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
                                <div className="card1">
                                    <ElevationCard height={'100%'} border_radius={'5px'}>
                                        <div className="graphy1">
                                            <GraphCircle background={'brown'}>
                                                {
                                                    {
                                                        yes: evaluationsGraphCircle.like,
                                                        total: evaluationsGraphCircle.totalUsers
                                                    }
                                                }
                                            </GraphCircle>
                                            <div className="legendGraphy1">
                                                <small>
                                                    Preferência
                                                </small>
                                                <span>
                                                    <img src="/img/like.png" alt="likeIcon" />
                                                    <p>{evaluationsGraphCircle.like}/{evaluations.length}</p>
                                                </span>
                                            </div>
                                        </div>
                                    </ElevationCard>
                                </div>
                                <div className="card2">
                                    <ElevationCard height={'100%'} border_radius={'5px'}>
                                        <div className="graphy2">
                                            <GraphCircle background={'lightgreen'}>
                                                {
                                                    {
                                                        yes: correctNumberEvaluations,
                                                        total: allUsers.length
                                                    }
                                                }
                                            </GraphCircle>
                                            <div className="legendGraphy2">
                                                <small>
                                                    Feedbacks
                                                </small>
                                                <span>
                                                    <img src="/img/users.png" alt="likeIcon" />
                                                    <p>{correctNumberEvaluations}/{allUsers.length}</p>
                                                </span>
                                            </div>
                                        </div>
                                    </ElevationCard>
                                </div>
                            </div>
                            <div className="graphsGroupTwo">
                                <GraphLine evaluationsGraphLine={evaluationsGraphLine} />
                            </div>
                        </div>
                }
                <div className="infoDashboard">
                    <div style={{ flex: 1 }}>
                        <InfoDashboard />
                    </div>
                </div>
            </div>
        </div>

    )

}