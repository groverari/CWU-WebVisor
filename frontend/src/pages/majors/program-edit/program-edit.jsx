import React, { useState, useEffect } from 'react'
//import './major-edit.styles.scss'
//import MajorInfo from '../../../components/major-info/major-info'
import SearchBox from '../../../components/search-box/search-box'
import axios from 'axios'
import ConfPopUp from '../../../components/PopUp/confirmation/confPopUp'
import ErrorPopUp from '../../../components/PopUp/error/errorPopUp'
import ClassSelector from '../../../components/class-selector/class-selector'

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
  const [selectedMajorID, setSelectedMajorID] = useState(selectedProgram.major_id)
  const [programClasses, setProgramClasses] = useState(Object)
  const [programelectives, setProgramElectives] = useState([])
  const [searchElectives, setSearchElectives] = useState([])
  const [classes, setClasses] = useState([])
  const [searchClasses, setSearchClasses] = useState([])
  const [searchProgramClasses, setSearchProgramClasses] = useState([])
  const [year, setYear] = useState(selectedProgram.year)
  const [credits, setCredits] = useState(selectedProgram.credits)
  const [electiveCredits, setElectiveCredits] = useState(selectedProgram.elective_credits)
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
        //console.log(res.data)
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
        //console.log(res.data)
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

   useEffect(() => {
    axios
      .post(api_url + 'Class.php', {
        request: 'all_active_classes',
      })
      .then((res) => {
        setClasses(res.data)
        //console.log(res.data)
      })
  }, [])

  const getProgramClassInfo = () => {
    console.log(selectedProgram.name);
    console.log(selectedProgram.program_id);
  
    if (selectedProgram.program_id !== undefined) {
      axios
        .post(api_url + 'Program_Class.php', {
          request: 'get_required_classes',
          program_id: selectedProgram.program_id,
          required: 'Yes'
        })
        .then((res) => {
          const programClassesData = res.data;
          console.log("inside program");
          console.log(programClassesData);
          setProgramClasses(programClassesData);
          console.log(programClasses);
          console.log("\n");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

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
    console.log(selectedProgram)
    getProgramClassInfo();
    setInfo(true)
  }
  const updator = () => {
      handlePopUpOpen()
  }

  const handleUpdate = () => {
    delete programs[programs.indexOf(selectedProgram)]
    setPrograms(programs.concat(selectedProgram))
    //console.log(programs)
    axios.post(api_url + 'Program.php', {
      request: 'update',
      user_id: localStorage.getItem('userId'),
      id: selectedProgram.program_id,
      major_id: selectedMajorID === undefined ? selectedProgram.major_id : selectedMajorID, // Pass the selectedMajorID as major_id
      year: year === undefined ? selectedProgram.year : year, // Use the "year" state instead of selectedProgram.year
      credits: credits === undefined ? selectedProgram.credits : credits, // Use the "credits" state instead of selectedProgram.credits
      elective_credits: electiveCredits === undefined ? selectedProgram.elective_credits : electiveCredits, // Use the "electiveCredits" state instead of selectedProgram.elective_credits
      active: 'Yes'
    })
   .then((res) => {
      //console.log(res.data)
      if(typeof res.data === 'string' && res.data.includes('Error'))
      {
        console.log("handled error");
        setErrorMesssage(res.data);
        setShowError(true);
      }
      else
      {
        window.location.reload(true);
        //console.log("no error")
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
      <h1 className="major-title">Program Search TODO: Add class roster/add or copy style/deactivate button</h1>
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
              placeholder={selectedProgram.name}
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
                setYear(event.target.value)
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
                setCredits(event.target.value)
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
                setElectiveCredits(event.target.value)
              }}
            />
          </div> 
          {Object.keys(programClasses).length !== 0 &&
          <div>
            <ClassSelector
              title = "Required Classes"
              classes={classes}
              alreadyInsertedClasses={programClasses}
              />
          </div>}

          {Object.keys(programClasses).length == 0 &&
          <div>
            <ClassSelector
              title = "No Required Classes"
              classes={classes}
              alreadyInsertedClasses={programClasses}
              />
          </div>}

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


