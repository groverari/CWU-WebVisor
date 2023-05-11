import React from 'react'

function PlanSelectBox({ classes }) {
  return (
    <div>
      <select>
        {classes.map((clss) => (
          <option value={clss.id}>{clss.name}</option>
        ))}
      </select>
    </div>
  )
}

export default PlanSelectBox
