import { Outlet } from 'react-router-dom';
import Nav from './../componentes/Navbar';



export default function Mainlayout() {
  return (
    <>
      <Nav/>
    <Outlet/>
    </>
  )
}
