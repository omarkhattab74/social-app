import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Mainlayout from './layouts/Mainlayout'
import Authlayout from './layouts/Authlayout'
import Feed from './pages/Feed'
import Profile from './pages/Profile'
import Notfound from './pages/Notfound'
import Postdetailes from './pages/Postdetailes'
import Login from './pages/Login';
import Register from './pages/Register'
import { Usertokenprovider } from './context/Tokencontext'
import Protectroute from './componentes/protectRoute/Protectroute'
import { Postscontextprovider } from './context/postsContext'
import Userdtacontextprovider from './context/Userdtacontext'
import { Toaster } from 'react-hot-toast'

const route = createBrowserRouter([
  {
    path: "", element: <Mainlayout />, children: [
      { index: true, element: <Protectroute><Feed /></Protectroute> },
      { path: "profile", element: <Protectroute><Profile /></Protectroute> },
      { path: "post-detailes/:id", element: <Protectroute><Postdetailes /></Protectroute> },
      { path: "*", element: <Notfound /> },
    ]
  },
  {
    path: "", element: <Authlayout />, children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ]
  },
])

export default function App() {
  return (

    <>

      <Usertokenprovider>
        <Postscontextprovider>
          <Userdtacontextprovider>
            <Toaster></Toaster>
            <RouterProvider router={route}></RouterProvider>
          </Userdtacontextprovider>
        </Postscontextprovider>
      </Usertokenprovider>
    </>
  )
}
