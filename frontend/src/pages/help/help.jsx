import React from 'react'
import {
  StudentHelp,
  ClassHelp,
  MajorHelp
} from '../../components/help/help-component'

function Help() {
  return (
    <div>
      <h1>Help Page</h1>
      <div>
        <StudentHelp />
        <ClassHelp />
        <MajorHelp />
      </div>
    </div>
  )
}

export default Help
