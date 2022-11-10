import { useEffect, useState } from 'react'
import { Card, ListGroup } from 'react-bootstrap';
import './styles.css'

//icons
import AssessmentIcon from '@mui/icons-material/Assessment';
import FitScreenIcon from '@mui/icons-material/FitScreen';

//components
import ElevationCard from '../../components/supendedCard'

//auth context
import ContextAuth from '../../contexts/provider/auth'
//dashboard context
import { ContextDashboard } from '../../contexts/dashboard/dashboardContext'

//function evaluations report
import { evaluationsReport } from './evaluationsReport';

export default function InfoDashboard() {

    //user data
    const { picture, name } = ContextAuth()

    //evaluations data
    const { evaluationsGraphCircle, evaluationsGraphLine, setReportScreen } = ContextDashboard()

    const [nameFormat, setNameFormat] = useState('')//name formating state
    const [reportFormat, setReportFormat] = useState('')//report formating state

    const [report, setReport] = useState('')

    useEffect(() => {
        //formating evaluations data for create a report
        evaluationsReport(evaluationsGraphCircle, evaluationsGraphLine, setReport)
        //formating name of admin authenticated 
        formatDataOfUser()
    }, [])

    //name formating
    function formatDataOfUser() {

        if (name.includes(' ')) {
            var nameFormating = name.split(' ')[0]
            setNameFormat(nameFormating)
            console.log('clodo')
        } else {
            setNameFormat(name)
        }

    }

    //report formating
    useEffect(() => {
        function formatReport(){
    
            var format_report = ''
    
            for(var letter of report){
                if(format_report.length < 353){
                    format_report += letter
                }
            }
    
            setReportFormat(format_report+'...')
    
        }
        formatReport()
    }, [report])


    return (
        <ElevationCard height={'100%'}>
            <div className="inside-infoDashboard">
                <div className="topInfoDashboard">
                    <img src={picture ? picture : '/img/adminIcon.png'} referrerpolicy="no-referrer" alt="admin" />
                    <span className='textsTopInfoDashboard'>
                        <p>{nameFormat}</p>
                        <span></span>
                    </span>
                </div>
                <div className='lineInfodashboard'></div>
                <div className="body-infoDashboard">
                    <div className="welcome-infoDashboard">
                        <span>
                            Bem-vindo de volta {nameFormat}
                        </span>
                    </div>
                    <div className='lineInfodashboard'></div>
                    <div className="info1-infodashboard">
                        <ElevationCard border_radius={'3px'} elevation={3}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span className='top-info1' style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                        <AssessmentIcon />
                                        <small>Relatório de avaliações</small>
                                    </div>
                                    <span className='iconFitScreen-infoDashboard' onClick={() => setReportScreen(report)}>
                                        <FitScreenIcon />
                                    </span>
                                </span>
                                <span className='report-infoDashboard' style={{ display: 'flex' }}>
                                    <div id='reportText'>
                                        {reportFormat}
                                    </div>
                                </span>
                            </div>
                        </ElevationCard>
                    </div>
                </div>
            </div>
        </ElevationCard>
    )
}
