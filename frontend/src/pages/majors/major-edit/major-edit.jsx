import React, { useState, useEffect } from 'react'
import './major-edit.styles.scss'
import MajorInfo from '../../../components/major-info/major-info'
import SearchBox from '../../../components/search-box/search-box'
import axios from 'axios'
import ConfPopUp from '../../../components/PopUp/confirmation/confPopUp'

/**
 *
 *
 * TODO: Generate an Error Popup that says
 */
function EditMajor() {
  const [majors, setMajors] = useState([])
  const [searchMajors, setSearchMajors] = useState([])
  const [selectedMajor, setSelectedMajor] = useState([])
  const [showInfo, setInfo] = useState(false)
  const [updatedName, setName] = useState('')

  const api_url = import.meta.env.VITE_API_URL
  useEffect(() => {
    axios
      .post(api_url + 'Major.php', {
        request: 'read'
      })
      .then((res) => {
        setMajors(res.data)
      })
  }, [])

  useEffect(() => {
    if (majors) {
      const temp = majors.map((major) => ({
        label: major.name,
        value: majors.indexOf(major)
      }))
      setSearchMajors(temp)
    }
  }, [majors])

  if (searchMajors) {
    searchMajors.sort(function (a, b) {
      return a.label.localeCompare(b.label)
    })
  }

  const selectHandler = ({ value }) => {
    setName('')
    setSelectedMajor(majors[value])
    setInfo(false)
  }

  const deactivator = () => {
    console.log('To be deleted')
  }

  const buttonHandler = () => {
    setInfo(true)
  }
  const updator = () => {
    if (updatedName == '' || selectedMajor.name == updatedName) {
      console.log('No Changes Yet')
    } else {
      handlePopUpOpen()
    }
  }

  const handleUpdate = () => {
    delete majors[majors.indexOf(selectedMajor)]
    selectedMajor.name = updatedName
    setMajors(majors.concat(selectedMajor))
    console.log(majors)
    console.log(searchMajors)
    axios.post(api_url + 'Major.php', {
      request: 'update',
      user_id: localStorage.getItem('userId'),
      id: selectedMajor.id,
      name: updatedName,
      active: 'Yes'
    })
  }
  // Code to generate Popup
  const [showPopup, setShowPopup] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)

  const handlePopUpOpen = () => {
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
      handleUpdate()
    }
  }, [selectedOption])

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
            <button className="major-deactivate-button">Deactivate</button>
          </div>
        </div>
      )}
      {showPopup && (
        <ConfPopUp
          action="update"
          onClose={handlePopUpClose}
          onButtonClick={handlePopUpButtonClick}
        />
      )}
    </div>
  )
}

export default EditMajor
