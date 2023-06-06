import { Link, Outlet } from 'react-router-dom'
import React from 'react'
import './major.page.styles.scss'
import SubMenu from '../../../components/submenu/submenu'

const MajorPage = () => {
  // Base URL for the major page
  const baseurl = '/home/major'

  // Array of submenu links. the name is what the user will click and the path is the actual URL
  const links = [
    {
      key: 1,
      name: 'Major Search',
      path: '/eMajor' 
    },
    {
      key: 2,
      name: 'Add Major',
      path: '/addmajor'
    },
    {
      key: 3,
      name: 'Program Search',
      path: '/eProgram'
    },
    {
      key: 4,
      name: 'Add Program',
      path: '/addprogram'
    }
  ]

  return (
    <div className="page-container">
      <div>
        {/* Render the SubMenu component */}
        <SubMenu
          className="submenu"
          title="Majors"
          baseurl={baseurl}
          links={links}
        />
      </div>
      <div className="major-page-wrapper">
        {/* Render the content of the nested routes */}
        <Outlet className="page-content" />
      </div>
    </div>
  )
}

export default MajorPage
