import React, { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Ceatepost({ callback }) {

  const [body, setBody] = useState("")
  const [imgUrl, setImgUrl] = useState("")
  const [img, setImg] = useState(null)
  let [isLoading, setIsloading] = useState(false)

  function handleimg(e) {
    setImg(e.target.files[0])
    setImgUrl(URL.createObjectURL(e.target.files[0]))
    e.target.value = ""

  }
  async function createPost(e) {
    e.preventDefault()
    setIsloading(true)
    const formdata = new FormData();
    if (body) {

      formdata.append("body", body)
    }
    if (img) {

      formdata.append("image", img)
    }

    try {
      const { data } = await axios.post("https://linked-posts.routemisr.com/posts", formdata, {
        headers: {
          token: localStorage.getItem("userToken")
        }
      })
      if (data.message === 'success') {
        callback()
        setBody("")
        setImg(null)
        setImgUrl("")
        setIsloading(false)
        toast.success("post added Successfully")
      }


    } catch (error) {
      console.log(error);
      toast.error("something went wrong . please try again")
        setIsloading(false)

    }

  }
  return (
    <>
      <div>
        <form onSubmit={(e) => createPost(e)} >
          <textarea className='resize-none w-full border-1 rounded-2xl p-3 bg-gray-100' value={body} onChange={(e) => setBody(e.target.value)} rows={5} placeholder='What Is In Your Mind....' ></textarea>

          {imgUrl && <div className='relative mb-2 '>
            <img src={imgUrl} className='w-full' alt="" />
            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setImgUrl("")} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute top-4 end-4 cursor-pointer">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>

          </div>}

          <div className='flex justify-between  items-center'>
            <label className='cursor-pointer' >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>

              <input type="file" className='hidden' onChange={handleimg} />
            </label>

            <button disabled={isLoading} className='bg-primary cursor-pointer text-white px-3 py-1 rounded-xl'>{isLoading && <span className="loader"></span>} Post</button>
          </div>
        </form>
      </div>

    </>
  )
}
