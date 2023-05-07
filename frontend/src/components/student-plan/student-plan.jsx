import React, { useEffect, useState } from 'react'
import './student-plan.styles.scss'
import Select from 'react-select'
import api_url from '../../API/API_assets'
import axios from 'axios'

function StudentPlan() {
  const [classes, setClasses] = useState(0)
  const [fallClasses, setFall] = useState(0)
  const [winterClasses, setWinter] = useState(0)
  const [springClasses, setSpring] = useState(0)
  const [summerClasses, setSummer] = useState(0)
  useEffect(() => {
    axios
      .get(api_url + 'Class.php?request=every_active_class')
      .then((res) => setClasses(res.data))
  }, [])
  console.log(classes)
}

export default StudentPlan
