import { useState, useEffect } from 'react'
import './linearProgress.css'

export default function LinearProgress({data}){

    const [percent, setPercent] = useState(data.usersSentMessages)

    useEffect(() => {
        setPercent(data.usersSentMessages)
    }, [data])

    return(
        <div className='card-linearProgress_infoDashboard'>
            <div className='linearProgress_infoDashboard'>
                <span id='background_ID'></span>
                <span id='progress_ID' style={{width: percent+'%'}}></span>
            </div>
            <div className='percent_ID'>
                <small>{percent.split('.')[0]}%</small>
            </div>
        </div>
    )

}