import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import SignIn from './pages/SignInPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import { Toaster } from 'react-hot-toast';
import {UserProvider} from './hooks/useUser.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import PrivateRoute from './hooks/PrivateRoute.jsx'



const router = createBrowserRouter([
  {
    path:"/",
    element: <App/>,
    children:[
      {
        path:"/register",
        element: <SignUpPage/>
      },
      {
        path:"/login",
        element: <SignIn/>  
      },

      {
        
        path:"/dashboard",
         element: <DashboardPage/>
         
         
      }
    ]
  }

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
    <Toaster />
    <RouterProvider router = {router}/>
    </UserProvider>
  </React.StrictMode>,
)
