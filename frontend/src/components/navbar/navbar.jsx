import { Link, Outlet } from 'react-router-dom'
import { GiGears } from 'react-icons/gi'
import React, { useState } from 'react';
//import React from 'react'
import './navbar.styles.scss'
import '../../App.scss';

const NavBar = () => {

  const [activeLink, setActiveLink] = useState('students');

  const handleLinkClick = (link) => 
  {
    setActiveLink(link);

  };

  const clickedStyle ={
    backgroundColor: '#745cab',
  }

  const unclickedStyle ={
    backgroundColor: '#b092ff',
    color: 'black'
  }

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
      <Link className="nav-link" to="/home/students/search" onClick={() => handleLinkClick('students')} style={activeLink === 'students' ? unclickedStyle  : clickedStyle}>
          Students
        </Link>
        <Link className="nav-link" to="/home/class" onClick={() => handleLinkClick('class')}style={activeLink === 'class' ? unclickedStyle  : clickedStyle}>
          Classes
        </Link>
        <Link className="nav-link" to="/home/major" onClick={() => handleLinkClick('major')}style={activeLink === 'major' ? unclickedStyle  : clickedStyle}>
          Majors
        </Link>
        <Link className="nav-link" to="/home/enrollments" onClick={() => handleLinkClick('enrollments')}style={activeLink === 'enrollments' ? unclickedStyle  : clickedStyle}>
          Enrollments
        </Link>
      </div>

      <Outlet />
    </>
  )
}
export default NavBar


