import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './student-add.scss'
import ErrorPopUp from '../../../components/PopUp/error/ErrorPopUp'
import ConfPopUp from '../../../components/PopUp/confirmation/confPopUp'

const AddStudent = () => {
  const api_url = import.meta.env.VITE_API_URL
  const [showPopup, setShowPopup] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const [errorMessage, setErrorMesssage] = useState('')
  const [showError, setShowError] = useState(false)

  const handleErrorPopUpClose = () => {
    setShowError(false)
  }
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
      handleFormSubmit(event)
    }
  }, [selectedOption])

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    cwuId: '',
    email: ''
  })

  const handleFormSubmit = (event) => {
    event.preventDefault()
    formData.email += '@cwu.edu'
    console.log(formData)
    axios
      .post(api_url + 'Student.php', {
        request: 'add_student',
        user_id: 41792238,
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
    <div className="form-container">
      <h1>Add Student</h1>
      <form onSubmit={handlePopUpOpen}>
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
  )
}
export default AddStudent
