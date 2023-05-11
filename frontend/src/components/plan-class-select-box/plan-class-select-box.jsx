import React from 'react'
import './plan-class-select-box.styles.scss'

function PlanSelectBox({ classes }) {
  return (
    <div>
      <select className="select-box">
        <option value={0}>-- Select a Class --</option>
        {classes.map((clss) => (
          <option key={clss.id} value={clss.id}>
            {clss.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default PlanSelectBox
