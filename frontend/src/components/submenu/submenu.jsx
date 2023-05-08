import React from 'react'
import { Link } from 'react-router-dom'
import './submenu.styles.scss'

const SubMenu = (props) => {
  const baseurl = props.baseurl
  const { links } = props

  const clickedStyle ={
    backgroundColor: '#745cab',
  }

  const unclickedStyle ={
    backgroundColor: 'white',
    color: 'black'
  }
  return (
    <div className="submenu-container">
      {links.map((link) => {
        return (
          <div className="submenu-link-container" key={link.key}>
            <Link className="submenu-link" to={baseurl + link.path}>
              {link.name}
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default SubMenu
