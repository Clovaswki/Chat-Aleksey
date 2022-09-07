import './styles.css'
import { Card } from 'react-bootstrap'

export default function CardImage({img}){

    return(
        <Card className='mt-3 mb-3 align-center'>
            <Card.Body className='d-flex' style={{justifyContent: 'center'}}>
                <img 
                    src={img ? img : "/img/noAvatar.png"} 
                    style={{
                        width: '170px', 
                        height: '170px', 
                        borderRadius: '50%', 
                        objectFit: 'cover'
                    }} 
                    alt="userImg"
                />
            </Card.Body>
        </Card>
    )

}