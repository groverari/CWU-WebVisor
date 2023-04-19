import { Link, Outlet } from 'react-router-dom'
import React from 'react'
import './class.styles.scss'

const ClassPage = () => {
  return (
    <>
      <div className="submenu">
        <Link className="Search Link" to="/home/class/search">
          <button className="sub-menu-button">Class Search</button>
        </Link>
        <Link className="Search Link" to="/home/class/add">
          <button className="sub-menu-button">Add Class</button>
        </Link>
      </div>
      <Outlet />
    </>
  )
}
export default ClassPage
