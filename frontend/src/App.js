import React from "react";
import { AuthProvider } from './contexts/provider/index' //provider of authenticate
import { GoogleOAuthProvider } from "@react-oauth/google" //provider of authenticate google api
import './App.css'

//routes
import Router from './routes'

const App = () => {

    return (
        <div className="App">
            <AuthProvider>
                <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_SECRET_GOOGLE}>
                    <Router />
                </GoogleOAuthProvider>
            </AuthProvider>
        </div>
    )

}

export default App