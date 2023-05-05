import { Link, Outlet } from 'react-router-dom'
import { GiGears } from 'react-icons/gi'
import React, { useState } from 'react';
//import React from 'react'
import './navbar.styles.scss'
import '../../App.scss';

const NavBar = () => {

  const [activeLink, setActiveLink] = useState(null);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    
  };

  const clickedStyle ={
    backgroundColor: '#745cab',
  }

  const unclickedStyle ={
    backgroundColor: 'white',
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
      <Link className={`nav-link ${activeLink === 'students' ? 'active' : ''}`} to="/home/students/search" onClick={() => handleLinkClick('students')} style={activeLink === 'students' ? { ...clickedStyle, ...unclickedStyle } : clickedStyle}>
          Students
        </Link>
        <Link className={`nav-link ${activeLink === 'class' ? 'active' : ''}`} to="/home/class" onClick={() => handleLinkClick('class')}style={activeLink === 'class' ? { ...clickedStyle, ...unclickedStyle } : clickedStyle}>
          Classes
        </Link>
        <Link className={`nav-link ${activeLink === 'major' ? 'active' : ''}`} to="/home/major" onClick={() => handleLinkClick('major')}style={activeLink === 'major' ? { ...clickedStyle, ...unclickedStyle } : clickedStyle}>
          Majors
        </Link>
        <Link className={`nav-link ${activeLink === 'enrollments' ? 'active' : ''}`} to="/home/enrollments" onClick={() => handleLinkClick('enrollments')}style={activeLink === 'enrollments' ? { ...clickedStyle, ...unclickedStyle } : clickedStyle}>
          Enrollments
        </Link>
      </div>

      <Outlet />
    </>
  )
}
export default NavBar

// import { Link, Outlet } from 'react-router-dom'
// import { GiGears } from 'react-icons/gi'
// import React, { useState } from 'react';
// import '../../App.scss';
// import './navbar.styles.scss';

// const NavBar = () => {

//   const [activeLink, setActiveLink] = useState(null);

//   const handleLinkClick = (link) => {
//     setActiveLink(link);
//   };

//   const linkStyle = {
//     width: '25%',
//     backgroundColor: 'button-color',
//     textAlign: 'center',
//     margin: '2px',
//     borderRadius: '12px',
//     fontSize: '20px',
//     textDecoration: 'none',
//     color: 'black', 
//     border: '2px solid black',
//     paddingTop: '10px',
//     transitionTimingFunction: 'ease-in',
//     transition: 'scale, font-size 0.2s'
//   };

//   const activeLinkStyle = {
//     backgroundColor: 'blue', 
//     color: 'black', 
//     fontSize: '22px',
//     transform: 'scale(1.05)'
//   };

//   return (
//     <>
//       <div className="header">
//         <div className="title-container">
//           <h1 className="title">WebVisor</h1>
//         </div>

//         <div className="username-container">
//           <h2 className="username">Hi Ariesh</h2>
//           <GiGears className="settings-logo" />
//         </div>
//       </div>
//       <div className="nav-link-container">
//         <Link
//           style={activeLink === 'students' ? { ...linkStyle, ...activeLinkStyle } : linkStyle}
//           to="/home/students/search"
//           onClick={() => handleLinkClick('students')}
//         >
//           Students
//         </Link>
//         <Link
//           style={activeLink === 'class' ? { ...linkStyle, ...activeLinkStyle } : linkStyle}
//           to="/home/class"
//           onClick={() => handleLinkClick('class')}
//         >
//           Classes
//         </Link>
//         <Link
//           style={activeLink === 'major' ? { ...linkStyle, ...activeLinkStyle } : linkStyle}
//           to="/home/major"
//           onClick={() => handleLinkClick('major')}
//         >
//           Majors
//         </Link>
//         <Link
//           style={activeLink === 'enrollments' ? { ...linkStyle, ...activeLinkStyle } : linkStyle}
//           to="/home/enrollments"
//           onClick={() => handleLinkClick('enrollments')}
//         >
//           Enrollments
//         </Link>
//       </div>
//       <Outlet />
//     </>
//   );
// }

// export default NavBar;

