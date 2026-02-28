import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userToken } from '../context/Tokencontext'
import { userdata } from '../context/Userdtacontext'


export default function Nav() {
  const { token, setToken } = useContext(userToken)
  const  {getUserdata, userdetailes, setUserDetailes}  = useContext(userdata)  
  const navigate = useNavigate()

  
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
    
    <div className='bg-black py-4'>
      <div className="container mx-auto px-7 sm:px-2 flex justify-between items-center">
        <Link to={"/"}><h2 className='text-white text-3xl font-bold'>SocialApp</h2></Link>        
        <div>
          <ul className='text-white flex items-center gap-5'>
            {token != null?<>
            <li><Link to={"/profile"}><img className='rounded-full w-10 h-10 mr-3' src={userdetailes?.photo} alt="" /></Link></li>
            <li><span className='cursor-pointer' onClick={logout}>logout</span></li>
            </> : <li><Link to={"/register"}>signup</Link></li> }
            
            
          </ul>
        </div>

      </div>
    </div>
     
    </>
  )
}
