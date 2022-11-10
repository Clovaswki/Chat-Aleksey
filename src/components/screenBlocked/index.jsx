import { useEffect, useRef } from 'react'
import { IconButton } from '@mui/material';
import './styles.css'

//icons
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

//auth context
import ContextAuth from '../../contexts/provider/auth'

export default function ScreenBlocked(){

    const screen = useRef(null)

    const { logout } = ContextAuth()

    useEffect(() => {
        function showScreenBlocked(){
            screen.current.classList.add('showBlocked')
        }
        showScreenBlocked()
    })

    return(
        <div ref={screen} className='screenBlocked'>
            <IconButton sx={{ borderRadius: '14px', position: 'absolute', top: '5%', right: '3%'}}>
                <span className='btnBack' onClick={() => logout()}>
                    <span>
                        <ExitToAppIcon sx={{opacity: .5}}/>
                    </span>
                    <small>voltar</small>
                </span>
            </IconButton>
            <div className='logoCenter'>
                <img src="/img/chatBlocked.png" alt="chat Aleksey" />
                <p>Você foi bloqueado &#128532;</p>
            </div>
        </div>
    )

}