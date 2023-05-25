import React, { useState } from 'react'
import axios from 'axios'
import Confirmation from '../PopUp/conf/confirmation'
import Button from '@mui/material/Button'
import LoadingScreen from '../PopUp/LoadingScreen/loading'
import './add_student_user.styles.scss'

function UserStudentWarning({ studentId, programId }) {
  const api_url = import.meta.env.VITE_API_URL
  const [conf, setConf] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const confOpen = (event) => {
    event.preventDefault()
    setConf(true)
  }
  const confClose = () => {
    setConf(false)
  }
  const confYes = (data) => {
    setConf(false)
    assign_student()
  }

  const pId = programId == 0 ? localStorage.getItem('program') : programId

  const assign_student = () => {
    setLoading(true)
    axios
      .post(api_url + 'Student_program.php', {
        request: 'add_student',
        user_id: localStorage.getItem('userId'),
        student_id: studentId,
        program_id: pId
      })
      .then((res) => {
        if (res.data) {
          setLoading(false)
          console.log(res.data)
        }
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }
  return (
    <div className="warning-wrapper">
      <h3>This Student is Not Assigned to You</h3>
      <p>
        You may view any content but no changes will be saved. To make any
        changes please assign the student to yourself
      </p>
      <Button
        variant="contained"
        color="success"
        className="addBtn"
        onClick={confOpen}
      >
        Assign Student to Me
      </Button>
      <Confirmation
        onClose={confClose}
        open={conf}
        message="Are you sure you would like to add this student to you? 
        This action can be undone later"
        button_text="Assign to me"
        yesClick={confYes}
      />
      <LoadingScreen open={isLoading} />
    </div>
  )
}

export default UserStudentWarning
