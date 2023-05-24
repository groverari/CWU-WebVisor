import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './student-add.scss'
import SearchBox from '../../../components/search-box/search-box'
import ErrorPopUp from '../../../components/PopUp/error/ErrorPopUp'
import ConfPopUp from '../../../components/PopUp/confirmation/confPopUp'
import { Modal } from '@mui/material'

const AddStudent = () => {
  const api_url = import.meta.env.VITE_API_URL
  const [showPopup, setShowPopup] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const [errorMessage, setErrorMesssage] = useState('')
  const [showError, setShowError] = useState(false)
  const [programs, setPrograms] = useState([])
  const [searchPrograms, setSearchPrograms] = useState([])
  const [selectedProgram, setSelectedProgram] = useState(0)

  useEffect(() => {
    axios
      .post(api_url + 'program.php', {
        request: 'all_programs',
        api_key: import.meta.env.API_KEY
      })
      .then((res) => {
        setPrograms(res.data)
      })
  }, [])

  useEffect(() => {
    if (programs) {
      const temp = programs.map((program) => ({
        label: program.name + ' ' + program.year,
        value: programs.indexOf(program)
      }))
      temp.sort(function (a, b) {
        return a.label.localeCompare(b.label)
      })
      setSearchPrograms(temp)
    }
  }, [programs])

  const handleErrorPopUpClose = () => {
    setShowError(false)
  }
  const handlePopUpOpen = (event) => {
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
      handleFormSubmit()
    }
  }, [selectedOption])

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    cwuId: '',
    email: ''
  })

  const addStudent = () => {
    formData.email += '@cwu.edu'
    axios
      .post(api_url + 'Student.php', {
        request: 'add_student',
        user_id: localStorage.getItem('userId'),
        first: formData.firstName,
        last: formData.lastName,
        email: formData.email,
        cwu_id: formData.cwuId
      })
      .then((res) => {
        console.log(res.data)
        if (res.data.includes('Error')) {
          console.log('handled error')
          setErrorMesssage(res.data)
          setShowError(true)
        } else {
          console.log('no error')
        }
      })
      .catch((error) => {
        console.log(error)
        console.log('unhandled error')
      })
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }))
  }

  return (
    <div>
      <div className="student-add-search-box">
        <h1>Add Student</h1>
        <SearchBox
          list={searchPrograms}
          placeholder="Select a program for the student"
          onChange={({ value }) => {
            let id = parseInt(value)
            setSelectedProgram(programs[id])
            console.log(selectedProgram)
          }}
        />
      </div>
      <div className="form-container">
        <form
          onSubmit={() => {
            if (selectedProgram == 0) {
              setErrorMesssage('Add a program first')
              setShowError(true)
            } else {
              handlePopUpOpen(event)
            }
          }}
        >
          <div className="form-group">
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>CWU ID:</label>
            <input
              type="text"
              name="cwuId"
              title="Please enter an 8-digit number."
              pattern="[0-9]{8}"
              required
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <span className="email-domain">@cwu.edu</span>
          </div>

          <button className="submit-btn" type="submit">
            Add Student
          </button>
        </form>
        {showPopup && (
          <ConfPopUp
            action="add"
            onClose={handlePopUpClose}
            onButtonClick={handlePopUpButtonClick}
          />
        )}
        {showError && (
          <ErrorPopUp
            popUpContent={errorMessage}
            onClose={handleErrorPopUpClose}
          />
        )}
      </div>
    </div>
  )
}
export default AddStudent
