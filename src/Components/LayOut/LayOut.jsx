import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import SideBar from '../SideBar/SideBar'

const LayOut = () => {
  return (
    <main>
      <Header/>
      <SideBar/>
      <Outlet/>
    </main>
  )
}

export default LayOut
