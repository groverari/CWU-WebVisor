import { Link, Outlet, useLocation, Navigate } from 'react-router-dom'
import { GiGears } from 'react-icons/gi'
import React, { useEffect, useState } from 'react'
import './navbar.styles.scss'
import '../../App.scss'
import ConfPopUp from '../PopUp/confirmation/confPopUp'
import ErrorPopUp from '../PopUp/error/ErrorPopUp'
import superUser from '../../pages/login-page/login.page'
import { set } from 'react-hook-form'

const NavBar = () => {
  const [loggedIn, setLogged] = useState(true)
  const location = useLocation()
  const superUser = JSON.parse(localStorage.getItem('superUser'))

  //This checks if the user has logged in
  useEffect(() => {
    if (localStorage.getItem('userId') == null) {
      console.log(localStorage.getItem('userId'))
      setLogged(false)
    }
  }, [])

  return (
    <>
      {!loggedIn && <Navigate to="/" replace={true} />}
      <div className="header">
        <div className="title-container">
          <h1 className="title">WebVisor</h1>
        </div>

        <div className="username-container">
          <h2 className="username">Hi {localStorage.getItem('name')}</h2>
          <GiGears className="settings-logo" />
        </div>
      </div>
      <div className="nav-link-container">
        {superUser && (
          <Link
            className={
              location.pathname.includes('admin')
                ? 'nav-link-clicked'
                : 'nav-link-unclicked'
            }
          >
            Admin{' '}
          </Link>
        )}
        <Link
          className={
            location.pathname.includes('students')
              ? 'nav-link-clicked'
              : 'nav-link-unclicked'
          }
          to="/home/students/search"
        >
          Students
        </Link>
        <Link
          className={
            location.pathname.includes('class')
              ? 'nav-link-clicked'
              : 'nav-link-unclicked'
          }
          to="/home/class/search"
        >
          Classes
        </Link>
        <Link
          className={
            location.pathname.includes('major')
              ? 'nav-link-clicked'
              : 'nav-link-unclicked'
          }
          to="/home/major/eMajor"
        >
          Majors
        </Link>
        <Link
          className={
            location.pathname.includes('enrollments')
              ? 'nav-link-clicked'
              : 'nav-link-unclicked'
          }
          to="/home/enrollments"
        >
          Enrollments
        </Link>
      </div>
      {/* <div>
            <ConfPopUp action = "deactivate"/>
      </div> */}
      <Outlet />
    </>
  )
}
export default NavBar
