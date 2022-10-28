import { useEffect, useState, useRef} from 'react';
import NoLikeIcon from '@mui/icons-material/ThumbDownAlt';
import LikeIcon from '@mui/icons-material/ThumbUpAlt';
import ChevronIcon from '@mui/icons-material/ChevronLeft';
import { Badge } from '@mui/material';
import {ToggleButton} from '@mui/material';
import './userEvaluationCard.css'

//format date
    import { format, register } from 'timeago.js'
    //function locale string pt_BR
        import { locale } from '../../helpers/localeStringTimeAgo'

//components
import ElevationCard from "../../components/supendedCard";

//dashboard context
import { ContextDashboard } from '../../contexts/dashboard/dashboardContext';

//add styles css
import styles from '../../helpers/styles'

export default function UserEvaluationCard({ evaluation }) {

    const { allUsers } = ContextDashboard()
    const [currentUser, setCurrentUser] = useState(allUsers.filter(user => user._id === evaluation.userId)[0])
    
    useEffect(() => {
        setCurrentUser(allUsers.filter(user => user._id === evaluation.userId)[0])
    }, [evaluation])

    //toggle comments
    var bodyEvaluations = useRef(null)
    var btnToggle = useRef(null)

    //format date of createdAt
    register('pt_BR', locale)

    //toggle comments
    const toggleComments = () => [bodyEvaluations.current.classList.toggle('showComments'), 
    btnToggle.current.classList.toggle('showChevronIcon')]

    return (
        <li>

            <section style={{
                boxShadow: '1px 1px 7px rgba(0,0,0, .2)',
                borderRadius: '5px',
                padding: '10px'
            }}>

                <div className='inside-userEvaluation'>
                    <div className="top-userEvaluation">
                        <div className='nameAndPicture-userEvaluation'>
                            <img
                                src={currentUser.picture ? currentUser.picture : '/img/noAvatar.png'}
                            />
                            <span>{currentUser.name}</span>
                        </div>
                        <span>
                            <Badge
                                badgeContent={evaluation.evaluationsOfUser.length}
                                color='primary'
                            />
                        </span>
                        <span>{format(evaluation.recentDate, 'pt_BR')}</span>
                        <span ref={btnToggle} className='chevronIcon' onClick={() => toggleComments()}>
                           <ToggleButton sx={{border: 0, borderRadius: '50%'}}>
                                <ChevronIcon/>
                           </ToggleButton>
                        </span>
                    </div>
                    <div ref={bodyEvaluations} className="body-userEvaluation">
                        <section>
                            {
                                evaluation.evaluationsOfUser.reverse().map( e => (
                                    <div 
                                        style={e.questionOneLikeOrNot ? 
                                            {backgroundColor: '#6eec6e67'}
                                            :
                                            {backgroundColor: '#d653538f'}
                                        }
                                    >
                                        <span style={{padding: '10px'}}>
                                            {e.questionOneLikeOrNot ? <LikeIcon/> : <NoLikeIcon/>}
                                        </span>
                                        <span className='comment-userEvaluation'>
                                            <p>{e.content}</p>
                                            <small>{format(e.createdAt, 'pt_BR')}</small>
                                        </span>
                                    </div>
                                ))
                            }
                        </section>
                        
                    </div>
                </div>

            </section>

        </li>
    )

}
