import './styles.css'
import { useRef, useState, useEffect } from 'react'

//components
import ElevationCard from '../../components/supendedCard'

export default function GraphLine({evaluationsGraphLine}) {

    const [percents, setPercents] = useState({
        like: '',   
        dontLike: '',
        maybe: '',
        never: ''
    })

    const lineOne = useRef(),
        lineTwo = useRef(),
        lineThree = useRef(),
        lineFour = useRef()

    useEffect(()=>{
            
        //evaluation data formatting for the chart
        async function calc(){
            
            const { totalUsers, like, DontLike, maybe, never } = evaluationsGraphLine  
                
            var percent_Like = ((like/totalUsers)* 100).toString().split('.')[0]
            var percent_DontLike = ((DontLike/totalUsers)* 100).toString().split('.')[0]
            var percent_Maybe = ((maybe/totalUsers)* 100).toString().split('.')[0]
            var percent_Never = ((never/totalUsers)* 100).toString().split('.')[0]

            setPercents({
                like: percent_Like+'%',
                dontLike: percent_DontLike+'%',
                maybe: percent_Maybe+'%',
                never: percent_Never+'%'
            })

            //line one
            lineOne.current.style.height = percent_Like+'%'
            //line two
            lineTwo.current.style.height = percent_Maybe+'%'
            //line three
            lineThree.current.style.height = percent_DontLike+'%'
            //lineFour
            lineFour.current.style.height = percent_Never+'%'

    
        }
        calc()
    }, [evaluationsGraphLine])
    

    return (
        <div className="card3" style={{ flex: 1 }}>
            <ElevationCard height={'100%'} border_radius={'5px'}>
                <div style={{
                    width: '100%', 
                    height: '100%',
                    display: 'flex', 
                    border: '1px solid lightgray', 
                    borderRadius: '5px'
                    }}
                > 
                    <div className='percents'>
                        <span className='percent5'><div>100%</div></span>
                        <span className='percent4'><div>80%</div></span>
                        <span className='percent3'><div>60%</div></span>
                        <span className='percent2'><div>40%</div></span>
                        <span className='percent1'><div>20%</div></span>
                        <div className="graphy3">
                            <span ref={lineOne} className='lines' style={{backgroundColor: 'brown'}}>
                                <small>{percents.like}</small>
                            </span>
                            <span ref={lineTwo} className='lines' style={{backgroundColor: 'aqua'}}>
                                <small>{percents.maybe}</small>
                            </span>
                            <span ref={lineThree} className='lines' style={{backgroundColor: 'antiquewhite'}}>
                                <small>{percents.dontLike}</small>
                            </span>
                            <span ref={lineFour} className='lines' style={{backgroundColor: 'pink'}}>
                                <small>{percents.never}</small>
                            </span>
                        </div>
                    </div>
                </div>
            </ElevationCard>
        </div>
    )

}