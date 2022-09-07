import React, { createContext, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'

import ContextAuth from "./contexts/provider/auth"; //context of data user
import { RouterContext } from './contexts/router/routerContext' //router context provider

//components
import ProtectedLayout from './components/ProtectedLayout'
//pages
import Login from './pages/login'
import Chat from './pages/chat'
import Register from "./pages/register";

const Router = () => {

    const [errorRedirect, setErrorRedirect] = useState('') //error message in redirect of routes

    return (
        <RouterContext.Provider value={{ errorRedirect, setErrorRedirect }}>
            <Routes>
                <Route path="/" element={<ProtectedLayout> <Login /> </ProtectedLayout>} />
                <Route path="/chat" element={<ProtectedLayout> <Chat /> </ProtectedLayout>} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </RouterContext.Provider>
    )

}

export default Router