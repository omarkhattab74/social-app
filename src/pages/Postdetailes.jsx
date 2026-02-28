import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Form, useParams } from 'react-router-dom'
import commentImg from '../assets/images.png'
import { Button, Input } from '@heroui/react';
import { createComment, deleteComment, editComment, getPostComments } from '../services/commentservices';
import { Postscontext } from '../context/postsContext';
import { userdata } from '../context/Userdtacontext';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react'
import { deletePost } from '../services/deletePost';
import { Helmet } from 'react-helmet';
import Loadingbutton from '../componentes/Loadingbutton';

export default function Postdetailes() {

  const [comment, setComment] = useState("")
  const [postdeatails, setPostdetailes] = useState("")

  const getposts = useContext(Postscontext)
  const { getUserdata, userdetailes } = useContext(userdata)
  let [commentId, setCommentid] = useState(null)
  let [editinput, setEditinput] = useState("")
  let [postComments, setPostComments] = useState([])
  let [creatCommentLoading, setCreateCommentloading] = useState(false)
  let [updateCommentLoading, setUpdateCommentloading] = useState(false)

  const x = useParams()

  async function getpostdetails() {
    try {
      const response = await axios.get(`https://route-posts.routemisr.com/posts/${x.id}`, {
        headers: {
          token: localStorage.getItem("userToken")
        }
      })



      setPostdetailes(response.data?.data.post)
    } catch (error) {

    }
  }

  function pstDtl() {
    getpostdetails()
    getPostCommentss(x)
  }

  async function getPostCommentss(x) {
    const comments = await getPostComments(x.id)
    setPostComments(comments?.data.comments)

  }

  useEffect(() =>

    pstDtl()
    , [])

  async function createNewComment(comment, postid) {
    setCreateCommentloading(true)
    const formdata = new FormData()
    if (comment) {
      formdata.append("content", comment)

    }
    const response = await createComment(formdata, postid)
    getpostdetails()
    getPostCommentss(x)
    setComment("")
    setCreateCommentloading(false)
  }

  async function deletecommentt(id, postId) {
    await deleteComment(id, postId)
    getpostdetails()
    getPostCommentss(x)
  }

  function handleEditInput(id, content) {
    setCommentid(id)
    setEditinput(content)
  }

  async function updateComment(id, content, postId) {
    setUpdateCommentloading(true)
    const formdata = new FormData()
    if (content) {
      formdata.append("content", content)
    }
    const res = await editComment(id, formdata, postId)
    setUpdateCommentloading(false)
    if (res.message === "comment updated successfully") {

      getpostdetails()
      setCommentid(null)
      getPostCommentss(x)

    }
  }

  async function deletePostt(id) {
    await deletePost(id)
    await getpostdetails()

  }



  return (
    <>

      <Helmet>
        <title>postdetailes</title>
      </Helmet>

      {postdeatails === "" &&
        <>
          <div className="skeleton-post">
            <div className="skeleton-header">
              <div className="skeleton-avatar"></div>
              <div className="skeleton-lines">
                <div className="line short"></div>
                <div className="line long"></div>
              </div>
            </div>

            <div className="skeleton-image"></div>
          </div>
          <div className="skeleton-post">
            <div className="skeleton-header">
              <div className="skeleton-avatar"></div>
              <div className="skeleton-lines">
                <div className="line short"></div>
                <div className="line long"></div>
              </div>
            </div>

            <div className="skeleton-image"></div>
          </div>

        </>
      }


      <div className="container lg:w-3/4   rounded-xl my-4  mx-auto">

        {postdeatails !== "" && <> <div className="bg-white w-full rounded-md shadow-md h-auto py-3 px-3 ">
          <div className="w-full h-16 flex items-center  justify-between ">
            <div className="flex">
              <img
                className=" rounded-full w-10 h-10 mr-3"
                src={postdeatails?.user?.photo}
                alt=""
              />
              <div>
                <h3 className="text-md font-semibold ">{postdeatails?.user?.name}</h3>
                <p className="text-xs text-gray-500">{new Date(postdeatails?.createdAt).toLocaleString()}</p>
              </div>
            </div>
            {postdeatails?.user?._id === userdetailes._id && <Dropdown>
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
                <DropdownItem key="delete" onClick={() => deletePostt(postdeatails.id)} className="text-danger" color="danger">
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>}
          </div>
          <p className='my-2'>{postdeatails?.body}</p>

          {postdeatails?.image?.length > 0 && <div>
            <img src={postdeatails?.image} className='object-center w-full h-[500px]' alt="" />
          </div>}


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
              <p className="ml-3 text-gray-500">{postdeatails?.likesCount}</p>
              <p className="ml-3 text-gray-500">{postdeatails?.commentsCount} comments</p>
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
              <span className="font-semibold text-small sm:text-lg text-gray-600">like</span>
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
              <span className="font-semibold text-small sm:text-lg text-gray-600">comment</span>
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
              <span className="font-semibold text-small sm:text-lg text-gray-600">share</span>
            </button>
          </div>

          <Form onSubmit={() => createNewComment(comment, x.id)} className='flex gap-2 items-center my-2'>
            <Input
              type='text'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Type comment..."
              variant='bordered'


            />

            {creatCommentLoading ? <Loadingbutton/> : <Button type="submit" className='bg-primary text-white'>Create</Button>}
            
          </Form>

        </div>

          <div className='mt-4'>

            {postComments?.map((comment) =>


              <div key={comment?._id} className='bg-gray-50  mb-2 p-2 rounded-2xl'>
                <div className="flex justify-between items-center">
                  <div className="flex ">
                    <img onError={(e) => e.target.src = commentImg}
                      className=" rounded-full w-10 h-10 mr-3"
                      src={comment?.commentCreator.photo}
                      alt=""
                    />
                    <div>
                      <h3 className="text-md font-semibold ">{comment?.commentCreator.name}</h3>
                      <p className="text-xs text-gray-500">{new Date(comment?.createdAt).toLocaleString()}</p>
                    </div>
                  </div>

                  {comment?.commentCreator._id === userdetailes._id && postdeatails?.user._id === userdetailes._id && <Dropdown>
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

                      <DropdownItem onClick={() => handleEditInput(comment?._id, comment.content)} key="edit">Edit </DropdownItem>
                      <DropdownItem key="delete" onClick={() => deletecommentt(comment._id, comment.post)} className="text-danger" color="danger">
                        Delete
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>}


                </div>

                <p className='text-sm my-2 ms-6 px-7'>{comment?.content}</p>

                {comment._id === commentId && <Form onSubmit={() => updateComment(comment._id, editinput, comment.post)} className='flex gap-2 items-center my-2'>
                  <Input
                    type='text'

                    // variant='bordered'
                    value={editinput}
                    onChange={(e) => setEditinput(e.target.value)}
                    className='ms-10'

                  />
                  {updateCommentLoading ? <Loadingbutton/> :   <Button type="submit" className='bg-primary text-white'>Update</Button> }
                
                </Form>}

              </div>
            )}
          </div></>}
      </div>
    </>
  )
}
