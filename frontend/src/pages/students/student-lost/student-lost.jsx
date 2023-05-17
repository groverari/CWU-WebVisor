import './student-lost.styles.scss'
import axios from 'axios'
import React, { useState, useEffect } from 'react'

const LostStudents = () => {
  const [lost, setLost] = useState([])
  const api_url = import.meta.env.VITE_API_URL
  useEffect(() => {
    axios
      .post(api_url + 'Student.php', { request: 'get_bad_cwu_ids' })
      .then((res) => {
        setLost(res.data)
      })
  }, [])

  return (
    <div className="lost-table-wrapper">
      <div className="lost-title-wrapper">
        <h1>Lost Students</h1>
        <p>
          In order to correct any mistake, please copy the id and paste it into
          the Student Search tab or the Archived Student tab based on the active
          status of the student.
        </p>
      </div>
      <div>
        {Object.keys(lost).length == 0 && <h1>no Lost Students</h1>}
        <h3 className="table-title">Bad CWU IDs</h3>
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Student Id</th>
              <th>Student Email</th>
              <th>Active Status</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(lost).length != 0 &&
              lost.map((student) => {
                return (
                  <tr key={student.cwu_id}>
                    <td>{student.name}</td>
                    <td>{student.cwu_id}</td>
                    <td>{student.email}</td>
                    <td>{student.active}</td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default LostStudents
