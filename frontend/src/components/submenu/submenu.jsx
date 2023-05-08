import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './submenu.styles.scss'

const SubMenu = (props) => {
  const baseurl = props.baseurl
  const { links } = props

  const [activeLink, setActiveLink] = useState(null);

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
    <div className="submenu-container">
      {links.map((link) => {
        return (
          <div className="submenu-link-container" key={link.key}>
            <Link className={`submenu-link ${activeLink === link.name ? 'active':''}`} to={baseurl + link.path} onClick={() => handleLinkClick(link.name)} style={activeLink === link.name ? { ...clickedStyle, ...unclickedStyle } : clickedStyle}>
              {link.name}
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default SubMenu
