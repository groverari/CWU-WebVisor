import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './major-add.scss'
import ErrorPopUp  from '../../../components/PopUp/error/ErrorPopUp'
import ConfPopUp from '../../../components/PopUp/confirmation/confPopUp'

const AddMajor = () => {
  const api_url = import.meta.env.VITE_API_URL
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [errorMessage, setErrorMesssage] = useState('');
  const [showError, setShowError] = useState(false);

  const handleErrorPopUpClose = () =>
  {
    setShowError(false);
  }
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
      handleFormSubmit(event);
    }
  }, [selectedOption]);

  const [formData, setFormData] = useState({
    name: '',
    active: ''
  })

  const handleFormSubmit = (event) => {
    event.preventDefault()
    axios
      .post(api_url + 'Major.php', {
        request: 'create',
        name: formData.name,
        active: formData.active
      })
      .then((res) => {
        console.log(res.data)
        if(typeof res.data === 'string' && res.data.includes('Error'))
        {
          console.log("handled error");
          setErrorMesssage(res.data);
          setShowError(true);
        }
        else
        {
          console.log("no error")
        }
      })
      .catch((error) => {
        console.log(error);
        console.log("unhandled error");
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
      <h1>Add Major</h1>
      <form onSubmit={handlePopUpOpen}>
        <div className="form-group">
          <label>Major Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <button className="submit-btn" type="submit">
          Add Major
        </button>
      </form>
      {showPopup && (
        <ConfPopUp
          action="add"
          onClose={handlePopUpClose}
          onButtonClick={handlePopUpButtonClick}
        />
      )}
      {showError && 
      (<ErrorPopUp 
        popUpContent={errorMessage}
        onClose={handleErrorPopUpClose}
      />)}
    </div>
  )
}
export default AddMajor
