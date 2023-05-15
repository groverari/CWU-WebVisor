import React, { useState } from 'react'
import './class-add.styles.scss'
import ClassSelector from '../../../components/class-selector/class-selector'
import axios from 'axios'
import ErrorPopUp from '../../../components/PopUp/error/ErrorPopUp'

const AddClass = () => {
  const api_url = import.meta.env.VITE_API_URL
  const [classData, setClassData] = useState({
    catalogCode: '',
    name: '',
    credits: ''
  })

  const [quarterOffered, setQuarterOffered] = useState({
    Fall: false,
    Winter: false,
    Spring: false,
    Summer: false
  })
  const [errorMessage, setErrorMesssage] = useState(' ')
  const [showError, setShowError] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()

    // Convert boolean values to "yes" or "no"
    //const fall = quarterOffered.Fall ? "yes" : "no";
    //const winter = quarterOffered.Winter ? "yes" : "no";
    // const spring = quarterOffered.Spring ? "yes" : "no";
    //const summer = quarterOffered.Summer ? "yes" : "no";
    const selectedQuarters = Object.keys(quarterOffered).filter(
      (quarter) => quarterOffered[quarter]
    )

    axios
      .post(api_url + 'Class.php', {
        request: 'add_class',
        user_id: 41792238,
        name: classData.catalogCode,
        title: classData.name,
        credits: classData.credits,
        fall: 'Yes',
        winter: 'No',
        //spring,
        // summer,
        quarters: selectedQuarters
      })
      .then((res) => {
        console.log(res.data)
      })
      .catch((error) => {
        console.log(error)
        setErrorMesssage(error)
        setShowError(true)
      })
  }

  const handleInputChange = (event) => {
    const { id, value } = event.target
    setClassData((prevFormData) => ({
      ...prevFormData,
      [id]: value
    }))
  }

  const handleQuarterOfferedChange = (quarter) => {
    setQuarterOffered((prevQuarterOffered) => ({
      ...prevQuarterOffered,
      [quarter]: !prevQuarterOffered[quarter] //=== "yes" ? "no" : "yes",
    }))
  }

  return (
    <div className="form-container">
      <h1>Add Class</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="catalogCode">Catalog Code:</label>
          <input
            type="text"
            id="catalogCode"
            value={classData.catalogCode}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={classData.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="credits">Credits:</label>
          <input
            type="text"
            id="credits"
            value={classData.credits}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Quarter Offered:</label>
          <div>
            <label htmlFor="fall">
              <input
                type="checkbox"
                id="fall"
                checked={quarterOffered.Fall}
                onChange={() => handleQuarterOfferedChange('Fall')}
              />
              Fall
            </label>
          </div>
          <div>
            <label htmlFor="winter">
              <input
                type="checkbox"
                id="winter"
                checked={quarterOffered.Winter}
                onChange={() => handleQuarterOfferedChange('Winter')}
              />
              Winter
            </label>
          </div>
          <div>
            <label htmlFor="spring">
              <input
                type="checkbox"
                id="spring"
                checked={quarterOffered.Spring}
                onChange={() => handleQuarterOfferedChange('Spring')}
              />
              Spring
            </label>
          </div>
          <div>
            <label htmlFor="summer">
              <input
                type="checkbox"
                id="summer"
                checked={quarterOffered.Summer}
                onChange={() => handleQuarterOfferedChange('Summer')}
              />
              Summer
            </label>
          </div>
        </div>

        <button type="submit">Add Class</button>
      </form>
    </div>
  )
}

export default AddClass
