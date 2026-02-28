import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const userdata = createContext()


export default function Userdtacontextprovider(props) {
    const [userdetailes, setUserDetailes] = useState("")
    const [islogedin, setIslogedin] = useState(localStorage.getItem("userToken")!==null)


 async function getUserdata() {
        try {
            const { data } = await axios.get("https://route-posts.routemisr.com/users/profile-data", {
                headers: {
                    token: localStorage.getItem("userToken")
                }
            })

            setUserDetailes(data?.data.user)
        } catch (error) {
        }
    }

    async function getuserdetails() {
        const user = await getUserdata()

    }

    useEffect(() => {
       
      if (localStorage.getItem("userToken")) {
        
          getuserdetails()
      }
            
        

        
    },[] )

    



    return (
        <userdata.Provider value={{ getUserdata, userdetailes, setUserDetailes }}>
            {props.children}
        </userdata.Provider>
    )
}
