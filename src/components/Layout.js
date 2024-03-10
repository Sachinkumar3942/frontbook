import React from 'react'
import Nav from './Nav'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className=' py-4 px-8 flex flex-col min-h-screen'>
        <Nav/>
        <Outlet/>
    </div>
  )
}

export default Layout