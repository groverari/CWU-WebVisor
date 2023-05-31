import React from 'react'
import './help.styles.scss'
import {
  StudentHelp,
  ClassHelp,
  MajorHelp
} from '../../components/help/help-component'

function Help() {
  return (
    <div>
      <h1>Help Page</h1>
      <div className="help-wrapper">
        <StudentHelp />

        <ClassHelp />

        <MajorHelp />
      </div>
    </div>
  )
}

export default Help
