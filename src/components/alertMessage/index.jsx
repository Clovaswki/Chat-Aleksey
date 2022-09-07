import { Alert } from 'react-bootstrap'
import './styles.css'

export default function AlertMessage({alert}){

    const srcCondition = alert.errorStatus?'/img/alert.png':'/img/success.png'
    const variantCondition = alert.errorStatus ? 'danger' : 'success'

    return(
        <div className="alert">
            <Alert variant={variantCondition} className='d-flex gap-3 p-3' style={{height: '60px', alignItems: 'center'}}>
                <img id='messageIconAlert' src={srcCondition} alt="Icon" className='m-0'/>
                <p className='m-0'>{alert.message}</p>
            </Alert>
        </div>
    )

}