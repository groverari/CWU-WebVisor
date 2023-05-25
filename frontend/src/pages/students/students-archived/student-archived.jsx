import React, { useEffect, useState } from 'react'
import './students-archived.styles.scss'

import axios from 'axios'
import StudentInfo from '../../../components/student-info/student-info'
import SearchBox from '../../../components/search-box/search-box'
import ConfPopUp from '../../../components/PopUp/confirmation/confPopUp'

const ArchivedStudents = () => {
  const [students, setStudents] = useState([])
  const [searchStudents, setSearchStudents] = useState([])
  const [selectedStudent, setSelectedStudent] = useState(0)
  const [isInfo, setInfo] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const handlePopUpOpen = () => {
    event.preventDefault()
    setShowPopup(true)
  }

  const handlePopUpClose = () => {
    setShowPopup(false)
  }

  const handlePopUpButtonClick = (buttonValue) => {
    setSelectedOption(buttonValue)
  }
  useEffect(() => {
    if (selectedOption) {
      studentActivator()
    }
  }, [selectedOption])
  let api_url = import.meta.env.VITE_API_URL
  useEffect(() => {
    axios
      .post(api_url + 'Student.php', { request: 'all_inactive_students' })
      .then((res) => {
        setStudents(res.data)
        //console.log(res.data)
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
    axios
      .post(api_url + 'Student.php', {
        request: 'change_activation',
        id: selectedStudent.id,
        active: 'Yes'
      })
      .then((res) => {
        if (res.data) {
          delete students[students.indexOf(selectedStudent)]
          setStudents(students)
          console.log('it works')
          window.location.reload(true)
        }
      })
      .catch((error) => {
        console.log(error)
      })
    //console.log('student rises from the dead')
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
        <button className="activate-btn" onClick={handlePopUpOpen}>
          Activate Student
        </button>
      )}
      {showPopup && (
        <ConfPopUp
          action="activate"
          onClose={handlePopUpClose}
          onButtonClick={handlePopUpButtonClick}
        />
      )}
    </div>
  )
}
export default ArchivedStudents
