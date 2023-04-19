import { Link, Outlet } from 'react-router-dom'
import React from 'react'
import './student-page.styles.scss'

const StudentPage = () => {
  return (
    <>
      <div className="submenu">
        <Link className="Search Link" to="/home/students/search">
          <button className="sub-menu-button">Student Search</button>
        </Link>
        <Link className="Search Link" to="/home/students/add">
          <button className="sub-menu-button">Add Student</button>
        </Link>
        <Link className="Search Link" to="/home/students/archived">
          <button className="sub-menu-button">Archived Student</button>
        </Link>
        <Link className="Search Link" to="/home/students/lost">
          <button className="sub-menu-button">Lost Students</button>
        </Link>
      </div>
      <Outlet />
    </>
  )
}
export default StudentPage
