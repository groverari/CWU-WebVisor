import React, { useEffect, useState } from 'react'
import SearchBox from '../search-box/search-box'
import ClassSelectorCard from '../class-selector-card/class-selector-card'

function ClassSelector({ title, classes }) {
  const [searchClasses, setSearchClasses] = useState([])
  const [selectedClass, setSelectedClass] = useState([])
  const [classList, setClassList] = useState([])

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

  if (searchClasses) {
    searchClasses.sort(function (a, b) {
      return a.label.localeCompare(b.label)
    })
  }

  const selectHandler = (selected) => {
    setSelectedClass(classes[selected.value])
  }
  const addClass = () => {
    const temp = classList
    temp.push(selectedClass)
    setClassList(temp)
    console.log(classList)
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
      {classList.map((val) => (
        <ClassSelectorCard
          title={val.name}
          handleChange={() => {
            console.log('remove')
          }}
        />
      ))}
    </div>
  )
}

export default ClassSelector
