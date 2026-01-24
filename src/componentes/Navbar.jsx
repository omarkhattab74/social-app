import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userToken } from '../context/Tokencontext'
import { userdata } from '../context/Userdtacontext'
import axios from 'axios'


export default function Nav() {
  const { token, setToken } = useContext(userToken)
  const  {setUserDetailes}  = useContext(userdata)  
  let [userdetail,setUserdetail] = useState("")
  const navigate = useNavigate()

   async function getUserdata() {
        try {
            const { data } = await axios.get("https://linked-posts.routemisr.com/users/profile-data", {
                headers: {
                    token: localStorage.getItem("userToken")
                }
            })
            setUserdetail(data?.user)
        } catch (error) {
            console.log(error);
            return error
        }
    }

   async function getUserDataa(){
     await getUserdata()
    }

    useEffect(()=>{
      if (localStorage.getItem("userToken")) {
        
        getUserDataa()
      }
    },[])
  

  function logout() {
    localStorage.removeItem("userToken")
    setToken(null)
    navigate("/login")
    setUserDetailes("")
  }
  return (
    <>
    
    <div className='bg-black   z-10 py-4'>
      <div className="container mx-auto  flex justify-between items-center">
        <Link to={"/"}><h2 className='text-white text-3xl font-bold'>SocialApp</h2></Link>        
        <div>
          <ul className='text-white flex items-center gap-5'>
            {token != null?<>
            <li><Link to={"/profile"}><img className='rounded-full w-10 h-10 mr-3' src={userdetail?.photo} alt="" /></Link></li>
            <li><span className='cursor-pointer' onClick={logout}>logout</span></li>
            </> : <li><Link to={"/register"}>signup</Link></li> }
            
            
          </ul>
        </div>

      </div>
    </div>
     
    </>
  )
}
