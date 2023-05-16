import React from 'react'
import './student-search.styles.scss'
import SearchBox from '../../../components/search-box/search-box'
import { useState, useEffect } from 'react'
import axios from 'axios'
import StudentInfo from '../../../components/student-info/student-info'
import StudentPlan from '../../../components/student-plan/student-plan'
import ConfPopUp from '../../../components/PopUp/confirmation/confPopUp'
import ErrorPopUp from '../../../components/PopUp/error/errorPopup'

const StudentSearch = () => {
  const [students, setStudents] = useState([])
  const [searchStudents, setSearchStudents] = useState([])
  const [selectedStudent, setSelectedStudent] = useState(0)
  const [isPlan, setPlan] = useState(false)
  const [isInfo, setInfo] = useState(false)
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const handlePopUpOpen = () =>
  {
    event.preventDefault();
    setShowPopup(true);
  }

  const handlePopUpClose = () =>
  {
    setShowPopup(false);
  }

  const handlePopUpButtonClick = (buttonValue) =>
  {
    setSelectedOption(buttonValue);
  }
  useEffect(() => {
    if (selectedOption) {
      deactivator();
    }
  }, [selectedOption]);

  let api_url = import.meta.env.VITE_API_URL

  //This gets an array of students from the database
  useEffect(() => {
    axios
      .post(api_url + 'Student.php', { request: 'all_active_students' })
      .then((res) => {
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
    setSelectedStudent(students[id])
    setInfo(false)
    setPlan(false)
  }

  const deactivator = () => {
    axios
      .post(api_url + 'Student.php', {
        request: 'change_activation',
        id: selectedStudent.id,
        active: 'No'
      })
      .then((res) => {
        if (res.data) {
          delete students[students.indexOf(selectedStudent)]
          setStudents(students)
          console.log('it works')
          //window.location.reload(true);
        }
      })
      .catch((error) => {
        console.log(error)
        console.log("fart")
      })
  }

  return (
    <div className="student-search-container">
      <h1>Student Search</h1>
      <SearchBox
        list={searchStudents}
        placeholder="Search for a Student"
        value="Search"
        onChange={selectHandler}
      />
      {selectedStudent != 0 && (
        <div>
          <h3>{selectedStudent.first + ' ' + selectedStudent.last}</h3>
          <button
            className="overview-btn"
            onClick={() => {
              setInfo(true)
              setPlan(false)
            }}
          >
            Info
          </button>

          <button
            className="overview-btn"
            onClick={() => {
              setInfo(false)
              setPlan(true)
            }}
          >
            Plan
          </button>
        </div>
      )}

      {selectedStudent != 0 && isInfo && (
        <StudentInfo student={selectedStudent} />
      )}
      {selectedStudent != 0 && isPlan && (
        <StudentPlan key={selectedStudent} student={selectedStudent} />
      )}
      {isInfo && (
        <button className="deactivate-btn" onClick={handlePopUpOpen}>
          Deactivate
        </button>
      )}
      {showPopup && (
        <ConfPopUp
          action="deactivate"
          onClose={handlePopUpClose}
          onButtonClick={handlePopUpButtonClick}
        />
      )}
    </div>
  )
}

export default StudentSearch

//{selectedStudent != 0 && <StudentOverview student={selectedStudent} />}
