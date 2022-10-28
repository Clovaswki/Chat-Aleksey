import { useRef, useEffect, useState } from 'react'
import './styles.css'

export default function GraphCircle({background, children}) {

    const [percent, setPercent] = useState('')

    const numberPercent = useRef(),
        mask = useRef(),
        fill_1 = useRef(), 
        fill_2 = useRef()

    useEffect(() => {

        var yesPercent = ((children.yes/children.total)*100).toString().split('.')[0]
        setPercent(yesPercent)

        var yesPercentFormatDeg = (yesPercent/100)*180

        mask.current.style.transform = `rotate(${yesPercentFormatDeg}deg)`

        fill_1.current.style.transform = `rotate(${yesPercentFormatDeg}deg)`
        fill_2.current.style.transform = `rotate(${yesPercentFormatDeg}deg)`

    }, [children])


    return (
        <div className="circle-wrap">
            <div className="circle">
                <div ref={mask} className="mask full">
                    <div ref={fill_1} className="fill-1" style={{backgroundColor: background}}></div>
                </div>
                <div className="mask half">
                    <div ref={fill_2} className="fill-1" style={{backgroundColor: background}}></div>
                </div>
                <div ref={numberPercent} className="inside-circle">{percent}%</div>
            </div>
        </div>
    )

}