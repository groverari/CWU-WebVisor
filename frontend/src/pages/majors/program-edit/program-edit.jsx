import React, { useState, useEffect } from 'react'
//import './major-edit.styles.scss'
//import MajorInfo from '../../../components/major-info/major-info'
import SearchBox from '../../../components/search-box/search-box'
import axios from 'axios'
import ConfPopUp from '../../../components/PopUp/confirmation/confPopUp'
//import ErrorPopUp from '../../../components/PopUp/error/errorPopUp'
//import { program } from '@babel/types'

/**
 *
 *
 * TODO: Generate an Error Popup that says
 */
function EditProgram() {
  const api_url = import.meta.env.VITE_API_URL
  const [programs, setPrograms] = useState([])
  const [searchPrograms, setSearchPrograms] = useState([])
  const [selectedProgram, setSelectedProgram] = useState([])
  const [majors, setMajors] = useState([])
  const [searchMajors, setSearchMajors] = useState([])
  const [selectedMajorName, setSelectedMajorName] = useState()
  const [selectedMajorID, setSelectedMajorID] = useState()
  const [showInfo, setInfo] = useState(false)
  const [errorMessage, setErrorMesssage] = useState('');
  const [showError, setShowError] = useState(false);

 

  const handleErrorPopUpClose = () =>
  {
    setShowError(false);
    //window.location.reload(true);
  }

  useEffect(() => {
    axios
      .post(api_url + 'Program.php', {
        request: 'all_programs',
        user_id: localStorage.getItem('userId')
      })
      .then((res) => {
        setPrograms(res.data)
        console.log(res.data)
      })
  }, [])

  useEffect(() => {
    if (programs) {
      const temp = programs.map((program) => ({
        label: program.name + ' ' + program.year,
        value: programs.indexOf(program)
      }))
      setSearchPrograms(temp)
    }
  }, [programs])

  if (searchPrograms) {
    searchPrograms.sort(function (a, b) {
      return a.label.localeCompare(b.label)
    })
  }

  useEffect(() => {
    axios
      .post(api_url + 'Major.php', {
        request: 'read',
      })
      .then((res) => {
        setMajors(res.data)
        console.log(res.data)
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

  const selectProgramHandler = ({ value }) => {
    //setName('')
    setSelectedProgram(programs[value])
    setInfo(false)
  }

  const selectMajorHandler = ({ value }) => {
    //setName('')
    setSelectedMajorID(majors[value].id)
    setSelectedMajorName(majors[value].name)
    //setInfo(false)
  }

  const deactivator = () => {
    console.log('To be deleted')
  }

  const buttonHandler = () => {
    setInfo(true)
  }
  const updator = () => {
    if (updatedName == '' || selectedProgram.name == updatedName) {
      console.log('No Changes Yet')
    } else {
      handlePopUpOpen()
    }
  }

  const handleUpdate = () => {
    delete programs[programs.indexOf(selectedProgram)]
    selectedProgram.name = updatedName
    setPrograms(programs.concat(selectedProgram))
    console.log(programs)
    console.log(searchPrograms)
    axios.post(api_url + 'Program.php', {
      request: 'update',
      user_id: localStorage.getItem('userId'),
      id: selectedProgram.id,
      major_id: selectedMajorID,
      year: selectedProgram.year,
      credits: selectedProgram.credits,
      elective_credits: selectedProgram.elective_credits,
      active: 'Yes'
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
        window.location.reload(true);
        console.log("no error")
      }
    })
  .catch((error)=>
    {
      console.log(error);
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
      <h1 className="major-title">Program Search TODO: Add class roster/FIX major select</h1>
      <div className="major-search-container">
        <SearchBox
          list={searchPrograms}
          value="Search"
          onChange={selectProgramHandler}
        />
        <button className="major-search-button" onClick={buttonHandler}>
          Search
        </button>
      </div>
      {showInfo && (
        <div className="major-info-container">
          <div /*className="major-info"*/>
            <label className="major-name-label">Associated Major: </label>
            <SearchBox
              list={searchMajors}
              defaultValue={selectedProgram.name}
              onChange={selectMajorHandler}
            />
          </div>

          <div /*className="major-info"*/>
            <label className="major-name-label">Year: </label>
            <input
              type="number"
              className="major-name"
              defaultValue={selectedProgram.year}
              onChange={(event) => {
                setName(event.target.value)
              }}
            />
          </div> 

          <div /*className="major-info"*/>
            <label className="major-name-label">Credits: </label>
            <input
              type="number"
              className="major-name"
              defaultValue={selectedProgram.credits}
              onChange={(event) => {
                setName(event.target.value)
              }}
            />
            </div>

          <div /*className="major-info"*/>
            <label className="major-name-label">Elective Credits: </label>
            <input
              type="number"
              className="major-name"
              defaultValue={selectedProgram.elective_credits}
              onChange={(event) => {
                setName(event.target.value)
              }}
            />
          </div> 

          <div>
            <button /*className="major-update-button"*/ onClick={updator}>
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
      {showError && 
      (<ErrorPopUp 
        popUpContent={errorMessage}
        onClose={handleErrorPopUpClose}
      />)}
    </div>
  )
}

export default EditProgram


