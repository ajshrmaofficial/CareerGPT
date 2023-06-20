import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import App from './components/App.jsx'
import './css/index.css'
import Login from './components/Login.jsx'
import Dashboard from './components/Dashboard.jsx'
import Register from './components/Register.jsx'
import LandingPage from './components/LandingPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <LandingPage/>
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/dashboard',
        element: <Dashboard/>
      },
      {
        path: '/register',
        element: <Register/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
