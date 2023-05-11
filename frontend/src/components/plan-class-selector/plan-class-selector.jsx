import React from 'react'

function PlanClassSelector({ year, quarter, classes }) {
  let quarter_name = ''
  if (quarter == 1) quarter_name = 'Fall'
  else if (quarter == 2) quarter_name = 'Winter'
  else if (quarter == 3) quarter_name = 'Spring'
  else quarter_name = 'Summer'

  return (
    <div>
      <p>
        {quarter_name}: {year}
      </p>
    </div>
  )
}

export default PlanClassSelector
