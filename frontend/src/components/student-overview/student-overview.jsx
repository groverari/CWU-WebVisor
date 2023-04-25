import React, { useState, useEffect } from 'react'
import './student-overview.styles.scss'
import StudentInfo from '../student-info/student-info'

function StudentOverview({ student }) {
  const [info, setInfo] = useState(true)
  const [plan, setPlan] = useState(false)

  const tabBtnHandler = (information, planchange) => {
    setInfo(information)
    setPlan(planchange)
  }

  return (
    <div>
      <button
        onClick={() => {
          tabBtnHandler(true, false)
        }}
      >
        Info
      </button>
      <button
        onClick={() => {
          tabBtnHandler(false, true)
        }}
      >
        Plan
      </button>
      <StudentInfo active={info} student={student} />
    </div>
  )
}

export default StudentOverview
