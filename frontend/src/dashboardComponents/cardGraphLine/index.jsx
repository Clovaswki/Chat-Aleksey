import './styles.css'
import { useRef, useState, useEffect } from 'react'

//icons
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart'
import ChartBar from './chartBar'

export default function GraphLine({ evaluationsGraphLine }) {

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

    useEffect(() => {

        //evaluation data formatting for the chart
        async function calc() {

            const { totalUsers, like, DontLike, maybe, never } = evaluationsGraphLine

            var percent_Like = ((like / totalUsers) * 100).toString().split('.')[0]
            var percent_DontLike = ((DontLike / totalUsers) * 100).toString().split('.')[0]
            var percent_Maybe = ((maybe / totalUsers) * 100).toString().split('.')[0]
            var percent_Never = ((never / totalUsers) * 100).toString().split('.')[0]

            setPercents({
                like: percent_Like + '%',
                dontLike: percent_DontLike + '%',
                maybe: percent_Maybe + '%',
                never: percent_Never + '%'
            })

            //line one
            lineOne.current.style.height = percent_Like + '%'
            //line two
            lineTwo.current.style.height = percent_Maybe + '%'
            //line three
            lineThree.current.style.height = percent_DontLike + '%'
            //lineFour
            lineFour.current.style.height = percent_Never + '%'


        }
        calc()
    }, [evaluationsGraphLine])

    return (
        <div className="cardGraphLine">
            <span className='badge-cardGraphLine'>
                <StackedBarChartIcon sx={{ color: '#fff', fontSize: '60pt' }} fontSize='large' />
            </span>
            <div className="body-cardGraphLine">
                <div className='partOne-cardGraphLine'>
                    <div className='title-cardGraphLine'>
                        <p>Categorias de Avaliação</p>
                    </div>
                    <div className='graphLine'>
                        <div className='content-chartBar'>
                            <ChartBar chartData={percents}/>
                        </div>
                    </div>
                </div>
                <div className='divider-cardGraphLine'></div>
                <div className='partTwo-cardGraphLine'>

                </div>
            </div> 
        </div>

    )

}