import React from 'react'
import './student-info.styles.scss'

function StudentInfo({ props }) {
  const { student } = props
  return (
    <form>
      <label>First Name</label>
      <input type="text" placeholder={student.fname} />
      <br />
      <label>Last Name</label>
      <input type="text" placeholder={student.lname} />
      <br />
      <label>Student ID</label>
      <input type="text" placeholder={student.id} /> <br />
      <label></label>
    </form>
  )
}

export default StudentInfo
