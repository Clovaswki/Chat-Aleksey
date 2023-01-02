import { createContext, useContext } from 'react';

export const RouterContext = createContext({})

export function ContextRouter(){
    var context = useContext(RouterContext)
    
    return context
}