import React from "react";
import {AuthProvider} from './contexts/provider/index' //provider of authenticate
import './App.css'

//routes
import Router from './routes'

const App = () => {
    
    return(
       <div className="App">
        <AuthProvider>
            <Router/>
        </AuthProvider>
       </div>
    )   

}

export default App