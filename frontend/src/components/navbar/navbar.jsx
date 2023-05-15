import { Link, Outlet, useLocation } from 'react-router-dom'
import { GiGears } from 'react-icons/gi'
import React, { useState } from 'react';
//import React from 'react'
import './navbar.styles.scss'
import '../../App.scss';
import ConfPopUp from '../PopUp/confirmation/confPopUp';
import ErrorPopUp from '../PopUp/error/ErrorPopUp';
import superUser from "../../pages/login-page/login.page";

const NavBar = () => {

  const location = useLocation();
  const superUser = JSON.parse(localStorage.getItem('superUser'));
  console.log(superUser);
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
        {superUser && <Link>Admin </Link>}
        <Link className={location.pathname.includes('students') ? 'nav-link-clicked'  : 'nav-link-unclicked'} to="/home/students/search">
          Students
        </Link>
        <Link className={location.pathname.includes('class') ? 'nav-link-clicked'  : 'nav-link-unclicked'} to="/home/class/search" >
          Classes
        </Link>
        <Link className={location.pathname.includes('major') ? 'nav-link-clicked'  : 'nav-link-unclicked'} to="/home/major/eMajor" >
          Majors
        </Link>
        <Link className={location.pathname.includes('enrollments') ? 'nav-link-clicked'  : 'nav-link-unclicked'} to="/home/enrollments" >
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


