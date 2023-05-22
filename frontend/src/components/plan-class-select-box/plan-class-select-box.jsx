import React from 'react'
import './plan-class-select-box.styles.scss'

function PlanSelectBox({ classes, selClass, changeHandler }) {
  const update = () => {}
  return (
    <div>
      <select className="select-box" onChange={update}>
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
