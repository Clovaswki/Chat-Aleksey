import './styles.css'

//components
import GraphCircle from './graphCircle/graphCircle';

//icons
import PieChartIcon from '@mui/icons-material/PieChart';

//dashboard context
import { ContextDashboard } from '../../contexts/dashboard/dashboardContext'

export default function CardGraphCircle({children}) {

    //collapsed body of dashboard component
    const { collapsedBody } = ContextDashboard()

    return (
        <div className={"cardGraphCircle "+( collapsedBody ? 'large' : 'small')}>

            <span className='badgeGraphCircle'>
                {children.iconBadge}
            </span>
            <div className='body-cardGraphCircle'>
                <div className="partOne-cardGraphCircle">
                    <span className='titleGraphCircleSpan'>
                        <p>
                            {children.headTitle}
                        </p>
                    </span>
                    <span className='graphCircleSpan'>
                        <GraphCircle background={children.background}>
                            {{
                                yes: children.like,
                                total: children.total
                            }}
                        </GraphCircle>
                    </span>
                </div>    
                <div className='divider-insideCardGraphCircle'></div>          
                <div className="partTwo-cardGraphCircle">
                    <div>
                        <p>{children.value}</p>
                        <small>{children.stringOfValue}</small>
                        <img 
                            src={children.iconValue} 
                            alt={children.iconValue}
                            style={{
                                width: '20px',
                                height: '20px',
                                marginTop: '-5px',
                                opacity: '.5'
                            }} 
                        />
                    </div>
                </div>              
            </div>

        </div>
    )

}