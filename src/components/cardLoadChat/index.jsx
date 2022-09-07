import LinearProgress from '@mui/material/LinearProgress';
import './styles.css'

export default function LoadChat() {

    return (
        <div className='loadChat'>
            <div className='imgsChatIcon'>
                <img id='img1' src="/img/chatIcon.png" />
                <img id='img2' src="/img/chatIcon.png" />
            </div>
            <div>
                <p>carregando os seus dados...</p>
                <LinearProgress />
            </div>
        </div>
    )

}