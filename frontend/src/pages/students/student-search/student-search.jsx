import React from "react";
import "./student-search.styles.scss";
import SearchBox from "../../../components/search-box/search-box";
import { useState, useEffect } from "react";
import axios from "axios";
import StudentInfo from "../../../components/student-info/student-info";
import StudentPlan from "../../../components/student-plan/student-plan";
import ConfPopUp from "../../../components/PopUp/confirmation/confPopUp";
import ErrorPopUp from "../../../components/PopUp/error/errorPopup";
import UserStudentWarning from "../../../components/add_student_user/add_student_user";
import Confirmation from "../../../components/PopUp/conf/confirmation";
import LoadingScreen from "../../../components/PopUp/LoadingScreen/loading";

const StudentSearch = () => {
  //state variables
  const [students, setStudents] = useState([]);
  const [searchStudents, setSearchStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(0);
  const [isPlan, setPlan] = useState(false);
  const [isInfo, setInfo] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [advisors, setAdvisors] = useState([]);
  const [canEdit, setCanEdit] = useState(true);
  const [programs, setPrograms] = useState(0);
  const [programID, setProgramID] = useState(0);
  const [isLoading, setLoading] = useState(true);

  // Function to handle opening the confirmation popup
  const handlePopUpOpen = () => {
    event.preventDefault();
    setShowPopup(true);
  };
  // Function to handle closing the confirmation popup
  const handlePopUpClose = () => {
    setShowPopup(false);
  };
  // Function to handle button click in the confirmation popup
  const handlePopUpButtonClick = (buttonValue) => {
    setSelectedOption(buttonValue);
  };
  // Execute when selectedOption changes
  useEffect(() => {
    if (selectedOption) {
      deactivator();
    }
  }, [selectedOption]);

  let api_url = import.meta.env.VITE_API_URL;

  // Fetch array of students from the database
  //This gets an array of students from the database
  useEffect(() => {
    axios
      .post(api_url + "Student.php", { request: "all_active_students" })
      .then((res) => {
        setStudents(res.data);
        setLoading(false);
      });
  }, []);
  // Create an array for the search box select statement using the fetched student data

  useEffect(() => {
    if (students) {
      const temp = students.map((student) => ({
        label: student.last + ", " + student.first + " " + student.cwu_id,
        value: students.indexOf(student),
      }));
      setSearchStudents(temp);
    }
  }, [students]);

  //If the search student array is set then this will sort it in aplhabetical order
  if (searchStudents) {
    searchStudents.sort(function (a, b) {
      return a.label.localeCompare(b.label);
    });
  }

  //sets the selected student
  const selectHandler = ({ value }) => {
    setLoading(true);
    let id = parseInt(value);
    let newStudent = students[id];
    setSelectedStudent(students[id]);
    setInfo(false);
    setPlan(false);
    setCanEdit(false);
    setPrograms([]);
    setAdvisors([]);

    //Gets info regarding student program and advisor
    axios
      .post(api_url + "Student_program.php", {
        request: "programs_with_student",
        student_id: newStudent.id,
      })
      .then((res) => {
        res.data.map((row) => {
          setAdvisors(Object.entries(advisors).concat(row.advisor_name));
          setProgramID(row.programID);
          setPrograms(Object.entries(programs).concat(row.program_name));
          if (row.advisor_id == localStorage.getItem("userId")) {
            setCanEdit(true);
          }
        });

        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  // Function to deactivate a student
  const deactivator = () => {
    axios
      .post(api_url + "Student.php", {
        request: "change_activation",
        id: selectedStudent.id,
        active: "No",
      })
      .then((res) => {
        if (res.data) {
          delete students[students.indexOf(selectedStudent)];
          setStudents(students);
          console.log("it works");
          window.location.reload(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="student-search-container">
      {/* Title and Search Box */}
      <div className="student-search-title-wrapper">
        <h1>Student Search</h1>
        <SearchBox
          list={searchStudents}
          placeholder="Search for a Student"
          value="Search"
          onChange={selectHandler}
        />
      </div>
      {/* User Student Warning */}
      <div className="warning">
        {!canEdit && (
          <UserStudentWarning
            studentId={selectedStudent.id}
            programId={programID}
          />
        )}
      </div>
      {/* Student Info and Plan */}
      <div className="student-info-wrapper">
        {selectedStudent != 0 && (
          <div className="student-overview-nav-wrapper">
            <h3>{selectedStudent.first + " " + selectedStudent.last}</h3>
            <button
              className={(isInfo && "overview-btn-active") || "overview-btn"}
              onClick={() => {
                setInfo(true);
                setPlan(false);
              }}
            >
              Info
            </button>
            {/* Button to switch to Plan */}

            <button
              className={(isPlan && "overview-btn-active") || "overview-btn"}
              onClick={() => {
                setInfo(false);
                setPlan(true);
              }}
            >
              Plan
            </button>
          </div>
        )}
        {/* Render Student Info component */}

        {selectedStudent != 0 && isInfo && (
          <StudentInfo
            student={selectedStudent}
            programs={programs}
            advisors={advisors}
          />
        )}
        {/* Render Student Plan component */}
        {selectedStudent != 0 && isPlan && (
          <StudentPlan key={selectedStudent} student={selectedStudent} />
        )}

        {/* Deactivate button */}
        {isInfo && (
          <button className="student-deactivate-btn" onClick={handlePopUpOpen}>
            Deactivate
          </button>
        )}
      </div>
      <LoadingScreen open={isLoading} />
    </div>
  );
};

export default StudentSearch;

//{selectedStudent != 0 && <StudentOverview student={selectedStudent} />}
