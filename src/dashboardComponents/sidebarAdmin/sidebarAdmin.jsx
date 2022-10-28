import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import './sidebarAdmin.css'

//icons
import GridViewIcon from '@mui/icons-material/GridView';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

//dashboard context
import { ContextDashboard } from '../../contexts/dashboard/dashboardContext'

export default function SidebarAdmin() {

    const { choosedPage, setChoosedPage, setCollapsedBody } = ContextDashboard()
    const [collapsed, setCollapsed] = React.useState(false)

    const navs = [
        { nav: 'Dashboard', icon: <GridViewIcon />, page: 'dashboard' },
        { nav: 'Avaliações', icon: <AssessmentIcon />, page: 'evaluations' }
    ]

    return (
        <header className={"sidebarAdmin bg-light "+(collapsed ? 'collapsedHide' : 'collapsedShow')}>
            <div className='headerSidebar'>
                <Navbar.Brand className="logoSidebar">
                    <a href="/chat">
                        <img
                            src="/img/chatIcon.png"
                            alt="logoAdmin"
                            className={collapsed ? 'imgLogoCollapsed' : 'imgLogo'}
                        />
                    </a>
                    {
                        !collapsed &&
                            <p>Administrador</p>
                    }
                </Navbar.Brand>
            </div>
            <Container className="bodySidebar">
                {
                    navs.map((nav, index) => (
                        <Nav
                            key={index}
                            className={'navSidebar ' + (choosedPage === nav.page && 'activate')}
                            onClick={() => setChoosedPage(nav.page)}
                        >
                            <Nav.Item className="navSidebarInside">
                                {nav.icon}
                                {
                                    !collapsed &&
                                        <small>
                                            {nav.nav}
                                        </small>
                                }
                            </Nav.Item>
                        </Nav>
                    ))
                }
            </Container>
            <div className='navsConfigSidebar'>
                <div className='navCollapsedSidebar' onClick={() => [setCollapsed(collapsed? false : true), setCollapsedBody(collapsed? false : true)]}>
                    <span className={collapsed ? 'iconBackSidebarCollapsed' : 'iconBackSidebar'}>
                        <ArrowBackIosIcon/>
                    </span>
                </div>
            </div>
        </header>
    )

}