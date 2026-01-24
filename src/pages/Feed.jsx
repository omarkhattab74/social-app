import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from '@heroui/react'
import React, { useContext, useEffect, useState } from 'react'
import { Postscontext } from './../context/postsContext';
import { Form, Link } from 'react-router-dom';
import commentImg from '../assets/images.png'
import { createComment, deleteComment, editComment } from '../services/commentservices';
import Ceatepost from '../componentes/Ceatepost';
import { userdata } from '../context/Userdtacontext';
import { deletePost } from '../services/deletePost';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';


export default function Feed() {
  const [comment, setComment] = useState("")
  let [posts, setPosts] = useState([])
  let [commentId, setCommentid] = useState(null)
  let [editinput, setEditinput] = useState("")
  let [isLoading, setIsloading] = useState(false)



  let getPosts = useContext(Postscontext)
  const { getUserdata, userdetailes } = useContext(userdata)

  async function getAllPosts() {
    let res = await getPosts()
    setPosts(res)
  }

  function getAllPostss() {
    getAllPosts()

  }

  useEffect(() => {
    getAllPostss()
  }, [])
  let x = ["1", "2", "3", "4"]
  async function createNewComment(comment, postid) {
    setIsloading(true)
    const response = await createComment(comment, postid)

    if (response?.data.message === "success") {
      getAllPosts()
      setComment("")
      setIsloading(false)
    }
  }

  async function deletecommentt(id) {
    setIsloading(true)
    await deleteComment(id)
    getAllPosts()
    setIsloading(false)
  }

  function handleEditInput(id, content) {
    setCommentid(id)
    setEditinput(content)
  }

  async function updateComment(id, content) {
    setIsloading(true)
    const res = await editComment(id, content)
    if (res.message === "success") {

      getAllPosts()
      setCommentid(null)
      setIsloading(false)
    }

  }

  async function deletepostt(id) {
    await deletePost(id)
    getAllPosts()
  }

  return (
    <>

      <Helmet>
        <title>feed</title>
      </Helmet>

      <div className='container mx-auto px-3 sm:px-3 my-3 lg:w-3/4'>
        <Ceatepost callback={getAllPostss} />

        {posts.length === 0 && x.map((fv, index) =>

          <div key={index} className="skeleton-post">
            <div className="skeleton-header">
              <div className="skeleton-avatar"></div>
              <div className="skeleton-lines">
                <div className="line short"></div>
                <div className="line long"></div>
              </div>
            </div>

            <div className="skeleton-image"></div>
          </div>


        )}

        {posts?.map((data) =>
          <div key={data.id} className="bg-white w-full rounded-md shadow-md h-auto py-3 px-3 my-5">
            <div className="w-full h-16 flex items-center  justify-between ">
              <div className="flex">


                <img
                  className=" rounded-full w-10 h-10 mr-3"
                  src={data.user.photo}
                  alt=""
                />
                <div>
                  <h3 className="text-md font-semibold ">{data.user.name}</h3>

                  <p className="text-xs text-gray-500">{new Date(data.createdAt).toLocaleString()}</p>
                </div>
              </div>

              {data.user._id === userdetailes._id && <Dropdown>
                <DropdownTrigger>
                  <svg
                    className="w-16 cursor-pointer outline-none"
                    xmlns="http://www.w3.org/2000/svg"
                    width={27}
                    height={27}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#b0b0b0"
                    strokeWidth={2}
                    strokeLinecap="square"
                    strokeLinejoin="round"
                  >
                    <circle cx={12} cy={12} r={1} />
                    <circle cx={19} cy={12} r={1} />
                    <circle cx={5} cy={12} r={1} />
                  </svg>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static  Actions">

                  <DropdownItem key="edit">Edit </DropdownItem>
                  <DropdownItem onClick={() => deletepostt(data.id)} key="delete" className="text-danger" color="danger">
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>}



            </div>
            <Link to={`/post-detailes/${data.id}`}>
              <p className='my-2'>{data.body}</p>



              {data?.image?.length > 0 && <div>
                <img src={data.image} className='object-center w-full rounded-xl h-[500px]' alt="" />
              </div>}


            </Link>
            <div className="w-full h-8 flex items-center px-3 my-3">
              <div className="bg-blue-500 z-10 w-5 h-5 rounded-full flex items-center justify-center ">
                <svg
                  className="w-3 h-3 fill-current text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  width={27}
                  height={27}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#b0b0b0"
                  strokeWidth={2}
                  strokeLinecap="square"
                  strokeLinejoin="round"
                >
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                </svg>
              </div>
              <div className="bg-red-500 w-5 h-5 rounded-full flex items-center justify-center -ml-1">
                <svg
                  className="w-3 h-3 fill-current stroke-current text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  width={27}
                  height={27}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#b0b0b0"
                  strokeWidth={2}
                  strokeLinecap="square"
                  strokeLinejoin="round"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <div className="w-full flex justify-between">

                <p className="ml-3 text-gray-500">8</p>
                <Link to={`/post-detailes/${data.id}`}>

                  <p className="ml-3 text-gray-500">{data.comments.length} comments</p>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-3 w-full px-5  my-3">
              <button className="flex flex-row justify-center items-center w-full space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#838383"
                  strokeWidth={2}
                  strokeLinecap="square"
                  strokeLinejoin="round"
                >
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                </svg>
                <span className="font-semibold cursor-pointer text-small sm:text-lg text-gray-600">like</span>
              </button>
              <button className="flex flex-row justify-center items-center w-full space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#838383"
                  strokeWidth={2}
                  strokeLinecap="square"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span className=" cursor-pointer font-semibold text-small sm:text-lg text-gray-600">comment</span>
              </button>
              <button className="flex flex-row justify-center items-center w-full space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#838383"
                  strokeWidth={2}
                  strokeLinecap="square"
                  strokeLinejoin="round"
                >
                  <circle cx={18} cy={5} r={3} />
                  <circle cx={6} cy={12} r={3} />
                  <circle cx={18} cy={19} r={3} />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
                <span className="font-semibold cursor-pointer text-small sm:text-lg text-gray-600">share</span>
              </button>
            </div>

            <Form onSubmit={() => createNewComment(comment, data.id)} className='flex gap-2 items-center my-2'>
              <Input
                type='text'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Type comment..."
                variant='bordered'


              />
              <Button type="submit" className='bg-primary text-white'>Create</Button>
            </Form>


            {data?.comments.length > 0 &&

              <div className='bg-gray-100 rounded-xl p-2 rounded-2xl'>
                <div className='flex justify-between items-center'>


                  <div className="flex py-2">


                    <img onError={(e) => e.target.src = commentImg}
                      className=" rounded-full w-10 h-10 mr-3"
                      src={data?.comments[0]?.commentCreator?.photo}
                      alt=""
                    />
                    <div>
                      <h3 className="text-md font-semibold ">{data.comments[0].commentCreator.name}</h3>
                      <p className="text-xs text-gray-500">{new Date(data.comments[0].createdAt).toLocaleString()}</p>
                    </div>
                  </div>

                  {data.comments[0].commentCreator._id === userdetailes._id && data.user._id === userdetailes._id && <Dropdown>
                    <DropdownTrigger>
                      <svg
                        className="w-16 cursor-pointer outline-none"
                        xmlns="http://www.w3.org/2000/svg"
                        width={27}
                        height={27}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#b0b0b0"
                        strokeWidth={2}
                        strokeLinecap="square"
                        strokeLinejoin="round"
                      >
                        <circle cx={12} cy={12} r={1} />
                        <circle cx={19} cy={12} r={1} />
                        <circle cx={5} cy={12} r={1} />
                      </svg>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static  Actions">

                      <DropdownItem onClick={() => handleEditInput(data?.comments[0]._id, data?.comments[0]?.content)} key="edit" >Edit </DropdownItem>
                      <DropdownItem key="delete" className="text-danger" onClick={() => deletecommentt(data?.comments[0]._id)} color="danger">
                        Delete
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>}


                </div>

                <p className='px-11'>{data?.comments[0]?.content}</p>
                {data?.comments[0]._id === commentId && <Form onSubmit={() => updateComment(data?.comments[0]._id, editinput)} className='flex gap-2 items-center my-2'>
                  <Input
                    type='text'

                    variant='bordered'
                    value={editinput}
                    onChange={(e) => setEditinput(e.target.value)}

                  />
                  <Button type="submit" className='bg-primary text-white'>  Update</Button>
                </Form>}

                

              </div>}
          </div>
        )}
      </div>
    </>
  )
}
