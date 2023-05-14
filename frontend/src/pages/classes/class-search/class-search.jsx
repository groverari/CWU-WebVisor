import React from "react";
import "./class-search.styles.scss";
import SearchBox from "../../../components/search-box/search-box";
import { useState, useEffect } from "react";
import axios from "axios";
import ClassSelector from "../../../components/class-selector/class-selector";

const ClassSearch = () => {
  const [classes, setClasses] = useState([]);
  const [searchClasses, setSearchClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(0);
  //to show on the page
  const [showInfo, setShowInfo] = useState(false);

  let api_url = import.meta.env.VITE_API_URL;

  //how do you get class fromt the data base;

  useEffect(() => {
    axios
      .post(api_url + "Class.php", { request: "all_active_classes" })
      .then((res) => {
        setClasses(res.data);
        setSearchClasses(res.data); //set searchClasses to all classes initially
      });
  }, []);

  useEffect(() => {
    if (classes) {
      const temp = classes.map((clas) => ({
        label: clas.name,
        value: classes.indexOf(clas),
      }));
      setSearchClasses(temp);
    }
  }, [classes]);

  // const handleSearch = (inputValue) => {
  //   const filteredClasses = classes.filter((classItem) => {
  //     // Perform search based on class properties (e.g., name, code, etc.)
  //     return (
  //       classItem.name.toLowerCase().includes(inputValue.toLowerCase()) ||
  //       classItem.code.toLowerCase().includes(inputValue.toLowerCase())
  //       // Add more conditions if needed
  //     )
  //   })

  //   setSearchClasses(filteredClasses)
  //}
  const selectHandler = ({ value }) => {
    let id = parseInt(value);
    console.log(classes[id]);

    //selected id
    setSelectedClass(id);
  };

  //handeling button
  const handleInfoButtonClick = () => {
    setShowInfo(true);
  };

  return (
    <div className="class-search-container">
      <h1>Class Search</h1>
      <SearchBox
        list={searchClasses}
        placeholder="Search for a class"
        value="Search"
        onChange={selectHandler}
      />

      <button onClick={handleInfoButtonClick}>Show Info</button>

      {showInfo && (
        <form className="class-info-form">
          <div>
            <label>Catalog:</label>
            <input type="text" value={classes[selectedClass].name} disabled />
          </div>
          <div>
            <label>Course Name:</label>
            <input type="text" value={classes[selectedClass].title} disabled />
          </div>

          <div>
            <label>Credits:</label>
            <input
              type="text"
              value={classes[selectedClass].credits}
              disabled
            />
          </div>

          <div>
            <label>Fall:</label>
            <input type="text" value={classes[selectedClass].fall} disabled />
          </div>

          <div>
            <label>Winter:</label>
            <input type="text" value={classes[selectedClass].winter} disabled />
          </div>

          <div>
            <label>Spring:</label>
            <input type="text" value={classes[selectedClass].spring} disabled />
          </div>

          <div>
            <label>Summer:</label>
            <input type="text" value={classes[selectedClass].summer} disabled />
          </div>
        </form>
      )}

      <ClassSelector title="PreReqs" classes={classes} />
    </div>
  );
};

export default ClassSearch;
