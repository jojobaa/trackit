import { createContext, useState, useEffect } from "react"

const Context = createContext()

export function ContextAPI({children}){

    const [usuario, setUsuario] = useState(() => {
        const infoUser =  localStorage.getItem("user info")
        return infoUser ? JSON.parse(infoUser) : []
    })
    useEffect(() => {
        localStorage.setItem("user info", JSON.stringify(usuario))
    }, [usuario]);
    return (
        <Context.Provider value={{usuario, setUsuario}}>
            {children}
        </Context.Provider>
    ) 
}

export default Context