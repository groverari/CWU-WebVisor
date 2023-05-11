import React from 'react'
import './class-search.styles.scss'
import SearchBox from '../../../components/search-box/search-box'
import { useState, useEffect } from 'react'

const ClassSearch = () => {
  const [classes, setClasses] = useState(0)
  let api_url = import.meta.env.VITE_API_URL
  useEffect(() => {
    axios
      .post(api_url + 'Class.php', { request: 'all_active_classes' })
      .then((res) => setClasses(res.data))
  }, [])
  return <ClassSelector title="test" classes={classes} />
}

export default ClassSearch
