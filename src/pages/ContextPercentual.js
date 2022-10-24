import { createContext, useState } from "react"

const ContextPercentual = createContext()

export function ContextProvider({children}){

    const [percentual, setPercentual] = useState(0)
    return (
        <ContextPercentual.Provider value={{percentual, setPercentual}}>
            {children}
        </ContextPercentual.Provider>
    ) 
}

export default ContextPercentual