import React, { useEffect, useState } from 'react'
import SearchBox from '../search-box/search-box'
import { AiOutlineClose } from 'react-icons/ai'
import './class-selector.styles.scss'
import PropTypes from 'prop-types'

function ClassSelector({
  title,
  classes,
  alreadyInsertedClasses,
  handleExtraClassesUpdate,
  handleMissingClassesUpdate
}) {
  const [searchClasses, setSearchClasses] = useState([])
  const [selectedClass, setSelectedClass] = useState(null)
  const [classList, setClassList] = useState({})
  const [extraClasses, setExtraClasses] = useState([])
  const [missingClasses, setMissingClasses] = useState([])
  const [updatedClasses, setUpdatedClasses] = useState([])

  useEffect(() => {
    handleExtraClassesUpdate(extraClasses)
    handleMissingClassesUpdate(missingClasses)

    console.log('inside child; extra')
    console.log(extraClasses)

    console.log('inside child; missing')
    console.log(missingClasses)
  }, [extraClasses, missingClasses])

  useEffect(() => {
    if (classes) {
      setSearchClasses(
        classes.map((val) => ({
          label: val.name,
          value: classes.indexOf(val)
        }))
      )
    }
  }, [classes])

  useEffect(() => {
    console.log('inside class-selector')
    console.log(alreadyInsertedClasses)
    console.log('\n')
    if (alreadyInsertedClasses) {
      Object.keys(alreadyInsertedClasses).forEach((key) => {
        setClassList((prevClassList) => ({
          ...prevClassList,
          [key]: alreadyInsertedClasses[key]
        }))
      })
    }
    console.log('already inserted classes ')
    console.log(classList)
  }, [alreadyInsertedClasses])

  useEffect(() => {
    const insertedClasses = Object.values(classList)

    const extClasses = insertedClasses.filter(
      (classItem) => !Object.values(alreadyInsertedClasses).includes(classItem)
    )
    setExtraClasses(extClasses)

    const misClasses = Object.values(alreadyInsertedClasses).filter(
      (classItem) => !insertedClasses.includes(classItem)
    )
    setMissingClasses(misClasses)

    const updatedClasses = insertedClasses.filter(
      (classItem) =>
        alreadyInsertedClasses[classItem.id]?.grade !== classItem.grade
    )
    setUpdatedClasses(updatedClasses)
  }, [classList, alreadyInsertedClasses])

  if (searchClasses) {
    searchClasses.sort(function (a, b) {
      return a.label.localeCompare(b.label)
    })
  }

  const selectHandler = (selected) => {
    setSelectedClass(classes[selected.value])
  }

  const addClass = () => {
    if (selectedClass && !Object.values(classList).includes(selectedClass)) {
      setClassList((prevClassList) => ({
        ...prevClassList,
        [selectedClass.id]: selectedClass
      }))
    } else {
      console.log(
        `ERROR: ${selectedClass.name} is already a prereq for this class`
      )
    }
  }

  const removeClass = (rem_class) => {
    setClassList((prevClassList) => {
      const updatedClassList = { ...prevClassList }
      delete updatedClassList[rem_class.id]
      return updatedClassList
    })
  }

  return (
    <div className="class-selector-box">
      <h1>{title}</h1>
      <SearchBox
        list={searchClasses}
        placeholder="Add a Class"
        value="Search"
        onChange={selectHandler}
      />
      <button onClick={addClass}>Add</button>
      {Object.values(classList).map((val) => (
        <div key={val.id} className="class-selector-card">
          <h4>{val.name}</h4>
          <GradeSelect />
          <h4>{val.credits}</h4>
          <button
            className="remove-class-btn"
            onClick={() => {
              removeClass(val)
            }}
          >
            <AiOutlineClose />
          </button>
        </div>
      ))}
    </div>
  )
}

export default ClassSelector

const GradeSelect = ({ onChange }) => {
  return (
    <div>
      <select>
        <option value="A">A</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B">B</option>
        <option value="B-">B-</option>
        <option value="C+">C+</option>
        <option value="C">C</option>
        <option value="C-">C-</option>
        <option value="D+">D+</option>
        <option value="D">D</option>
        <option value="D-">D-</option>
        <option value="F">F</option>
        <option value="S">Satisfactory</option>
        <option value="U">Unsatisfactory</option>
      </select>
    </div>
  )
}
