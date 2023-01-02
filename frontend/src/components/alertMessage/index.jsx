import { Alert } from 'react-bootstrap'
import './styles.css'

export default function AlertMessage({ alert }) {

    const srcCondition = alert.errorStatus ? '/img/alert.png' : '/img/success.png'
    const variantCondition = alert.errorStatus ? 'danger' : 'success'
    const loadingCondition = alert.errorStatus ? 'loading-msg failed' : 'loading-msg success'

    const styles = {
        height: '60px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    }

    return (
        alert?.oauth ?
            <div className="alert" style={{ boxShadow: '1px 1px 7px rgba(0, 0, 0, .3)' }}>
                <Alert variant={'light'} style={styles}>
                    <div className='content-msg-alert' style={{gap: '10px'}}>
                        <img id='messageIconAlertGoogle' src="/img/google.png" alt="Icon" className='m-0' />
                        <p className='m-0'>{alert.message}</p>
                    </div>
                    <div className={'loading-msg-google'}></div>
                </Alert>
            </div>
            :
            <div className="alert">
                <Alert variant={variantCondition} style={styles}>
                    <div className='content-msg-alert'>
                        <img id='messageIconAlert' src={srcCondition} alt="Icon" className='m-0' />
                        <p className='m-0'>{alert.message}</p>
                    </div>
                    <div className={loadingCondition}></div>
                </Alert>
            </div>

    )

}