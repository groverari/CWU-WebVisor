import React, { useState, useEffect } from 'react'
import './major-edit.styles.scss'
import MajorInfo from '../../../components/major-info/major-info'
import SearchBox from '../../../components/search-box/search-box'
import axios from 'axios'

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
    console.log('updating search box')
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
    if (updatedName == '') {
      console.log('No Changes Yet')
    } else {
      delete majors[majors.indexOf(selectedMajor)]
      selectedMajor.name = updatedName
      setMajors(majors.concat(selectedMajor))
      console.log(majors)
      console.log(searchMajors)
      axios.post(api_url + 'Major.php', {
        request: 'update',
        //user_id: localStorage.getItem('userId'),
        id: selectedMajor.id,
        name: updatedName,
        active: 'Yes'
      })
    }
  }

  return (
    <div>
      <h1>Major Search</h1>
      <SearchBox
        placeHolder="Search for a Major"
        list={searchMajors}
        value="Search"
        onChange={selectHandler}
      />
      <button onClick={buttonHandler}>Search</button>

      {showInfo && (
        <div className="major-info">
          <label>Name: </label>
          <input
            type="text"
            defaultValue={selectedMajor.name}
            onChange={(event) => {
              setName(event.target.value)
            }}
          />
          <button onClick={updator}>Update</button>
        </div>
      )}
    </div>
  )
}

export default EditMajor
