import React from 'react'
import './student-info.styles.scss'

function StudentInfo(props) {
  const { student } = props
  if (props.active) {
    return (
      <form>
        <h3>Student: </h3>
        <label>First Name</label>
        <input type="text" value={student.fName} />
        <br />
        <label>Last Name</label>
        <input type="text" value={student.lName} />
        <br />
        <label>Student ID</label>
        <input type="text" value={student.id} /> <br />
        <label>Email</label>
        <input type="text" value={student.email} /> <br />
        <label>Phone</label>
        <input type="text" value={student.phone} /> <br />
        <label>Address</label>
        <input type="text" value={student.address} /> <br />
        <h3>Program: </h3>
        <label>Program</label>
        {/* This is where dropdown of all programs will go */}
        <br />
        <label>Advisor</label>
        {/* This where the advisor drop down will go */}
        <br />
        <label>Non Stem</label>
        <input type="text" value={student.nonStem} /> <br />
        <button>Update</button>
        <button>Deactivate</button>
      </form>
    )
  }
}

export default StudentInfo
