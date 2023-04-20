import { Link, Outlet } from 'react-router-dom'
import React from 'react'
import './student-page.styles.scss'
import SubMenu from '../../../components/submenu/submenu'

const StudentPage = () => {
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
      path: '/sdd'
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
  return (
    <>
      <SubMenu baseurl={baseurl} links={links} />
      <Outlet />
    </>
  )
}
export default StudentPage
