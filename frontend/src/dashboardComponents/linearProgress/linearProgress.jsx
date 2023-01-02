import './linearProgress.css'

export default function LinearProgress({progress}) {

    return (
        <div style={{display: 'flex', gap: '7px', alignItems: 'center'}}>
            <div className='card-progress'>
                <span className='linearProgress-background'></span>
                <span className='linearProgress' style={{width: progress+'%'}}></span>
            </div>
            <div className='percent-linearProgress'>
                <small>{progress.split('.')[0]}%</small>
            </div>
        </div>
    )

}