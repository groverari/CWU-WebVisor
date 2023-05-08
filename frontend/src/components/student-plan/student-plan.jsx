import React, { useEffect, useState } from 'react'
import './student-plan.styles.scss'
import Select from 'react-select'
import axios from 'axios'

function StudentPlan() {
  const [classes, setClasses] = useState(0)
  const [fallClasses, setFall] = useState(0)
  const [winterClasses, setWinter] = useState(0)
  const [springClasses, setSpring] = useState(0)
  const [summerClasses, setSummer] = useState(0)

  let api_url = import.meta.env.VITE_API_URL
  useEffect(() => {
    axios
      .get(api_url + 'Class.php?request=every_active_class')
      .then((res) => setClasses(res.data))
  }, [])
  return <h1>Student Plan Here</h1>
}

export default StudentPlan
