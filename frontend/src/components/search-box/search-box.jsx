import React, { useState } from 'react'
import './search-box.scss'
import Select from 'react-select'

function SearchBox(props) {
  const [selected, setSelected] = useState(0)

  //const handleSelect = (selected) =>{setSelected(selected)}

  return (
    <div className="search-box-container">
      <Select
        className="select"
        options={props.list}
        placeholder={props.placeholder}
        //value={props.value}
        defaultInputValue={props.defaultValue}
        onChange={props.onChange}
      />
    </div>
  )
}

export default SearchBox
