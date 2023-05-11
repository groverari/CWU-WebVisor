import React from "react";
import "./class-search.styles.scss";
import SearchBox from "../../../components/search-box/search-box";
import { useState, useEffect } from "react";
import axios from "axios";

const ClassSearch = () => {
  const [classes, setClasses] = useState([]);
  const [searchClasses, setSearchClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(0);

  let api_url = import.meta.env.VITE_API_URL;

  //how do you get class fromt the data base;

  useEffect(() => {
    axios
      .post(api_url + "Class.php", { request: "all_active_classes" })
      .then((res) => {
        setClasses(res.data);
      });
  }, []);

  //just like in the student page
  //if the class array is set, this will create an array for the select student
  //one question do we have to do this in class;???

  return (
    <div className="class-search-container">
      <h1>Class Search</h1>
      <SearchBox
        list={[
          { label: "Option 1", value: 1 },
          { label: "Option 2", value: 2 },
        ]}
        placeholder="Search for a class"
        value="Search"
        onChange={(selectedOption) => {
          console.log(selectedOption);
        }}
      />
    </div>
  );
};

export default ClassSearch;
