import { Link, Outlet } from 'react-router-dom'
import React from 'react'

const NavBar = () => {
  return (
    <>
      <div className="link-contianer">
        <Link to="/home/students">
          <button>Students</button>
        </Link>
        <Link to="/home/classes">
          <button>Classes</button>
        </Link>
        <Link to="/home/programs">
          <button>Programs</button>
        </Link>
        <Link to="/home/enrollments">
          <button>Enrollments</button>
        </Link>
        <Link to="/home/settings">
          <button>Programs</button>
        </Link>
      </div>

      <Outlet />
    </>
  )
}
export default NavBar
