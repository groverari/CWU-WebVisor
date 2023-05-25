import { Link, Outlet } from 'react-router-dom'
import React from 'react'
import './class.styles.scss'
import SubMenu from '../../../components/submenu/submenu'

const ClassPage = () => {
  const baseurl = '/home/class'
  const links = [
    {
      key: 1,
      name: 'Class Search',
      path: '/search'
    },
    {
      key: 2,
      name: 'Add class',
      path: '/add'
    }
  ]
  return (
    <div className="page-container">
      <div>
        <SubMenu
          className="submenu"
          title="Classes"
          baseurl={baseurl}
          links={links}
        />
      </div>

      <div className="page-content">
        <Outlet />
      </div>
    </div>
  )
}
export default ClassPage
