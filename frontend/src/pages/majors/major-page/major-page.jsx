import { Link, Outlet } from 'react-router-dom'
import React from 'react'
import './major.page.styles.scss'
import SubMenu from '../../../components/submenu/submenu'

const MajorPage = () => {
  const baseurl = '/home/major'
  const links = [
    {
      key: 1,
      name: 'Edit Major',
      path: ''
    },
    {
      key: 2,
      name: 'Edit Program',
      path: '/program'
    }
  ]
  return (
    <div className="page-container">
      <SubMenu className="submenu" baseurl={baseurl} links={links} />
      <Outlet className="page-content" />
    </div>
  )
}
export default MajorPage
