import React from 'react'
import PlanSelectBox from '../plan-class-select-box/plan-class-select-box'
import './plan-class-selector.styles.scss'

function PlanClassSelector({ year, quarter, classes }) {
  let quarter_name = ''
  if (quarter == 1) quarter_name = 'Fall'
  else if (quarter == 2) quarter_name = 'Winter'
  else if (quarter == 3) quarter_name = 'Spring'
  else quarter_name = 'Summer'

  return (
    <div className="selector-container">
      <p>
        {quarter_name}: {year}
      </p>
      <div className="select-box-container">
        <PlanSelectBox classes={classes} />
        <PlanSelectBox classes={classes} />
        <PlanSelectBox classes={classes} />
        <PlanSelectBox classes={classes} />
        <PlanSelectBox classes={classes} />
        <PlanSelectBox classes={classes} />
      </div>
    </div>
  )
}

export default PlanClassSelector
