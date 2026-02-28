import { Button, Input } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { boolean, email } from 'zod';
import * as zod from "zod"
import { login } from '../services/authservice';
import { Link, useNavigate } from 'react-router-dom';
import { userToken } from '../context/Tokencontext';
import { Helmet } from 'react-helmet';


const schema = zod.object({
  email: zod.string().nonempty("email is required").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "email is not valid"),
  password: zod.string().nonempty("password is required")
})



export default function Login() {
  const [load, setLoad] = useState(false)
  const [apiError, setapiError] = useState("")
  const navigate = useNavigate()
  const { token, setToken } = useContext(userToken)
  const { handleSubmit, register, formState: { errors, touchedFields } } = useForm({
    defaultValues: {
      email: "",
      password: ""
    },
    resolver: zodResolver(schema),
    mode: "onBlur"

  })

  async function sendData(loginData) {
    setLoad(true)
    const res = await login(loginData)
    setLoad(false)
    console.log(res);

    if (res.message === "signed in successfully") {
       console.log(res.data.token);
      navigate("/")
      localStorage.setItem("userToken", res.data.token)
      setToken(res.data.token)
    } else {
      setapiError("incorrect email or password")


    }
  }
  return (
    <>
      <Helmet>
        <title>login</title>
      </Helmet>
      <div className='py-10 min-w-md rounded-2xl bg-white shadow-2xl '>
        <h1 className='text-center text-2xl mb-5'>Login</h1>
        <form onSubmit={handleSubmit(sendData)} className='flex flex-col gap-4 px-12 sm:px-4' >
          <Input variant='bordered' errorMessage={errors.email?.message} isInvalid={Boolean(errors.email) && touchedFields.email} label="Email" type="email" {...register("email", { required: "Email is required" })} />
          <Input variant='bordered' errorMessage={errors.password?.message} isInvalid={Boolean(errors.password) && touchedFields.password} label="Password" type="password" {...register("password")} />
          <Button isLoading={load} type='submit'>Login</Button>
          {apiError && <p className='text-center text-danger-500'>{apiError}</p>}
          <div className='text-center'> not have an account? <Link className='text-blue-500' to={"/register"}>signUp</Link> </div>
        </form>
      </div>
    </>
  )
}
