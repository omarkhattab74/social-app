import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const userdata = createContext()


export default function Userdtacontextprovider(props) {
    const [userdetailes, setUserDetailes] = useState("")
    const [islogedin, setIslogedin] = useState(localStorage.getItem("userToken")!==null)


 async function getUserdata() {
        try {
            const { data } = await axios.get("https://linked-posts.routemisr.com/users/profile-data", {
                headers: {
                    token: localStorage.getItem("userToken")
                }
            })
            // console.log(data.user);

            setUserDetailes(data?.user)
            return data.user
        } catch (error) {
            console.log(error);
            return error
        }
    }

    async function getuserdetails() {
        const user = await getUserdata()
        // console.log(userdetailes);

    }

    // useEffect(() => {
       
      
            
    //         getuserdetails()
        

        
    // },[] )

    useEffect(() => {
       
        if (islogedin) {
            
            getuserdetails()
        }

        
    },[islogedin] )



    return (
        <userdata.Provider value={{ getUserdata, userdetailes, setUserDetailes }}>
            {props.children}
        </userdata.Provider>
    )
}
