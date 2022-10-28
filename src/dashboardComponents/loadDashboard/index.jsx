import LinearProgress from '@mui/material/LinearProgress';
import './styles.css'

//auth context 
import ContextAuth from '../../contexts/provider/auth';

export default function LoadDashboard() {

    const { picture, name } = ContextAuth()

    return (
        <div className="loadDashboard">
            <div className="centerLoadDashboard">
                <div className="topInfoUserAdmin">
                    <span>
                        <img src={picture ? picture : '/img/noAvatar.png'} referrerpolicy="no-referrer" alt="admin" />
                        <small><strong>{name}</strong></small>
                    </span>
                    <div>
                        <LinearProgress />
                    </div>
                </div>
                <div className='centerLogoAdminLoad'>
                    <span>
                        <img src='/img/chatIcon.png' alt="logo" style={{height: '100px', width: '100px'}}/>
                        <small>Admin</small>
                    </span>
                </div>
            </div>
        </div>
    )

}