import React from 'react'
import './student-search.styles.scss'
import SearchBox from '../../../components/search-box/search-box'
import { useState, useEffect } from 'react'
const s = [
  { label: 'Ariesh', value: 1 },
  { label: 'Josh', value: 2 },
  { label: 'Andrew', value: 3 },
  { label: 'Nirunjan', value: 4 },
  { label: 'Ryan', value: 5 },
  { label: 'John Doe', value: 7 },
  { label: 'Billy Eilish', value: 8 }
]

const StudentSearch = () => {
  const [students, setStudents] = useState(0)

  useEffect(() => {
    setStudents(s)
    //this is where the fetch for the database will go
  }, [])
  if (students) {
    students.sort(function (a, b) {
      return a.label.localeCompare(b.label)
    })
  }

  return (
    <SearchBox
      list={students}
      placeholder="Search for a Students"
      value="Search"
    />
  )
}

export default StudentSearch
