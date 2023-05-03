import React, { useState, useEffect } from 'react'
import './student-overview.styles.scss'
import StudentInfo from '../student-info/student-info'
import { Outlet } from 'react-router'
import { Link } from 'react-router-dom'

function StudentOverview({ student }) {
  if (student) {
    return (
      <div>
        <div className="overview-links-container">
          <Link className="overview-link" to="info">
            Info
          </Link>
          <Link className="overview-link" to="plan">
            Plan
          </Link>
        </div>
        <Outlet />
      </div>
    )
  }
}

export default StudentOverview
