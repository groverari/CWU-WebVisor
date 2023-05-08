import React, { useState, useEffect } from 'react'
import './student-overview.styles.scss'
import StudentInfo from '../student-info/student-info'
import { Outlet } from 'react-router'
import { Link } from 'react-router-dom'

function StudentOverview({ student }) {
  const [students, setStudents] = useState(student)

  if (students) {
    return (
      <div>
        <Link to="home/student/search">Return</Link>
      </div>
    )
  }
}

export default StudentOverview
