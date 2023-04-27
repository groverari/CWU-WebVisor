import React from 'react'
import './student-search.styles.scss'
import SearchBox from '../../../components/search-box/search-box'
import { useState, useEffect } from 'react'
import StudentOverview from '../../../components/student-overview/student-overview'
const s = [
  { label: 'Grover, Ariesh 12345678', value: 1 },
  { label: 'Martinez, Josh 123456456', value: 2 },
  { label: 'Franco-Munoz, Andrew 98752365', value: 3 },
  { label: 'Malla, Nirunjan 98632582', value: 4 },
  { label: 'Golob, Ryan 96321458', value: 5 },
  { label: 'Doe, John 12547856', value: 7 },
  { label: 'Eilish, Billy 92563578', value: 8 }
]

const studentInfo = [
  {
    fName: 'Ariesh',
    lName: 'Grover',
    id: 12345678,
    email: 'ag@cwu.edu',
    phone: '123-456-7890',
    address: 'this street in ellensburg',
    nonStem: 'Maybe'
  }
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
  //const searchHandler = () => ({})

  return (
    <div className="student-search-container">
      <SearchBox
        list={students}
        placeholder="Search for a Student"
        value="Search"
      />
      <StudentOverview student={studentInfo[0]} />
    </div>
  )
}

export default StudentSearch
