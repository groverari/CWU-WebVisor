import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './submenu.styles.scss'

const SubMenu = (props) => {
  const location = useLocation()
  const baseurl = props.baseurl
  const { links } = props

  const [activeLink, setActiveLink] = useState(sessionStorage.getItem('link'))

  const handleLinkClick = (link) => {
    sessionStorage.setItem('link', activeLink)
    setActiveLink(link)
  }

  const clickedStyle = {
    backgroundColor: '#745cab'
  }

  const unclickedStyle = {
    backgroundColor: '#b092ff',
    color: 'black'
  }
  return (
    <div className="submenu-container">
      <h3>Submenu</h3>
      {links.map((link) => {
        return (
          <div className="submenu-link-container" key={link.key}>
            <Link
              className={
                location.pathname.includes(link.path)
                  ? 'submenu-link-clicked'
                  : 'submenu-link-unclicked'
              }
              to={baseurl + link.path}
              onClick={() => handleLinkClick(link.name)}
            >
              {link.name}
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default SubMenu
