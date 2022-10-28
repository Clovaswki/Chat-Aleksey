import { useEffect, useState } from 'react'
import './styles.css'

//components
import SearchTopDashboard from '../searchTopDashboard'
import ElevationCard from '../../components/supendedCard'
import UserEvaluationCard from '../userEvaluationCard'

//dashboard context
import { ContextDashboard } from '../../contexts/dashboard/dashboardContext'

//component no results for search
const NoSearchComponent = (
    <section style={{
        display: 'flex', 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh'
        }}
    >
        <div style={{
            display: 'flex', 
            justifyContent: 'center', 
            flexDirection: 'column', 
            alignItems: 'center',
            gap: '20px'
            }}
        >
            <img 
                src="/img/noSearch.png" 
                alt="noSearch" 
                style={{
                    width: '80px',
                    height: '80px'
                }}
            />
            <p style={{fontFamily: 'Roboto'}}>Sem resultados para a pesquisa</p>
        </div>
    </section>
)

export default function EvaluationComponent() {

    const { evaluations } = ContextDashboard()//data context dashboard
    const [allEvaluations, setAllEvaluations] = useState([])
    const [dataEvaluations, setDataEvaluations] = useState([])//evaluations persistent data
    const [noSearch, setNoSearch] = useState(false)//without results for search

    //filter evaluations in radios inputs
    const [chooseFilter, setChooseFilter] = useState('old')

    useEffect(() => {

        filterEvaluations()

    }, [chooseFilter])

    //filter all evaluation by user
    function filterEvaluations() {

        var evaluationsFiltered = []
     
        evaluations.forEach(({ userId }) => {

            if (evaluationsFiltered.every(e => e.userId !== userId) || evaluationsFiltered.length == 0) {

                var evaluationsByUser = evaluations.filter(e => e.userId === userId)

                evaluationsFiltered.push({
                    userId: userId,
                    evaluationsOfUser: [...evaluationsByUser],
                    recentDate: evaluationsByUser[evaluationsByUser.length-1].createdAt//under construction
                })

            }

        })

        //filter most recent evaluations
        if(chooseFilter === 'recent'){
            evaluationsFiltered = evaluationsFiltered.reverse()
        }

        setDataEvaluations([...evaluationsFiltered])

        setAllEvaluations([...evaluationsFiltered])

    }

    return (
        <div className="evaluation-card">
            <div className="evaluationsBody">
                <div>
                    <ElevationCard border_radius={'5px'}>
                        <SearchTopDashboard 
                            setChooseFilter={setChooseFilter} 
                            chooseFilter={chooseFilter} 
                            setAllEvaluations={setAllEvaluations}
                            dataEvaluations={dataEvaluations}
                            setNoSearch={setNoSearch}
                        />
                    </ElevationCard>
                </div>
                <div className="evaluationsMessages">
                    {
                        noSearch ?
                            NoSearchComponent
                            :
                            <ul>
                                {
                                    allEvaluations.map((evaluation, index) => (
                                        <UserEvaluationCard key={index} evaluation={evaluation} />
                                    ))
                                }
                            </ul>
                    }
                </div>
            </div>
        </div>
    )

}