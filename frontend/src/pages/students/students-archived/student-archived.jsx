import React, { useEffect, useState } from 'react'
import './students-archived.styles.scss'
import api_url from '../../../API/API_assets'
import axios from 'axios'
import StudentInfo from '../../../components/student-info/student-info'
import SearchBox from '../../../components/search-box/search-box'

const ArchivedStudents = () => {
  const [students, setStudents] = useState([])
  const [searchStudents, setSearchStudents] = useState([])
  const [selectedStudent, setSelectedStudent] = useState(0)
  const [isInfo, setInfo] = useState(false)

  useEffect(() => {
    axios.get(api_url + 'Student.php?request=inactive_students').then((res) => {
      setStudents(res.data)
    })
  }, [])

  useEffect(() => {
    if (students) {
      const temp = students.map((student) => ({
        label: student.last + ', ' + student.first + ' ' + student.cwu_id,
        value: students.indexOf(student)
      }))
      setSearchStudents(temp)
    }
  }, [students])

  if (searchStudents) {
    searchStudents.sort(function (a, b) {
      return a.label.localeCompare(b.label)
    })
  }

  const selectHandler = ({ value }) => {
    let id = parseInt(value)
    setSelectedStudent(students[id])
    setInfo(false)
  }

  const studentActivator = () => {
    axios.post(
      api_url +
        `'Student.php?request=activate
    _student'`
    )
    console.log('student rises from the dead')
  }

  return (
    <div className="student-search-container">
      <h1>Archived Students</h1>
      <SearchBox
        list={searchStudents}
        placeholder="Search for a Student"
        value="Search"
        onChange={selectHandler}
      />
      <button
        className="search-btn"
        onClick={() => {
          setInfo(true)
        }}
      >
        Search
      </button>
      {isInfo && <h3>{selectedStudent.first + ' ' + selectedStudent.last}</h3>}
      {isInfo && <StudentInfo student={selectedStudent} />}
      {isInfo && (
        <button className="activate-btn" onClick={studentActivator}>
          Activate Student
        </button>
      )}
    </div>
  )
}
export default ArchivedStudents
