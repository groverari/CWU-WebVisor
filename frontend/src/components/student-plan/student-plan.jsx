import React, { useEffect, useState } from 'react'
import './student-plan.styles.scss'

import axios from 'axios'

function StudentPlan() {
  const [startYear, setStartYear] = useState(0)
  const [endYear, setEndYear] = useState(0)

  //Code here to set start year if the database has an earlier start year
  useEffect(() => {
    setStartYear(2023)
  }, [])

  // Code here to set end year as the maximum of last end year
  // found in the database or the start year + 4
  useEffect(() => {
    setEndYear(2027)
  }, [])

  /**
   * This will create the model array for all the years + the quarter
   * 1 = fall
   * 2 = winter
   * 3 = spring
   * 4 = summer
   * */
  const classArr = []
  for (let i = startYear; i < endYear; i++) {
    let temp = { year: i, quarters: [1, 2, 3, 4] }
    classArr.push(temp)
  }

  const [classes, setClasses] = useState(0)

  let api_url = import.meta.env.VITE_API_URL
  useEffect(() => {
    axios
      .post(api_url + 'Class.php', { request: 'all_active_classes' })
      .then((res) => {
        //console.log(res.data[0].fall)
        setClasses(res.data)
      })
  }, [])

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
        {classArr.map((term) => (
          <div key={term.year} className="year-div-plan">
            {term.quarters.map((quarter) => (
              <h1 key={quarter}>{term.year + ' ' + quarter}</h1>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default StudentPlan
