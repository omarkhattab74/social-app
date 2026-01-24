import React from 'react'
// import Navbar from './../componentes/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './../componentes/Footer';
import Nav from './../componentes/Navbar';



export default function Mainlayout() {
  return (
    <>
      <Nav/>
    <Outlet/>
    {/* <Footer/> */}
    </>
  )
}
