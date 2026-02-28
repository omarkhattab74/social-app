import React, { useContext, useEffect, useState } from 'react'
import { userdata } from '../context/Userdtacontext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function Profile() {

  const {getUserdata, userdetailes, setUserDetailes} =useContext(userdata)

 
  const [image, setImage] = useState("")
  const [imageurl, setImageurl] = useState(null)
  let [isLoading, setIsloading] = useState(false)
    
  function handleImage(e) {
    setImage(e.target.files[0])
    setImageurl(URL.createObjectURL(e.target.files[0]))
    e.target.value = "";
  }
  function closeImage(e) {
    setImageurl(null)
  }

  async function changePhoto(e) {
    e.preventDefault()
    setIsloading(true)
    let form = new FormData()
    form.append("photo", image)

    try {
      const { data } = await axios.put("https://route-posts.routemisr.com/users/upload-photo", form,
        {
          headers: {
            token: localStorage.getItem("userToken")
          }
        }
      )
      setImageurl(null)
      getUserdata()
      toast.success("profile photo changed successfully")
      setIsloading(false)

    } catch (error) {
      toast.error("something went wrong . please try again")
      setIsloading(false)

    }
  }

  


  return (

    <>
     <Helmet>
    <title>profile</title>
  </Helmet>
      {userdetailes === "" ? <div className="skeleton-post">
        <div className="skeleton-header">
          <div className="skeleton-avatar"></div>
          <div className="skeleton-lines">
            <div className="line short"></div>
            <div className="line long"></div>
          </div>
        </div>

        <div className="skeleton-image"></div>
      </div> : <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white w-full max-w-md rounded-xl shadow-md p-6">

          <div className="flex justify-center mb-2">
            <img
              src={userdetailes?.photo}
              alt="user"
              className="w-28 h-28 rounded-full border-4 border-indigo-500"
            />
          </div>

          <form className='text-center' onSubmit={(e) => changePhoto(e)} >
            <label className='cursor-pointer'>
              Change Photo
              <input type="file" onChange={(e) => handleImage(e)} className='hidden' />
            </label>

            {imageurl && <div className='my-4 relative'>
              <img src={imageurl} className='w-full' alt="" />
              <svg xmlns="http://www.w3.org/2000/svg" onClick={(e) => closeImage(e)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute top-4 end-4 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>

              <button className='bg-primary mt-3 text-white py-2 px-3 rounded-xl block ms-auto'> {isLoading && <span className="loader"></span>} Change</button>
            </div>}

          </form>


          <h2 className="text-center text-xl font-bold mt-4">
            {userdetailes?.name}
          </h2>

          <p className="text-center text-gray-500 text-sm">
            {userdetailes?.username}
          </p>
          <p className="text-center text-gray-500 text-sm">
            {userdetailes?.email}
          </p>

          <div className="border-t my-6"></div>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Date of Birth</span>
              <span className="font-medium">{userdetailes?.dateOfBirth?.slice(0, 10)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Joined At</span>
              <span className="font-medium">{userdetailes?.createdAt?.slice(0, 10)}</span>
            </div>
          </div>

        </div>
      </div>}

    </>
  )
}
