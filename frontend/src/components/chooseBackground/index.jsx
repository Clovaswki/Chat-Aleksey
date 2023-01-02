import Draggable from 'react-draggable'
import { IconButton } from '@mui/material';
import './styles.css'

//icons
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

//components
import Slideshow from './slideshow/slideshow';

//chat context
import { ContextChat } from '../../contexts/chat/chatContext';

export default function ChooseBackground() {

    const { setModalChangeBackground } = ContextChat()

    return (
        <Draggable positionOffset={{x: '30%', y: '10%'}}>
            <div className='card-chooseBackground'>
                <header>
                    <WallpaperIcon sx={{ opacity: .5 }} fontSize='large' />
                    <p>Escolha um papel de parede</p>
                    <div className='threeCircles'>
                        <span id='one'></span>
                        <span id='two'></span>
                        <span id='three'></span>
                    </div>
                </header>
                <div className='lineDivider'></div>
                <div className='body-chooseBackground'>
                    <Slideshow/>
                </div>
                <div className='lineDivider'></div>
                <div>

                    <IconButton sx={{ 
                        display: 'flex', 
                        borderRadius: '0',
                        borderBottomLeftRadius: '14px', 
                        padding: '2px', 
                        height: '40px' 
                        }}
                    >
                        <span style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                padding: '10px', 
                                gap: '5px' 
                            }}
                            onClick={() => setModalChangeBackground(false)}
                        >
                            <ExitToAppIcon sx={{ transform: 'rotate(180deg)' }} />
                            <p className='text-btnBack'>voltar</p>
                        </span>
                    </IconButton>
                </div>
            </div>
        </Draggable>
    )

}