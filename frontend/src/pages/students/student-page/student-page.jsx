import { Link, Outlet } from 'react-router-dom'
import React from 'react'
import './student-page.styles.scss'
import SubMenu from '../../../components/submenu/submenu'

const baseurl = '/home/students' // Base URL for student page
const links = [
  {
    key: 1,
    name: 'Student Search', //actual button name
    path: '/search' // URL path for student search
  },
  {
    key: 2,
    name: 'Add Student',//actual button name
    path: '/add' // URL path for adding a student
  },
  {
    key: 3,
    name: 'Archived Students',//actual button name
    path: '/archived' // URL path for archived students
  },
  {
    key: 4,
    name: 'Lost Students',//actual button name
    path: '/lost' // URL path for lost students
  }
]
const StudentPage = () => {
  return (
    <div className="page-container">
      <div className="submenu-page-container">
        <SubMenu
          className="submenu"
          title="Students"
          baseurl={baseurl} // Base URL for submenu links
          links={links} // Array of submenu links
        />
      </div>
      <div className="page-content-container">
        <Outlet className="page-content" />
      </div>
    </div>
  )
}
export default StudentPage
