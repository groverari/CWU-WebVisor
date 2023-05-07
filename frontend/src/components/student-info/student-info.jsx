import React from 'react'
import './student-info.styles.scss'
import { useForm } from 'react-hook-form'
function StudentInfo() {
  const { update, handleUpdate } = useForm()
  const onUpdate = (data) => console.log(data)
  return <h1>Hi I am the student info page</h1>
}

export default StudentInfo
/**
 * <form>
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
        
        <br />
        <label>Advisor</label>
        
        <br />
        <label>Non Stem</label>
        <input type="text" value={student.nonStem} /> <br />
        <button>Update</button>
        <button>Deactivate</button>
      </form>
      */
