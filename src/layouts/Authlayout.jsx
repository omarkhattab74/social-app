import React from 'react'
import { Outlet } from 'react-router-dom';
import Nav from '../componentes/Navbar';

export default function Authlayout() {
  return (
    <>
     <Nav/>
    <div className='flex justify-center items-center min-h-screen bg-gray-200'>
      <Outlet/>
    </div>
    </>
   
  )
}
