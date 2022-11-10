import { useRef, useState, useEffect } from 'react';
import './slideshow.css'
import { IconButton } from '@mui/material';

//icons
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { applyBackground } from '../../../helpers/backgrounds'

//chat context
import { ContextChat } from '../../../contexts/chat/chatContext'

export default function Slideshow() {

    const [chooseBackground, setChooseBackground] = useState(0)

    const { setUrlBackground } = ContextChat()

    const styles = {
        width: '30px',
        height: '30px'
    }

    //list of backgrounds
    const backgrounds = {
        1: 'url(/img/background1.png)',
        2: 'url(/img/wallpaper2.jpg)',
        3: 'url(/img/wallpaper3.jpg)'
    }

    //options of background
    const slides = [
        <span className='left' onClick={() => setChooseBackground(3)} style={{ background: 'url(/img/wallpaper3.jpg)' }}></span>,
        <span className='center' onClick={() => setChooseBackground(1)} style={{ background: 'url(/img/background1.png)' }}></span>,
        <span className='right' onClick={() => setChooseBackground(2)} style={{ background: 'url(/img/wallpaper2.jpg)' }}></span>
    ]

    //change background
    useEffect(() => {
        applyBackground(chooseBackground)
        setUrlBackground(backgrounds[chooseBackground])
    }, [chooseBackground])

    return (
        <div className='slideshow'>
            <span className='btnLeft'>
                <IconButton sx={styles}>
                    <ArrowBackIosIcon sx={{ marginLeft: '5px' }} />
                </IconButton>
            </span>
            <div className='slide'>
                {
                    slides.map((slide, index) => {
                        return slide
                    })
                }
            </div>
            <span className='btnRight'>
                <IconButton sx={styles}>
                    <ArrowBackIosIcon sx={{ marginRight: '5px' }} />
                </IconButton>
            </span>
        </div>
    )

}