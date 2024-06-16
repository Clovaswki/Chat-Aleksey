import React, { useEffect, useState, useRef } from "react";
import { io } from 'socket.io-client'
import './styles.css'


//Api
import Api from '../../services/api'

//contexts
    //auth context
    import ContextAuth from '../../contexts/provider/auth'
    //dashboard context
    import { DashboardContext } from "../../contexts/dashboard/dashboardContext";

//error handling
import { errorHandling } from '../../helpers/errorHandling'

//components
import EvaluationComponent from "../../dashboardComponents/evaluationsComponent";
import GridGraphComponent from "../../dashboardComponents/gridGraphComponent";
import LoadDashboard from "../../dashboardComponents/loadDashboard";
import ReportScreenEnlarge from '../../dashboardComponents/reportScreenEnlarge/reportScreenEnlarge';
import SidebarAdmin from "../../dashboardComponents/sidebarAdmin/sidebarAdmin";
import UsersComponent from "../../dashboardComponents/usersComponent";

const Dashboard = () => {

    const socket = useRef()

    //evaluations data for graph line
    const [evaluationsGraphLine, setEvaluationsGraphLine] = useState(null)

    //evaluations data for graph circle
    const [evaluationsGraphCircle, setEvaluationsGraphCircle] = useState(null)

    //evaluations
    const [evaluations, setEvaluations] = useState([])

    //choosed page state
    const [choosedPage, setChoosedPage] = useState('dashboard')
    const [componentChoosed, setComponentChoosed] = useState(<GridGraphComponent/>)

    //load data dashboard state
    const [loadDashboard, setLoadDashboard] = useState(true)

    //component report screen
    const [reportScreen, setReportScreen] = useState('')

    //all users of chat aleksey
    const [allUsers, setAllUsers] = useState([])

    //collapsed body component
    const [collapsedBody, setCollapsedBody] = useState(false)

    //all messages of database
    const [allMessages, setAllMessages] = useState([])

    //management of components - admin components
    useEffect(() => {

        const listComponents = [
            {page: 'dashboard', component: <GridGraphComponent/>},
            {page: 'evaluations', component: <EvaluationComponent/>},
            {page: 'users', component: <UsersComponent/>},
            {page: 'database', component: <div>Banco de dados</div>},
            {page: 'settings', component: <div>Configurações</div>}
        ]

        var currentComponent = listComponents.find( component => component.page === choosedPage)

        setComponentChoosed(currentComponent.component)

    }, [choosedPage])

    //listening for updates to user reviews: websocket
    useEffect(() => {

        socket.current = io(process.env.REACT_APP_WEBSOCKET_SERVER_URL)
        
        socket.current.on('sendUpdateEvaluations', () => fetchEvaluations())

    }, [socket])

    //fetch evaluations, all users and all messages
    useEffect(() => {
        Promise.all([
            fetchEvaluations(),
            fetchAllUsers(),
            fetchAllMessages()
        ])
    }, [])

    async function fetchEvaluations(){

        try{
            var { data } = await Api.get('/chat/get-evaluations')

            if(data.length > 0){
                //evaluation data formatting for the chart line
                var formatingDataGraphLine = {
                    totalUsers: data.length,
                    like:  data.filter( d => d.questionTwo.includes('sim, eu amo') ).length,
                    DontLike: data.filter( d => d.questionTwo.includes('não') ).length,
                    maybe: data.filter( d => d.questionTwo.includes('talvez') ).length,
                    never: data.filter( d => d.questionTwo.includes('nem pagando') ).length
                }
                
                //evaluation data formatting for the chart circle
                var formatingDataGraphCircle = {
                    totalUsers: data.length,
                    like: data.filter( d => d.questionOneLikeOrNot ).length
                }

                setEvaluationsGraphCircle(formatingDataGraphCircle)

                setEvaluationsGraphLine(formatingDataGraphLine)

                setEvaluations([...data])

            }else{
                setEvaluationsGraphCircle('')
                setEvaluationsGraphLine('')
            }   
        }catch(error){
            console.log(error)
            alert(error)
        }

    }

    //get all users
    async function fetchAllUsers(){

        try {
            var response = await Api.get('/user/get-users')

            if(response.data.length > 0) {

                response.data.forEach( user => delete user.password)

                setAllUsers([...response.data])
            }
        } catch (error) {
            errorHandling(error, 'Dashboard')
        }

    }

    //fetch all messages
    async function fetchAllMessages(){
        try {
            var response = await Api.get('/chat/get-allmessages')

            if(response.status === 200) return setAllMessages([...response.data])

        } catch (error) {
            console.log(error)
        }
    }

    //set dashboard load true or false
    useEffect(() => {

        //check if states have changed
        if(evaluationsGraphCircle != null && evaluationsGraphLine != null){
            setLoadDashboard(false)
        }

    }, [evaluationsGraphCircle, evaluationsGraphLine])

    return (
        <DashboardContext.Provider value={{
            choosedPage,
            setChoosedPage,
            evaluationsGraphCircle,
            evaluationsGraphLine,
            setReportScreen,
            reportScreen,
            setEvaluations,
            evaluations,
            setAllUsers,
            allUsers,
            setCollapsedBody, 
            collapsedBody,
            socket,
            allMessages
        }}>
            <div className="parentAdminRoute">
                <SidebarAdmin/>
                <div className={collapsedBody ? 'bodyAdminRouteCollapsed' : 'bodyAdminRoute'}>
                    {
                        !loadDashboard ?
                            
                            componentChoosed

                            :
                            <LoadDashboard/>  
                    }
                </div>
            </div>
            {reportScreen && <ReportScreenEnlarge/>}
        </DashboardContext.Provider>
    )

}

export default Dashboard