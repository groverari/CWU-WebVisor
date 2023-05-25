import { Link, Outlet } from 'react-router-dom'
import React from 'react'
import './user.styles.scss'
import SubMenu from '../../../components/submenu/submenu'

const AdminPage = () => {
  const baseurl = '/home/class'
  const links = [
    {
      key: 1,
      name: 'User Search',
      path: '/search'
    },
    {
      key: 2,
      name: 'User Add',
      path: '/add'
    }
  ]
  return (
    <div className="page-container">
      <div>
        <SubMenu
          className="submenu"
          title="Admin"
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
export default AdminPage
