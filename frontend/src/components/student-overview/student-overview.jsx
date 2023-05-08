import React, { useState, useEffect } from 'react'
import './student-overview.styles.scss'
import StudentInfo from '../student-info/student-info'
import { Outlet } from 'react-router'
import { Link } from 'react-router-dom'

function StudentOverview({ student }) {
  const [students, setStudents] = useState(student)

  useEffect(() => {
    setStudents(student)
  }, [students])

  if (students) {
    return (
      <div>
        <div className="overview-links-container">
          <StudentInfo student={students} />
        </div>
      </div>
    )
  }
}

export default StudentOverview
