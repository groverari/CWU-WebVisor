import React, { useEffect, useState } from 'react'
import './student-plan.styles.scss'
import Select from 'react-select'
import axios from 'axios'
import ClassSelector from '../class-selector/class-selector'
import PlanClassSelector from '../plan-class-selector/plan-class-selector'

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
    classArr.push(i)
  }

  const [classes, setClasses] = useState(0)
  const [fallClasses, setFall] = useState([])
  const [winterClasses, setWinter] = useState([])
  const [springClasses, setSpring] = useState([])
  const [summerClasses, setSummer] = useState([])

  let api_url = import.meta.env.VITE_API_URL
  useEffect(() => {
    axios
      .post(api_url + 'Class.php', { request: 'all_active_classes' })
      .then((res) => {
        //console.log(res.data[0].fall)
        setClasses(res.data)
      })
  }, [])

  useEffect(() => {
    if (classes) {
      setFall(
        classes.filter((clss) => {
          //console.log(clss.fall)
          return clss.fall == 'Yes'
        })
      )

      setWinter(
        classes.filter((clss) => {
          return clss.winter == 'Yes'
        })
      )

      setSpring(
        classes.filter((clss) => {
          return clss.spring == 'Yes'
        })
      )
      setSummer(
        classes.filter((clss) => {
          return clss.summer == 'Yes'
        })
      )
    }
  }, [classes])

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
          <div className="plan-class-year" key={term}>
            <PlanClassSelector
              className="selector"
              year={term}
              quarter={1}
              classes={fallClasses}
            />
            <PlanClassSelector
              className="selector"
              year={term + 1}
              quarter={2}
              classes={winterClasses}
            />
            <PlanClassSelector
              className="selector"
              year={term + 1}
              quarter={3}
              classes={springClasses}
            />
            <PlanClassSelector
              className="selector"
              year={term + 1}
              quarter={4}
              classes={summerClasses}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default StudentPlan
