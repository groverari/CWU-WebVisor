import React, { useEffect, useState } from 'react'
import SearchBox from '../search-box/search-box'
import { AiOutlineClose } from 'react-icons/ai'
import './class-selector.styles.scss'
import PropTypes from 'prop-types';

function ClassSelector({ title, classes, alreadyInsertedClasses, handleExtraClassesUpdate, handleMissingClassesUpdate }) {
  // const [searchClasses, setSearchClasses] = useState([])
  // const [selectedClass, setSelectedClass] = useState(null)
  // const [classList, setClassList] = useState({})
  // const [extraClasses, setExtraClasses] = useState([])
  // const [missingClasses, setMissingClasses] = useState([])
  // const [selectedGrades, setSelectedGrades] = useState({});
  // const [updatedClasses, setUpdatedClasses] = useState([])

  // const gradeList = [
  //   { value: 40, label: 'A' },
  //   { value: 37, label: 'A-' },
  //   { value: 33, label: 'B+' },
  //   { value: 30, label: 'B' },
  //   { value: 27, label: 'B-' },
  //   { value: 23, label: 'C+' },
  //   { value: 20, label: 'C' },
  //   { value: 17, label: 'C-' },
  //   { value: 13, label: 'D+' },
  //   { value: 10, label: 'D' },
  //   { value: 7, label: 'D-' },
  //   { value: 0, label: 'F' },
  // ];
  

  // useEffect(() => {
  //   // Update the parent component with the new values of extraClasses and missingClasses
  //   handleExtraClassesUpdate(extraClasses);
  //   handleMissingClassesUpdate(missingClasses);

  //   console.log("inside child; extra");
  //   console.log(extraClasses);

  //   console.log("inside child; missing");
  //   console.log(missingClasses);

  // }, [extraClasses, missingClasses]);

  // useEffect(() => {
  //   if (classes) {
  //     setSearchClasses(
  //       classes.map((val) => ({
  //         label: val.name,
  //         value: classes.indexOf(val)
  //       }))
  //     )
  //   }
  // }, [classes])

  // useEffect(() => {
  //   console.log("inside class-selector");
  //   console.log(alreadyInsertedClasses);
  //   console.log("\n");
  //   if (alreadyInsertedClasses) {
  //     Object.keys(alreadyInsertedClasses).forEach((key) => {
  //       setClassList(prevClassList => ({
  //         ...prevClassList,
  //         [key]: alreadyInsertedClasses[key]
  //       }));
  //     });
  //   }
  //   console.log("already inserted classes ")
  //   console.log(classList)
  // }, [alreadyInsertedClasses])

  // useEffect(() => {
  //   const insertedClasses = Object.values(classList);
  
  //   const extClasses = insertedClasses.filter(
  //     (classItem) => !Object.values(alreadyInsertedClasses).includes(classItem)
  //   );
  //   setExtraClasses(extClasses);
  
  //   const misClasses = Object.values(alreadyInsertedClasses).filter(
  //     (classItem) => !insertedClasses.includes(classItem)
  //   );
  //   setMissingClasses(misClasses);
  
  //   // Update the updatedClasses array with the classes whose grade is changed
  //   const updatedClasses = insertedClasses.filter(
  //     (classItem) => alreadyInsertedClasses[classItem.id]?.grade !== classItem.grade
  //   );
  //   setUpdatedClasses(updatedClasses);
  // }, [classList, alreadyInsertedClasses]);
  

  // useEffect(() => {
  //   const insertedClasses = Object.values(classList);
  
  //   const misClasses = Object.values(alreadyInsertedClasses).filter(
  //     (classItem) => !insertedClasses.includes(classItem)
  //   );
  //   setMissingClasses(misClasses);
    
  // }, [classList, alreadyInsertedClasses]);

  // if (searchClasses) {
  //   searchClasses.sort(function (a, b) {
  //     return a.label.localeCompare(b.label)
  //   })
  // }

  // const selectHandler = (selected) => {
  //   const selectedClass = classes[selected.value];
  //   setSelectedClass(selectedClass);
    
  //   // Check if the class is already inserted
  //   if (!Object.values(classList).includes(selectedClass)) {
  //     // Add the selected class with the initial grade to the classList
  //     setClassList(prevClassList => ({
  //       ...prevClassList,
  //       [selectedClass.id]: {
  //         ...selectedClass,
  //         grade: selectedGrades[selectedClass.id] || '' // Use the selected grade or an empty string if not available
  //       }
  //     }));
  //   } else {
  //     // Error POPUP goes here saying "Class is Already a prereq"
  //     console.log(`ERROR: ${selectedClass.name} is already a prereq for this class`);
  //   }
  // };
  

  // const addClass = () => {
  //   if (selectedClass && !Object.values(classList).includes(selectedClass)) {
  //     setClassList(prevClassList => ({
  //       ...prevClassList,
  //       [selectedClass.id]: selectedClass
  //     }));
  //   } else {
  //     // Error POPUP goes here saying "Class is Already a prereq"
  //     console.log(`ERROR: ${selectedClass.name} is already a prereq for this class`);
  //   }
  // };
  
  // const removeClass = (rem_class) => {
  //   setClassList(prevClassList => {
  //     const updatedClassList = { ...prevClassList };
  //     delete updatedClassList[rem_class.id];
  //     return updatedClassList;
  //   });
  // }

  // return (
  //   <div className="class-selector-box">
  //     <h1>{title}</h1>
  //     <select
  //       value={val.grade || ''}
  //       onChange={(e) => {
  //         const selectedGrade = e.target.value;
  //         setClassList(prevClassList => ({
  //           ...prevClassList,
  //           [val.id]: {
  //             ...prevClassList[val.id],
  //             grade: selectedGrade
  //           }
  //         }));
  //         setSelectedGrades(prevSelectedGrades => ({
  //           ...prevSelectedGrades,
  //           [val.id]: selectedGrade
  //         }));
  //       }}
  //     >
  //       <option value="">Select Grade</option>
  //       {gradeList.map((grade) => (
  //         <option key={grade.value} value={grade.value}>
  //           {grade.label}
  //         </option>
  //       ))}
  //     </select>

  //     <button onClick={addClass}>Add</button>
  //     {Object.values(classList).map((val) => (
  //       <div key={val.id} className="class-selector-card">
  //         <h4>{val.name}</h4>
  //         <h4>{val.credits}</h4>
  //         <SearchBox
  //           list={gradeList}
  //           placeholder="C"//needs to be changed
  //           value="Search"
  //           onChange=
  //         />
  //         <button
  //           className="remove-class-btn"
  //           onClick={() => {
  //             removeClass(val)
  //           }}
  //         >
  //           <AiOutlineClose />
  //         </button>
  //       </div>
  //     ))}
  //   </div>
  // )
}

ClassSelector.propTypes = {
  title: PropTypes.string.isRequired,
  classes: PropTypes.array.isRequired,
  alreadyInsertedClasses: PropTypes.object.isRequired,
  extraClasses: PropTypes.array.isRequired,
  missingClasses: PropTypes.array.isRequired,
};

export default ClassSelector;
