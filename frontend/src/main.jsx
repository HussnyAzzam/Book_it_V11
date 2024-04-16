import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import { endPoints } from './endpoint'
import Home from './Home'
import './index.css'
import { apiRequestHandler } from '../apiReqHandler'
import Business from './Business'
import Categories from './Categories'
import Person from './Person'
import BusinessBranch from './BusinessBranch'
import Package from './Package'
import Services from './Services'
import Users from './User'
import AdminUser from './AdminUser'
import Appointment from './Appointment'
import Dictionary from './Dictionary'
import ExternalCustomers from './ExternalCustomers'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'home', element: <Home />,
        loader: async () => {
          return apiRequestHandler('/files/all', 'GET')
        }
      },
      {
        path: 'business', element: <Business />,
        loader: async () => {
          return apiRequestHandler(endPoints.business.GET_ALL, 'GET')
        }
      },
      {
        path: 'categories', element: <Categories />,
        loader: async () => {
          return apiRequestHandler(endPoints.categories.GET_ALL, 'GET')
        }
      },
      {
        path: 'persons', element: <Person />,
        loader: async () => {
          return apiRequestHandler(endPoints.persons.GET_ALL, 'GET')
        }
      },
      {
        path: 'business-branch', element: <BusinessBranch />,
        loader: async () => {
          return apiRequestHandler(endPoints.businessBranch.GET_ALL, 'GET')
        }
      },
      {
        path: 'package', element: <Package />,
        loader: async () => {
          return apiRequestHandler(endPoints.package.GET_ALL, 'GET')
        }
      },
      {
        path: 'services', element: <Services />,
        loader: async () => {
          return apiRequestHandler(endPoints.services.GET_ALL, 'GET')
        }
      },
      {
        path: 'users', element: <Users />,
        loader: async () => {
          return apiRequestHandler(endPoints.user.GET_ALL, 'GET')
        }
      },
      {
        path: 'admin-user', element: <AdminUser />,
        loader: async () => {
          return apiRequestHandler(endPoints.adminUser.GET_ALL, 'GET')
        }
      },
      {
        path: 'appointment', element: <Appointment />,
        loader: async() => {
          return apiRequestHandler(endPoints.appointment.GET_ALL, 'GET')
        }
      },
      {
        path: 'dictionary', element: <Dictionary />,
        loader: async () => {
          return apiRequestHandler(endPoints.dictionary.GET_ALL, 'GET')
        }
      },
      {
        path: 'external-customers', element: <ExternalCustomers />,
        loader: async () => {
          return apiRequestHandler(endPoints.externalCustomers.GET_ALL, 'GET')
        }
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div>
      <ToastContainer />
      <RouterProvider router={router}>
      </RouterProvider>
    </div>
  </React.StrictMode>,
)
