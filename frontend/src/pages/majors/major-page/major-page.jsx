import { Link, Outlet } from 'react-router-dom'
import React from 'react'
import './major.page.styles.scss'
import SubMenu from '../../../components/submenu/submenu'

const MajorPage = () => {
  const baseurl = '/home/major'
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
        <SubMenu
          className="submenu"
          title="Majors"
          baseurl={baseurl}
          links={links}
        />
      </div>
      <Outlet className="page-content" />
    </div>
  )
}
export default MajorPage
