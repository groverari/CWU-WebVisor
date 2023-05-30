import React, { useEffect, useState } from 'react'
import './students-archived.styles.scss'
import axios from 'axios'
import StudentInfo from '../../../components/student-info/student-info'
import SearchBox from '../../../components/search-box/search-box'
import Confirmation from '../../../components/PopUp/conf/confirmation'
import LoadingScreen from '../../../components/PopUp/LoadingScreen/loading'
import GenericPopUp from '../../../components/PopUp/generic/generic-popup'
import UserStudentWarning from '../../../components/add_student_user/add_student_user'

const ArchivedStudents = () => {
  //These set the search box properly
  const [students, setStudents] = useState([])
  const [searchStudents, setSearchStudents] = useState([])
  //this is the value from the search box
  const [selectedStudent, setSelectedStudent] = useState(0)
  //this boolean shows the info about the selected student
  const [isInfo, setInfo] = useState(false)
  //this is the info for the adivsors and programs the student belongs to
  const [advisors, setAdvisors] = useState([])
  const [canEdit, setCanEdit] = useState(true)
  const [programs, setPrograms] = useState(0)
  const [programID, setProgramID] = useState(0)
  //this is for the all the different popups
  const [conf, setConf] = useState(false)
  const [activeConf, setActiveConf] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMesssage] = useState('')
  const [successMessage, setSuccessMesssage] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(true)

  //Methods to show and close popups
  const handleSuccess = () => {
    setSuccess(false)
  }
  const successOpen = (event) => {
    event.preventDefault()
    setSuccess(true)
  }
  const errorClose = () => {
    setError(false)
  }
  const errorOpen = (event) => {
    event.preventDefault()
    setError(true)
  }
  const confOpen = (event) => {
    event.preventDefault()
    setConf(true)
  }
  const confClose = () => {
    setConf(false)
  }
  const confYes = () => {
    setConf(false)
    handleUpdate
  }
  const activeConfOpen = () => {
    setActiveConf(true)
  }
  const activeConfClose = () => {
    setActiveConf(false)
  }
  const activeYes = () => {
    setActiveConf(false)
    changeActivation()
  }

  //API Methods
  let api_url = import.meta.env.VITE_API_URL
  useEffect(() => {
    axios
      .post(api_url + 'Student.php', { request: 'all_inactive_students' })
      .then((res) => {
        setStudents(res.data)
        //console.log(res.data)
        setLoading(false)
      })
      .catch((err) => {
        setErrorMesssage(err.data)
        setLoading(false)
        setError(true)
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
    setLoading(true)
    let id = parseInt(value)
    let newStudent = students[id]
    setSelectedStudent(students[id])
    setInfo(false)
    setCanEdit(false)
    setPrograms([])
    setAdvisors([])

    //Gets info regarding student program and advisor
    axios
      .post(api_url + 'Student_program.php', {
        request: 'programs_with_student',
        student_id: newStudent.id
      })
      .then((res) => {
        res.data.map((row) => {
          setAdvisors(Object.entries(advisors).concat(row.advisor_name))
          setProgramID(programID)
          setPrograms(Object.entries(programs).concat(row.program_name))
          if (row.advisor_id == localStorage.getItem('userId')) {
            setCanEdit(true)
          }
        })

        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
      })
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
    <div className="arch-student-search-container">
      <h1>Archived Students</h1>
      <div className="archived-search-box">
        <SearchBox
          list={searchStudents}
          placeholder="Search for a Student"
          value="Search"
          onChange={selectHandler}
        />
        <button
          className="arch-student-search-btn"
          onClick={() => {
            setInfo(true)
          }}
        >
          Search
        </button>
      </div>
      {selectedStudent != 0 && isInfo && (
        <div className="archived-student-info">
          <h3>{selectedStudent.first + ' ' + selectedStudent.last}</h3>
          <UserStudentWarning studentId={selectedStudent.id} />
          <div className="archived-info-wrapper">
            <StudentInfo
              student={selectedStudent}
              programs={programs}
              advisors={advisors}
            />
          </div>
        </div>
      )}
      <LoadingScreen open={loading} />
    </div>
  )
}
export default ArchivedStudents
