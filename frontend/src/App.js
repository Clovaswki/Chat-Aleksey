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
                <GoogleOAuthProvider clientId={'623937589095-0nfiu9ckifv0bnht5k28n337o6alecj5.apps.googleusercontent.com'}>
                    <Router />
                </GoogleOAuthProvider>
            </AuthProvider>
        </div>
    )

}

export default App