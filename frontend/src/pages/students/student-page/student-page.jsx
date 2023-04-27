import { Link, Outlet } from 'react-router-dom'
import React from 'react'
import './student-page.styles.scss'
import SubMenu from '../../../components/submenu/submenu'

const baseurl = '/home/students'
const links = [
  {
    key: 1,
    name: 'Student Search',
    path: '/search'
  },
  {
    key: 2,
    name: 'Add Student',
    path: '/add'
  },
  {
    key: 3,
    name: 'Achived Students',
    path: '/archived'
  },
  {
    key: 4,
    name: 'Lost Students',
    path: '/lost'
  }
]
const StudentPage = () => {
  return (
    <div className="page-container">
      <div className="submenu-page-container">
        <SubMenu className="submenu" baseurl={baseurl} links={links} />
      </div>
      <div className="page-content-container">
        <Outlet className="page-content" />
      </div>
    </div>
  )
}
export default StudentPage
