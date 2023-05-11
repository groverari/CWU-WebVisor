import React, { useEffect, useState } from 'react'
import './student-plan.styles.scss'
import Select from 'react-select'
import axios from 'axios'
import ClassSelector from '../class-selector/class-selector'

function StudentPlan() {
  const [startYear, setStartYear] = useState(0)
  const [endYear, setEndYear] = useState(0)

  //Code here to set start year if the database has an earlier start year
  setStartYear(2023)

  // Code here to set end year as the maximum of last end year
  // found in the database or the start year + 4

  setEndYear(2027)

  /*
  const [classes, setClasses] = useState(0)
  const [fallClasses, setFall] = useState(0)
  const [winterClasses, setWinter] = useState(0)
  const [springClasses, setSpring] = useState(0)
  const [summerClasses, setSummer] = useState(0)

  let api_url = import.meta.env.VITE_API_URL
  useEffect(() => {
    axios
      .post(api_url + 'Class.php', { request: 'all_active_classes' })
      .then((res) => setClasses(res.data))
  }, [])
  */
  return (
    <div>
      <h3>Plan</h3>
      <div className="year-container">
        {/**drop down to denote the start and end year  */}
      </div>
      <div className="plan-class-container">
        {/**component to create a list of classes
         * need to use an array
         */}
      </div>
    </div>
  )
}

export default StudentPlan
