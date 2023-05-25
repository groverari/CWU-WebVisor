import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import './student-add.scss'
import ErrorPopUp from '../../../components/PopUp/error/ErrorPopUp'
import ConfPopUp from '../../../components/PopUp/confirmation/confPopUp'
import SearchBox from '../../../components/search-box/search-box'

const AddStudent = () => {
  const api_url = import.meta.env.VITE_API_URL
  const [programs, setPrograms] = useState([])
  const [searchPrograms, setSearchPrograms] = useState([])
  const { control, register, handleSubmit, setValue } = useForm()

  useEffect(() => {
    axios
      .post(api_url + 'program.php', { request: 'all_programs' })
      .then((res) => {
        setPrograms(res.data)
        //console.log(res.data)
      })
  }, [])

  useEffect(() => {
    if (programs) {
      let temp = programs.map((program) => ({
        label: program.name + ' ' + program.year,
        value: programs.indexOf(program)
      }))

      temp.sort(function (a, b) {
        return a.label.localeCompare(b.label)
      })
      setSearchPrograms(temp)
    }
  }, [programs])

  const confirm = (data) => {
    if (data.program == undefined) console.log('make sure to add a program')
    else {
      handleFormSubmit(data)
    }
  }

  const handleFormSubmit = (data) => {
    let user_id = localStorage.getItem('userId')
    let stu_id = 0
    data.email += '@cwu.edu'
    axios
      .post(api_url + 'Student.php', {
        request: 'add_student',
        user_id: user_id,
        first: data.first,
        last: data.last,
        email: data.email,
        cwu_id: data.cwu_id
      })
      .then((res) => {
        console.log(res.data)
        if (res.data.includes('Error')) {
          console.log('handled error')
          //setErrorMesssage(res.data)
          //setShowError(true)
        } else {
          axios
            .post(api_url + 'Student_program.php', {
              request: 'add_student',
              api_key: import.meta.env.API_KEY,
              user_id: user_id,
              student_id: res.data,
              program_id: data.program
            })
            .then((res) => {
              console.log(res.data)
            })
        }
      })
      .catch((error) => {
        console.log(error)
        console.log('unhandled error')
      })
  }

  return (
    <div>
      <h1>Add Student</h1>
      <form onSubmit={handleSubmit(confirm)}>
        <div className="student-add-select">
          <label>Student Program: </label>
          <Controller
            control={control}
            name="program"
            required
            render={() => {
              return (
                <SearchBox
                  placeholder="Select a Program"
                  list={searchPrograms}
                  onChange={({ value }) => {
                    const program = programs[parseInt(value)]
                    setValue('program', program.program_id)
                  }}
                />
              )
            }}
          ></Controller>
        </div>
        <div className="form-group">
          <label>First Name</label>
          <input type="text" {...register('first')} required />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input type="text" {...register('last')} required />
        </div>
        <div className="form-group">
          <label>CWU Email</label>
          <input type="text" {...register('email')} required />
        </div>
        <div className="form-group">
          <label>CWU ID</label>
          <input
            {...register('cwu_id')}
            pattern="[0-9]{8}"
            type="text"
            required
          />
        </div>
        <div className="add-submit-btn-wrapper">
          <input className="submit-btn" type="submit" value="Add Student" />
        </div>
      </form>
    </div>
  )
}
export default AddStudent

/**
 * <div className="form-container">
      <h1>Add Student</h1>
      <form onSubmit={handlePopUpOpen}>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>CWU ID:</label>
          <input
            type="text"
            name="cwuId"
            title="Please enter an 8-digit number."
            pattern="[0-9]{8}"
            required
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <span className="email-domain">@cwu.edu</span>
        </div>

        <button className="submit-btn" type="submit">
          Add Student
        </button>
      </form>
      {showPopup && (
        <ConfPopUp
          action="add"
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
 */
