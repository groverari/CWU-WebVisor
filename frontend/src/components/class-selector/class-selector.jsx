import React, { useEffect, useState } from 'react'
import SearchBox from '../search-box/search-box'
import { AiOutlineClose } from 'react-icons/ai'
import './class-selector.styles.scss'

function ClassSelector({ title, classes, alreadyInsertedClasses }) {
  const [searchClasses, setSearchClasses] = useState([])
  const [selectedClass, setSelectedClass] = useState([])
  const [classList, setClassList] = useState(Object)

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
    console.log("inside class-selector");
    console.log(alreadyInsertedClasses);
    console.log("\n");
    if(alreadyInsertedClasses)
    {
      setClassList(alreadyInsertedClasses)
      console.log(classList)
    }
  }, [])

  if (searchClasses) {
    searchClasses.sort(function (a, b) {
      return a.label.localeCompare(b.label)
    })
  }

  const selectHandler = (selected) => {
    setSelectedClass(classes[selected.value])
  }
  const addClass = () => {
    if (!Object.entries(classList).includes(selectedClass)) {
      setClassList(Object.entries(classList).concat(selectedClass))
    } else {
      //Error POPUP goes here saying "Class is Already a prereq"
      console.log(
        `ERROR: ${selectedClass.name} is already a prereq for this class`
      )
    }
  }
  const removeClass = (rem_class) => {
    setClassList(() => {
      return classList.filter((classL) => {
        return classL !== rem_class
      })
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
      {Object.entries(classList).map(([key, val]) => (
      <div key={key} className="class-selector-card">
        <h4>{val.name}</h4>
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
