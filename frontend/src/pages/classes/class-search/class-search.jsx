import React from "react";
import "./class-search.styles.scss";
import SearchBox from "../../../components/search-box/search-box";
import { useState, useEffect } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import ClassSelector from "../../../components/class-selector/class-selector";
import ConfPopUp from "../../../components/PopUp/confirmation/confPopUp";

const ClassSearch = () => {
  const [classes, setClasses] = useState([]);
  const [searchClasses, setSearchClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(0);
  const { control, register, handleSubmit, setValue } = useForm();
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
    setShowInfo(false);
    let id = parseInt(value);
    console.log(classes[id]);

    //selected id
    setSelectedClass(classes[id]);
  };

  //handeling button
  const handleInfoButtonClick = () => {
    setShowInfo(true);
  };

  const onUpdate = (data) => {
    console.log(data);
  };

  const [showPopup, setShowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handlePopUpOpen = () => {
    event.preventDefault();
    setShowPopup(true);
  };

  const handlePopUpClose = () => {
    setShowPopup(false);
  };

  const handlePopUpButtonClick = (buttonValue) => {
    setSelectedOption(buttonValue);
  };
  useEffect(() => {
    if (selectedOption) {
      handleSubmit(onUpdate)();
    }
  }, [selectedOption]);

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
        <form onSubmit={handlePopUpOpen}>
          <div>
            <label>Catalog:</label>
            <input
              {...register("catalog")}
              type="text"
              defaultValue={selectedClass.name}
            />
          </div>
          <div>
            <label>Course Name:</label>
            <input
              {...register("name")}
              type="text"
              defaultValue={selectedClass.title}
            />
          </div>

          <div>
            <label>Credits:</label>

            <input
              {...register("credit")}
              type="text"
              defaultValue={selectedClass.credits}
            />
          </div>
          <div>
            <label>Fall:</label>
            <input
              {...register("fall")}
              type="text"
              defaultValue={selectedClass.fall}
            />
          </div>

          <div>
            <label>Winter:</label>
            <input
              {...register("winter")}
              type="text"
              defaultValue={selectedClass.winter}
            />
          </div>
          <div>
            <label>Spring:</label>
            <input
              {...register("spring")}
              type="text"
              defaultValue={selectedClass.spring}
            />
          </div>
          <div>
            <label>Summer:</label>
            <input
              {...register("summer")}
              type="text"
              defaultValue={selectedClass.summer}
            />
          </div>

          <input type="submit" value="Update" />
        </form>
      )}
      {showPopup && (
        <ConfPopUp
          action="update"
          onClose={handlePopUpClose}
          onButtonClick={handlePopUpButtonClick}
        />
      )}

      <ClassSelector title="PreReqs" classes={classes} />
    </div>
  );
};

export default ClassSearch;

/**
 * 
 * 
 * <form className="class-info-form">
         
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
            <label>Credits:</label>

            <input
              {...register("credit")}
              type="text"
              defaultValue={selectedClass.credits}
            />
          </div>

          <div>
            <label>Fall:</label>
            <input type="text" value={classes[selectedClass].fall} disabled />
          </div>

          <div>
            <label>Winter:</label>
            <input 
            ...register("winter")}type="text" 
            defaultValue={selectedClass].winter}
            />
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
 */
