import React, { useState, useEffect } from 'react';
import SearchBox from '../../../components/search-box/search-box';
import axios from 'axios';
import ConfPopUp from '../../../components/PopUp/confirmation/confPopUp';
import ErrorPopUp from '../../../components/PopUp/error/errorPopUp';
import ClassSelector from '../../../components/class-selector/class-selector';

function EditProgram() {
  const api_url = import.meta.env.VITE_API_URL;
  const [programs, setPrograms] = useState([]); // Holds the list of programs
  const [searchPrograms, setSearchPrograms] = useState([]); // Holds the list of programs for searching
  const [selectedProgram, setSelectedProgram] = useState([]); // Holds the currently selected program
  const [majors, setMajors] = useState([]); // Holds the list of majors
  const [searchMajors, setSearchMajors] = useState([]); // Holds the list of majors for searching
  const [selectedMajorName, setSelectedMajorName] = useState(); // Holds the name of the selected major
  const [selectedMajorID, setSelectedMajorID] = useState(selectedProgram.major_id); // Holds the ID of the selected major
  const [programClasses, setProgramClasses] = useState(Object); // Holds the classes required by the program
  const [programelectives, setProgramElectives] = useState([]); // Holds the program electives
  const [searchElectives, setSearchElectives] = useState([]); // Holds the program electives for searching
  const [classes, setClasses] = useState([]); // Holds the list of all active classes
  const [searchClasses, setSearchClasses] = useState([]); // Holds the list of all active classes for searching
  const [searchProgramClasses, setSearchProgramClasses] = useState([]); // Holds the list of program classes for searching
  const [year, setYear] = useState(selectedProgram.year); // Holds the year of the selected program
  const [credits, setCredits] = useState(selectedProgram.credits); // Holds the number of credits for the selected program
  const [electiveCredits, setElectiveCredits] = useState(selectedProgram.elective_credits); // Holds the number of elective credits for the selected program
  const [showInfo, setInfo] = useState(false); // Controls the visibility of program information
  const [errorMessage, setErrorMesssage] = useState(''); // Holds the error message
  const [showError, setShowError] = useState(false); // Controls the visibility of the error popup
  const [showPopup, setShowPopup] = useState(false); // Controls the visibility of the confirmation popup
  const [extraClasses, setExtraClasses] = useState([]); // Holds the extra classes added to the program
  const [missingClasses, setMissingClasses] = useState([]); // Holds the missing classes for the program
  const [selectedOption, setSelectedOption] = useState(null); // Holds the selected option in the confirmation popup

  // Function to handle the update of extra classes
  const handleExtraClassesUpdate = (extraClasses) => {
    setExtraClasses(extraClasses);
  };
  
  // Function to handle the update of missing classes
  const handleMissingClassesUpdate = (missingClasses) => {
    setMissingClasses(missingClasses);
  };

  // Function to handle the closing of the error popup
  const handleErrorPopUpClose = () => {
    setShowError(false);
  };

  useEffect(() => {
    // Fetch programs from API
    axios.post(api_url + 'Program.php', {
      request: 'all_programs',
      user_id: localStorage.getItem('userId')
    })
      .then((res) => {
        setPrograms(res.data);
      });
  }, []);

  useEffect(() => {
    // Update searchPrograms when programs change
    if (programs) {
      const temp = programs.map((program) => ({
        label: program.name + ' ' + program.year,
        value: programs.indexOf(program)
      }));
      setSearchPrograms(temp);
    }
  }, [programs]);

  if (searchPrograms) {
    // Sort searchPrograms by label
    searchPrograms.sort(function (a, b) {
      return a.label.localeCompare(b.label);
    });
  }

  useEffect(() => {
    // Fetch majors from API
    axios.post(api_url + 'Major.php', {
      request: 'read',
    })
      .then((res) => {
        setMajors(res.data);
      });
  }, []);

  useEffect(() => {
    // Update searchMajors when majors change
    if (majors) {
      const temp = majors.map((major) => ({
        label: major.name,
        value: majors.indexOf(major)
      }));
      setSearchMajors(temp);
    }
  }, [majors]);

  if (searchMajors) {
    // Sort searchMajors by label
    searchMajors.sort(function (a, b) {
      return a.label.localeCompare(b.label);
    });
  }

  useEffect(() => {
    // Fetch active classes from API
    axios.post(api_url + 'Class.php', {
      request: 'all_active_classes',
    })
      .then((res) => {
        setClasses(res.data);
      });
  }, []);

  const getProgramClassInfo = () => {
    if (selectedProgram.program_id !== undefined) {
      // Fetch required classes for the selected program from API
      axios.post(api_url + 'Program_Class.php', {
        request: 'get_required_classes',
        program_id: selectedProgram.program_id,
        required: 'Yes'
      })
        .then((res) => {
          const programClassesData = res.data;
          setProgramClasses(programClassesData);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const selectProgramHandler = ({ value }) => {
    // Handle program selection
    setSelectedProgram(programs[value]);
    setExtraClasses([]);
    setMissingClasses([]);
    setInfo(false);
  };

  const selectMajorHandler = ({ value }) => {
    // Handle major selection
    setSelectedMajorID(majors[value].id);
    setSelectedMajorName(majors[value].name);
  };

  const buttonHandler = () => {
    // Handle search button click
    getProgramClassInfo();
    setInfo(true);
  };

  const updator = () => {
    // Handle update button click
    handlePopUpOpen();
  };

  useEffect(() => {
    // Handle selected option change
    if (selectedOption) {
      handleUpdate()
    }
  }, [selectedOption]);

  const handleUpdate = () => {
    // Handle program update
    delete programs[programs.indexOf(selectedProgram)];
    setPrograms(programs.concat(selectedProgram));
    axios.post(api_url + 'Program.php', {
      request: 'update',
      user_id: localStorage.getItem('userId'),
      id: selectedProgram.program_id,
      major_id: selectedMajorID === undefined ? selectedProgram.major_id : selectedMajorID,
      year: year === undefined ? selectedProgram.year : year,
      credits: credits === undefined ? selectedProgram.credits : credits,
      elective_credits: electiveCredits === undefined ? selectedProgram.elective_credits : electiveCredits,
      active: 'Yes'
    })
      .then((res) => {
        if (typeof res.data === 'string' && res.data.includes('Error')) {
          setErrorMesssage(res.data);
          setShowError(true);
        } else {
          window.location.reload(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePopUpOpen = () => {
    // Handle popup open
    setShowPopup(true)
  };

  const handlePopUpClose = () => {
    // Handle popup close
    setShowPopup(false);
  };

  const handlePopUpButtonClick = (buttonValue) => {
    // Handle popup button click
    setSelectedOption(buttonValue);
  };

  useEffect(() => {
    // Handle missing classes update
    if(missingClasses[missingClasses.length - 1] !== undefined)
    {
      const lastClass = missingClasses[missingClasses.length - 1];
      axios.post(api_url + 'Program_Class.php', {
        request: 'remove_class',
        user_id: localStorage.getItem('userId'),
        class_id: lastClass.CID == undefined? lastClass.id : lastClass.CID,
        program_id: selectedProgram.program_id,
      })
      .then((res) => {
        if (typeof res.data === 'string' && res.data.includes('Error')) {
          setErrorMesssage(res.data);
          setShowError(true);
        } 
        else {
          console.log(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }, [missingClasses]);

  useEffect(() => {
    // Handle extra classes update
    if(extraClasses[extraClasses.length - 1] !== undefined)
    {
      const lastClass = extraClasses[extraClasses.length - 1];
      axios.post(api_url + 'Program_Class.php', {
        request: 'add_class',
        user_id: localStorage.getItem('userId'),
        class_id: lastClass.CID == undefined? lastClass.id : lastClass.CID,
        program_id: selectedProgram.program_id,
        minimum_grade: lastClass.minimum_grade == undefined ? "20": lastClass.minimum_grade,
        required: 'YES'
      })
      .then((res) => {
        if (typeof res.data === 'string' && res.data.includes('Error')) {
          setErrorMesssage(res.data);
          setShowError(true);
        } 
        else {
          console.log(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }, [extraClasses]);

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
          <div>
            <label className="major-name-label">Associated Major: </label>
            <SearchBox
              list={searchMajors}
              placeholder={selectedProgram.name}
              onChange={selectMajorHandler}
            />
          </div>

          <div>
            <label className="major-name-label">Year: </label>
            <input
              type="number"
              className="major-name"
              defaultValue={selectedProgram.year}
              onChange={(event) => {
                setYear(event.target.value);
              }}
            />
          </div>

          <div>
            <label className="major-name-label">Credits: </label>
            <input
              type="number"
              className="major-name"
              defaultValue={selectedProgram.credits}
              onChange={(event) => {
                setCredits(event.target.value);
              }}
            />
          </div>

          <div>
            <label className="major-name-label">Elective Credits: </label>
            <input
              type="number"
              className="major-name"
              defaultValue={selectedProgram.elective_credits}
              onChange={(event) => {
                setElectiveCredits(event.target.value);
              }}
            />
          </div>

          {Object.keys(programClasses).length !== 0 && (
            <div>
              <ClassSelector
                title="Required Classes"
                classes={classes}
                alreadyInsertedClasses={programClasses}
                handleExtraClassesUpdate={handleExtraClassesUpdate}
                handleMissingClassesUpdate={handleMissingClassesUpdate}
              />
            </div>
          )}

          {Object.keys(programClasses).length === 0 && (
            <div>
              <ClassSelector
                title="No Required Classes"
                classes={classes}
                alreadyInsertedClasses={programClasses}
                handleExtraClassesUpdate={handleExtraClassesUpdate}
                handleMissingClassesUpdate={handleMissingClassesUpdate}
              />
            </div>
          )}

          <div>
            <button onClick={updator}>
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
      {showError && (
        <ErrorPopUp
          popUpContent={errorMessage}
          onClose={handleErrorPopUpClose}
        />
      )}
    </div>
  );
}

export default EditProgram;
