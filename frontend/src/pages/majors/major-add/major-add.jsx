import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import './major-add.scss'

const AddMajor = () => {
  const api_url = import.meta.env.VITE_API_URL
  const { register, handleSubmit } = useForm()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [conf, setConf] = useState(false)
  const [formData, setFormData] = useState([])
  const handleSuccess = () => {
    setSuccess(false)
  }
  const successOpen = () => {
    setSuccess(true)
  }
  const errorClose = () => {
    setError(false)
  }
  const errorOpen = () => {
    setError(true)
  }
  const confClose = () => {
    setConf(false)
  }
  const confYes = () => {
    setConf(false)
    onUpdate(formData)
  }

  const formSubmit = (data) => {
    setConf(true)
    setFormData(data)
  }

  const addMajor = (data) => {
    axios
      .post(api_url + 'Major.php', {
        request: 'create',
        name: data.name,
        active: 'Yes'
      })
      .then((res) => {
        console.log(res.data)
        if (typeof res.data === 'string' && res.data.includes('Error')) {
          console.log('handled error')
          setErrorMesssage(res.data)
          setShowError(true)
        } else {
          console.log('no error')
        }
      })
      .catch((error) => {
        console.log(error)
        console.log('unhandled error')
      })
  }

  return (
    <div>
      <div className="major-add-container">
        <h1>Add Major</h1>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="form-group">
            <label>Major Name:</label>
            <input type="text" {...register('name')} />
          </div>
          <input
            className="major-add-submit-btn"
            type="submit"
            value="Add Major"
          ></input>
        </form>
      </div>
    </div>
  )
}
export default AddMajor
