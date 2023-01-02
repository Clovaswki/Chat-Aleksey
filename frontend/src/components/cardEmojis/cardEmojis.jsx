import React from 'react'
import './cardEmojis.css'
import emojisCode from '../../helpers/emojisCode.json'
import { useEffect } from 'react'

//function add styles
import styles from '../../helpers/styles'

export default function CardEmojis({setCardEmojis, cardEmojis, setMessageWithEmoji}) {

    const [emojis, setEmojis] = React.useState([])
    const cardEmojisDiv = React.useRef(null)
    const gridEmojis = React.useRef(null)

    React.useEffect(() => {
        setEmojis([...emojisCode])
    }, [])

    //event onclick
    const addEmojiInInput = emoji => setMessageWithEmoji(emoji)//add emoji at a state

    //get emojis of file and convert to html
    function addEmojis() {

        //remove duplicate
        var filterEmojis = emojis.filter((emoji , index) => {
            return emojis.indexOf(emoji) == index;
        }) 

        filterEmojis.forEach(emoji => {

            let newElement = document.createElement('span')

            newElement.innerHTML = emoji
            
            styles(newElement, {
                "width": "30px",
                "height": "30px",
                "padding": "5px",
                "cursor": "pointer"
            })

            newElement.onclick = (event) => addEmojiInInput(event.target.innerText)
            
            gridEmojis.current.appendChild(newElement)

        })

        setEmojis([])

    }

    //activate card of emojis
    useEffect(() => {

        cardEmojis 
        ? styles(cardEmojisDiv.current, {"display": "flex", "visibility": "visible"})
        : styles(cardEmojisDiv.current, {"display": "none", "visibility": "hidden"})

        emojis.length > 0 && addEmojis()

    }, [cardEmojis, emojis])

    return (
        <div ref={cardEmojisDiv} className='cardEmojis'>
            <div ref={gridEmojis} className='gridEmojis'>

            </div>
        </div>
    )

}