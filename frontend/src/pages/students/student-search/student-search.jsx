import React from 'react'
import './student-search.styles.scss'
import SearchBox from '../../../components/search-box/search-box'
import { useState, useEffect } from 'react'
import StudentOverview from '../../../components/student-overview/student-overview'
import api_url from '../../../API/API_assets'
import axios from 'axios'

const StudentSearch = () => {
  const [students, setStudents] = useState([])
  const [searchStudents, setSearchStudents] = useState([])
  const [selectedStudent, setSelectedStudent] = useState(0)

  //This gets an array of students from the database
  useEffect(() => {
    axios.get(api_url + 'Student.php?request=active_students').then((res) => {
      setStudents(res.data)
    })
  }, [])

  //if the sutdent array is set, this will create an array for the select statement
  //in the proper format using the label and value tags
  useEffect(() => {
    if (students) {
      const temp = students.map((student) => ({
        label: student.last + ', ' + student.first + ' ' + student.cwu_id,
        value: students.indexOf(student)
      }))
      setSearchStudents(temp)
    }
  }, [students])

  //If the search student array is set then this will sort it in aplhabetical order
  if (searchStudents) {
    searchStudents.sort(function (a, b) {
      return a.label.localeCompare(b.label)
    })
  }

  //sets the selected student
  const selectHandler = ({ value }) => {
    let id = parseInt(value)
    console.log(id)
    setSelectedStudent(students[id])
  }

  return (
    <div className="student-search-container">
      <SearchBox
        list={searchStudents}
        placeholder="Search for a Student"
        value="Search"
        onChange={selectHandler}
      />
      {selectedStudent != 0 && <StudentOverview student={selectedStudent} />}
    </div>
  )
}

export default StudentSearch
