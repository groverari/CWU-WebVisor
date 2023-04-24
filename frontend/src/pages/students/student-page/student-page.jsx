import { Link, Outlet } from 'react-router-dom'
import React from 'react'
import './student-page.styles.scss'
import SubMenu from '../../../components/submenu/submenu'

const baseurl = '/home/students'
const links = [
  {
    key: 1,
    name: 'Student Search',
    path: ''
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
      <SubMenu className="submenu" baseurl={baseurl} links={links} />
      <Outlet className="page-content" />
    </div>
  )
}
export default StudentPage
