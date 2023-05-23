import React, { useEffect } from 'react'
import './plan-class-select-box.styles.scss'

function PlanSelectBox({ classes, selClass = 0, changeHandler }) {
  const prevClass = selClass
  const [selected, setSelected] = useState([])
  useEffect(() => {
    if (selClass) {
      setSelected(selClass)
    } else {
      prevClass = 0
    }
  })
  const update = () => {
    s
  }
  return (
    <div>
      <select className="select-box" onChange={update}>
        {!prevClass && <option value={0}>Select a Class</option>}
        {prevClass && <option value={0}>{prevClass.name}</option>}
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
