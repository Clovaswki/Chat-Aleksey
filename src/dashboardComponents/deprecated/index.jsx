import Nav from 'react-bootstrap/Nav';
import './styles.css'

import { Link } from 'react-router-dom'

//dashboard context
import { ContextDashboard } from '../../contexts/dashboard/dashboardContext';

// o valor 'link-1' no atributo eventKey mantem o nav selecionado

export default function NavbarAdmin() {

    const { choosedPage, setChoosedPage } = ContextDashboard()

    return (
        <header className='headerAdmin'>
            <div className='logoAdmin'>
                <Link to={'/'}><img src="/img/chatIcon.png" /></Link>
                <p>Administrador</p>
            </div>
            <div className='navsAdmin'>
                <Nav variant="tabs" defaultActiveKey="/admin">
                    <Nav.Item>
                        <Nav.Link active={choosedPage == 'evaluations'} onClick={() => setChoosedPage('evaluations')}>
                            Avaliações
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link active={choosedPage == 'dashboard'} onClick={() => setChoosedPage('dashboard')}>
                            Dashboard
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
        </header>
    )

}