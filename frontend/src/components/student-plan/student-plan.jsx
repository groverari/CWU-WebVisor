import React, { useEffect, useState } from 'react'
import './student-plan.styles.scss'
import Select from 'react-select'
import axios from 'axios'
import ClassSelector from '../class-selector/class-selector'

function StudentPlan() {
  const [classes, setClasses] = useState(0)
  /*
  const [fallClasses, setFall] = useState(0)
  const [winterClasses, setWinter] = useState(0)
  const [springClasses, setSpring] = useState(0)
  const [summerClasses, setSummer] = useState(0)
*/
  let api_url = import.meta.env.VITE_API_URL
  useEffect(() => {
    axios
      .post(api_url + 'Class.php', { request: 'all_active_classes' })
      .then((res) => setClasses(res.data))
  }, [])
  return <ClassSelector title="test" classes={classes} />
}

export default StudentPlan
