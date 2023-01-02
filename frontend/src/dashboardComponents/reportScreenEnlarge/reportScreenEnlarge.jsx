import { useRef, useState, useEffect } from 'react';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import { Button } from 'react-bootstrap'
import './reportScreenEnlarge.css'

import reportPDFSchema from '../../helpers/reportPDFSchema';

//dashboard context
import { ContextDashboard } from '../../contexts/dashboard/dashboardContext'

//api
import Api from '../../services/api'

export default function ReportScreenEnlarge() {

    const { setReportScreen, reportScreen } = ContextDashboard()

    return (
        <div className='background-reportScreen'>
            <span className='CloseFullScreenIcon-Report' onClick={() => setReportScreen('')}>
                <CloseFullscreenIcon />
            </span>
            <div className="reportEnlarge">
                <div className="topReportEnlarge">
                    <AssessmentIcon />
                    <small>Relatório de avaliações</small>
                </div>
                <div className="reportText">
                    <div className='reportTextCard'>
                        <p>{reportScreen}</p>
                    </div>
                </div>
                <div className='footerReportScreen'>

                    <div variant='outline-danger' className='btnPDFBackground'>
                        <img
                            src="/img/pdfRedIcon.png"
                            alt="pdfIcon"
                            style={{ width: '1.5rem', height: '1.5rem' }}
                        />
                        <div style={{ display: 'flex' }}>
                            <Button
                                variant='outline-danger'
                                className='buttonPDF'
                                name='open'
                                onClick={(event) => reportPDFSchema(event.target)}
                            >
                                Abrir
                            </Button>

                            <Button
                                variant='outline-danger'
                                className='buttonPDF'
                                name='generate'
                                onClick={(event) => reportPDFSchema(event.target)}
                            >
                                Gerar
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}