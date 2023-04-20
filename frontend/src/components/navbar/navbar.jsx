import { Link, Outlet } from 'react-router-dom'
import { GiGears } from 'react-icons/gi'
import React from 'react'
import './navbar.styles.scss'

const NavBar = () => {
  return (
    <>
      <div className="header">
        <div className="title-container">
          <h1 className="title">WebVisor</h1>
        </div>

        <div className="username-container">
          <h2 className="username">Hi Ariesh</h2>
          <GiGears className="settings-logo" />
        </div>
      </div>
      <div className="nav-link-container">
        <Link className="nav-link" to="/home/students">
          Students
        </Link>
        <Link className="nav-link" to="/home/class">
          Classes
        </Link>
        <Link className="nav-link" to="/home/major">
          Majors
        </Link>
        <Link className="nav-link" to="/home/enrollments">
          Enrollments
        </Link>
      </div>

      <Outlet />
    </>
  )
}
export default NavBar
