import React, { useState } from 'react'
import './major-info.styles.scss'

function MajorInfo({ major }) {
  const [name, setName] = useState(major.name)

  const nameChange = ({ target }) => {
    setName(target.value)
    console.log(target.value)
  }
  return <input type="text" defaultValue={major.name} onChange={nameChange} />
}

export default MajorInfo
