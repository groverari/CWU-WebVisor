import React, { useState, useEffect } from 'react'
import './major-edit.styles.scss'
import SearchBox from '../../../components/search-box/search-box'
import axios from 'axios'
import Confirmation from '../../../components/PopUp/conf/confirmation'
import LoadingScreen from '../../../components/PopUp/LoadingScreen/loading'
import GenericPopUp from '../../../components/PopUp/generic/generic-popup'

/**
 * EditMajor component for editing major information
 */
function EditMajor() {
  // State variables
  const [majors, setMajors] = useState([]) // Array of majors
  const [searchMajors, setSearchMajors] = useState([]) // Array of majors for search functionality
  const [selectedMajor, setSelectedMajor] = useState(0) // Index of selected major
  const [showInfo, setInfo] = useState(false) // Flag to show major info
  const [updatedName, setName] = useState('') // Updated major name
  const [conf, setConf] = useState(false) // Flag for confirmation popup
  const [activeConf, setActiveConf] = useState(false) // Flag for activation confirmation popup
  const [error, setError] = useState(false) // Flag for error popup
  const [errorMessage, setErrorMessage] = useState('') // Error message
  const [successMessage, setSuccessMessage] = useState('') // Success message
  const [success, setSuccess] = useState(false) // Flag for success popup
  const [loading, setLoading] = useState(true) // Flag for loading state

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
    handleUpdate()
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

  const api_url = import.meta.env.VITE_API_URL

  useEffect(() => {
    // Fetch majors from API
    axios
      .post(api_url + 'Major.php', {
        request: 'read'
      })
      .then((res) => {
        setMajors(res.data)
        setLoading(false)
      })
      .catch((error) => {
        setErrorMessage(error.data)
        setLoading(false)
        setError(true)
      })
  }, [])

  useEffect(() => {
    // Update searchMajors when majors change
    if (majors) {
      const temp = majors.map((major) => ({
        label: major.name,
        value: majors.indexOf(major)
      }))
      temp.sort(function (a, b) {
        return a.label.localeCompare(b.label)
      })
      setSearchMajors(temp)
    }
  }, [majors])

  const selectHandler = ({ value }) => {
    // Handle major selection
    setName('')
    setSelectedMajor(majors[value])
    console.log(majors[value])
    setInfo(false)
  }

  const changeActivation = () => {
    // Change major activation
    setLoading(true)
    let activation = selectedMajor.active == 'Yes' ? 'No' : 'Yes'
    console.log('NEW ACTIVATION: ' + activation)
    axios
      .post(api_url + 'Major.php', {
        request: 'change_activation',
        api_key: import.meta.env.API_KEY,
        user_id: localStorage.getItem('userId'),
        active: activation,
        major_id: selectedMajor.id
      })
      .then((res) => {
        if (typeof res.data == 'string' && res.data.includes('error')) {
          setErrorMessage(res.data)
          setLoading(false)
          setError(true)
        } else {
          setSuccessMessage(
            activation == 'Yes'
              ? 'Activation Successful'
              : 'Deactivation Successful'
          )
          setLoading(false)
          setSuccess(true)
          delete majors[majors.indexOf(selectedMajor)]
          selectedMajor.active = activation
          majors.push(selectedMajor)
        }
      })
      .catch((err) => {
        console.log(err)
        setErrorMessage(err.data)
        setLoading(false)
        setError(true)
      })
  }

  const buttonHandler = () => {
    // Handle search button click
    if (selectedMajor) {
      setInfo(true)
    } else {
      setErrorMessage('First select a major to edit')
      setError(true)
    }
  }

  const updator = () => {
    // Handle update button click
    if (updatedName == '' || selectedMajor.name == updatedName) {
      setErrorMessage('No changes were made')
      setError(true)
    } else {
      setConf(true)
    }
  }

  const handleUpdate = () => {
    // Handle major update
    setLoading(true)
    delete majors[majors.indexOf(selectedMajor)]
    selectedMajor.name = updatedName
    setMajors(majors.concat(selectedMajor))
    axios
      .post(api_url + 'Major.php', {
        request: 'update',
        user_id: localStorage.getItem('userId'),
        id: selectedMajor.id,
        name: updatedName,
        active: 'Yes'
      })
      .then((res) => {
        setLoading(false)
        console.log(res.data)
        if (typeof res.data === 'string' && res.data.includes('Error')) {
          setErrorMessage(res.data)
          setError(true)
        } else {
          setSuccessMessage('Successfully Updated the Major')
          setSuccess(true)
          setName('')
        }
      })
      .catch((error) => {
        setErrorMessage(error.data)
        setLoading(false)
        setError(true)
      })
  }

  return (
    <div className="major-search">
      <h1 className="major-title">Major Search</h1>
      <div className="major-search-container">
        <SearchBox
          placeHolder="Search for a Major"
          list={searchMajors}
          value="Search"
          onChange={selectHandler}
        />
        <button className="major-search-button" onClick={buttonHandler}>
          Search
        </button>
      </div>
      {showInfo && (
        <div className="major-info-container">
          <div className="major-info">
            <h3>
              You can edit the name of the major by changing the name<br></br>{' '}
              in the textbox and clicking update
            </h3>
            <div className="major-edit-field">
              <label className="major-name-label">Name: </label>
              <input
                type="text"
                className="major-name"
                defaultValue={selectedMajor.name}
                onChange={(event) => {
                  setName(event.target.value)
                }}
              />
              <button className="major-update-button" onClick={updator}>
                Update
              </button>
            </div>
            <div>
              <button
                className={
                  selectedMajor.active == 'Yes'
                    ? 'major-deactivate-button'
                    : 'major-activate-button'
                }
                onClick={activeConfOpen}
              >
                {selectedMajor.active == 'Yes' ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          </div>
        </div>
      )}

      <GenericPopUp
        onClose={handleSuccess}
        title="Success!"
        message={successMessage}
        open={success}
      />
      <GenericPopUp
        onClose={errorClose}
        title="Error"
        message={errorMessage}
        open={error}
      />
      <Confirmation
        onClose={confClose}
        open={conf}
        yesClick={confYes}
        message="Are you sure you would like to change the name of this major?"
        button_text="Update"
      />
      <Confirmation
        onClose={activeConfClose}
        open={activeConf}
        yesClick={activeYes}
        message="Are you sure you would like to change the activation of this major?"
        button_text="Change Activation"
      />
      <LoadingScreen open={loading} />
    </div>
  )
}

export default EditMajor
