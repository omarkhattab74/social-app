import { createContext, useState } from "react";

 export const userToken = createContext()

 export function Usertokenprovider({ children }) {
    let [token, setToken] = useState(localStorage.getItem("userToken"))
    return <userToken.Provider value={{ token, setToken }}>
        {children}
    </userToken.Provider>
}