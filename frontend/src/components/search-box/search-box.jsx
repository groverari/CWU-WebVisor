import React, { useState } from "react";
import "./search-box.scss";
import Select from "react-select";

function SearchBox(props) {
  // State variable to store the selected option
  const [selected, setSelected] = useState(0);

  // Function to handle option selection
  return (
    <div className="search-box-container">
      <Select
        className="select"
        options={props.list}
        placeholder={props.placeholder}
        //value={props.value}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
      />
    </div>
  );
}

export default SearchBox;
