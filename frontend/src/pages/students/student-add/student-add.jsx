import React, { useState } from 'react'
import axios from 'axios'
import './student-add.scss'
import ErrorPopUp  from '../../../components/PopUp/error/ErrorPopUp'

const AddStudent = () => {
  const api_url = import.meta.env.VITE_API_URL

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    cwuId: '',
    email: ''
  })

  const [errorMessage, setErrorMesssage] = useState(NULL);
  const [showError, setShowError] = useState(false);

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
      })
      .catch((error) => {
        console.log(error)
        setErrorMesssage(error);
        setShowError(true);
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
      <form onSubmit={handleFormSubmit}>
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
            pattern="[0-9]{8}"
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
      {showError && <ErrorPopUp popUpContent={errorMessage}/>}
    </div>
  )
}
export default AddStudent
