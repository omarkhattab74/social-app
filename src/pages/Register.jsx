import { Button, Input, Select, SelectItem } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod';
import { p } from 'framer-motion/client';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import * as zod from "zod"
import { signUp } from '../services/authservice';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const schema = zod.object({
  name: zod.string().nonempty("name is required").min(3, "name at least 3 characters").regex(/^[a-zA-Z\s]+$/, "name must be only letters").max(20, "name must be at most 20 characters"),
  username: zod.string().nonempty("Username is required").regex(/^[a-z0-9_]{3,30}$/,"Invalid Username").min(3, "Username at least 3 characters").max(30, "Username must be at most 30 characters"),
  email: zod.string().nonempty("email is raequired").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "email is not valid"),
  password: zod.string().nonempty("password is required").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "weak password "),
  rePassword: zod.string().nonempty("repassword is required"),
  dateOfBirth: zod.coerce.date("date of birth is required").refine((value) => {
    const today = new Date().getFullYear();
    const birthyear = value.getFullYear();
    const age = today - birthyear;
    return age >= 18;
  }, "you must be at least 18 years old"),
  gender: zod.string().nonempty("gender is required")

}).refine((data) => data.password === data.rePassword, { path: ["rePassword"], message: "password is not equal to repassword" })

export default function Register() {

  let [load, setLoad] = useState(false)
  let [apiError, setapiError] = useState("")

  let { register, handleSubmit, formState: { errors, touchedFields }
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
      username:""
    },
    resolver: zodResolver(schema),
    mode: "onBlur"
  })

  const navigate = useNavigate()

  async function sendData(data) {
    setLoad(true)
    const res = await signUp(data)
    setLoad(false)
    // console.log(res);
    
    if (res.message === "account created") {
      navigate("/login")
    } else {
      setapiError(res.errors)

    }
  }
  return (
    <>
      <Helmet>
        <title>register</title>
      </Helmet>
      <div className='bg-white py-10 shadow-2xl mt-10 rounded-2xl min-w-md'>
        <h1 className='text-2xl text-center mb-4'>Register Now</h1>
        <form onSubmit={handleSubmit(sendData)} className='flex flex-col gap-4 px-12 sm:px-4'>
          <Input label="Name" type="text" isInvalid={Boolean(errors.name && touchedFields.name)} errorMessage={errors.name?.message} variant='bordered' {...register("name")} />
          <Input label="Username" type="text" isInvalid={Boolean(errors.username && touchedFields.username)} errorMessage={errors.username?.message} variant='bordered' {...register("username")} />
          <Input label="Email" type="email" isInvalid={Boolean(errors.email && touchedFields.email)} errorMessage={errors.email?.message} variant='bordered' {...register("email")} />
          <Input label="Password" type="password" isInvalid={Boolean(errors.password && touchedFields.password)} errorMessage={errors.password?.message} variant='bordered' {...register("password")} />
          <Input label="Repassword" type="password" isInvalid={Boolean(errors.rePassword && touchedFields.rePassword)} errorMessage={errors.rePassword?.message} variant='bordered' {...register("rePassword")} />
          <div className='flex'>
            <Input label="DateOfBirth" type="date" isInvalid={Boolean(errors.dateOfBirth && touchedFields.dateOfBirth)} errorMessage={errors.dateOfBirth?.message} variant='bordered'  {...register("dateOfBirth")} />
            <Select label="Gender" isInvalid={Boolean(errors.gender && touchedFields.gender)} errorMessage={errors.gender?.message} variant='bordered'  {...register("gender")}>

              <SelectItem key={"male"}>Male</SelectItem>
              <SelectItem key={"female"}>Female</SelectItem>

            </Select>
          </div>
          <Button isLoading={load} disabled={load} type='submit' size="md">Register</Button>
          {apiError ? <p className='text-center text-danger-500'>{apiError}</p> : ""}
          <div className='text-center'>Have an account? <Link to="/login" className='text-blue-500'>Login</Link></div>
        </form>
      </div>
    </>
  )
}
