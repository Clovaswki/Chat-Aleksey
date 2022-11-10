import { useState, useEffect } from 'react'

//chart js
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'


export default function ChartBar({chartData}) {

    const [data, setData] = useState({})

    useEffect(() => {
        setData(chartData)
    }, [chartData])

    return (
        <Bar
            options={{
                plugins: {
                    title: {
                        display: true
                    }
                }
            }}
            data={{
                labels: ['Sim, eu amo esse chat', 'Não', 'talvez', 'Péssimo'],
                datasets: [{
                    label: '',
                    backgroundColor: [
                        '#7CD9E2',
                        '#69C6E0',
                        '#60B3DD',
                        '#649FD3'
                    ],
                    borderColor: 'rgb(255, 99, 132)',
                    data: [parseFloat('.'+data.like), 
                            parseFloat('.'+data.dontLike), 
                            parseFloat('.'+data.maybe), 
                            parseFloat('.'+data.never),
                            1
                    ],
                    barPercentage: .7
                }]
            }}
        />
    )

}