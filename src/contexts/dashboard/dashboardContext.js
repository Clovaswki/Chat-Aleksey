import { useContext, createContext } from 'react'

export const DashboardContext = createContext({})

export function ContextDashboard(){
    const context = useContext(DashboardContext)

    return context
}
