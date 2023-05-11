import React from 'react'
import './class-search.styles.scss'
import SearchBox from '../../../components/search-box/search-box'
import { useState, useEffect } from 'react'
import axios from 'axios'
import ClassSelector from '../../../components/class-selector/class-selector'

const ClassSearch = () => {
  const [classes, setClasses] = useState([])
  const [searchClasses, setSearchClasses] = useState([])
  const [selectedClass, setSelectedClass] = useState(0)

  let api_url = import.meta.env.VITE_API_URL

  //how do you get class fromt the data base;

  useEffect(() => {
    axios
      .post(api_url + 'Class.php', { request: 'all_active_classes' })
      .then((res) => {
        setClasses(res.data)
        setSearchClasses(res.data) //set searchClasses to all classes initially
      })
  }, [])

  const handleSearch = (inputValue) => {
    const filteredClasses = classes.filter((classItem) => {
      // Perform search based on class properties (e.g., name, code, etc.)
      return (
        classItem.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        classItem.code.toLowerCase().includes(inputValue.toLowerCase())
        // Add more conditions if needed
      )
    })

    setSearchClasses(filteredClasses)
  }

  return (
    <div className="class-search-container">
      <h1>Class Search</h1>
      <SearchBox
        list={searchClasses}
        placeholder="Search for a class"
        value="Search"
        onChange={(selectedOption) => {
          console.log(selectedOption)
        }}
      />
      <ClassSelector title="PreReqs" classes={classes} />
    </div>
  )
}

export default ClassSearch
