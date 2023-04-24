import React from 'react'
import './search-box.scss'
import Select from 'react-select'

function SearchBox(props) {
  return (
    <div className="search-box-container">
      <Select
        className="select"
        options={props.list}
        placeholder={props.placeholder}
      />
      <input
        className="search-button"
        type="button"
        value={props.value}
      ></input>
    </div>
  )
}

export default SearchBox
