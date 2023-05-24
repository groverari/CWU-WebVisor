import React, { useState } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import './add_student_user.styles.scss'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

function UserStudentWarning({ studentId, programId }) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const api_url = import.meta.env.VITE_API_URL

  const pId = programId == 0 ? localStorage.getItem('program') : programId

  const yesClick = () => {
    handleClose()
    axios
      .post(api_url + 'Student_program.php', {
        request: 'add_student',
        user_id: localStorage.getItem('user_id'),
        studentId: studentId,
        programId: pId
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data)
        }
      })
      .catch((err) => {
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
        onClick={handleOpen}
      >
        Assign Student to Me
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            align="center"
          >
            Warning
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you would like to add student to yourself? This cannot
            be undone.
          </Typography>

          <br />
          <Button style={{ float: 'left' }} onClick={handleClose}>
            Take Me Back
          </Button>
          <Button style={{ float: 'right' }} onClick={yesClick}>
            Yes
          </Button>
        </Box>
      </Modal>
    </div>
  )
}

export default UserStudentWarning
