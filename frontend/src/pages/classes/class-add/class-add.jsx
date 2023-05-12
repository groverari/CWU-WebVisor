import React, { useState } from "react";
import "./class-add.styles.scss";
import ClassSelector from "../../../components/class-selector/class-selector";
import axios from "axios";

const AddClass = () => {
  const api_url = import.meta.env.VITE_API_URL;
  const [classData, setClassData] = useState({
    catalogCode: " ",
    name: " ",
    credits: " ",
  });

  const [quarterOffered, setQuarterOffered] = useState({
    Fall: "NO",
    Winter: "NO",
    Spring: "NO",
    Summer: "NO",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform any further actions with the form data
    console.log(classData);
    console.log(quarterOffered.Fall);

    axios
      .post(api_url + "Class.php", {
        request: "add_class",
        user_id: 41792238,
        name: classData.catalogCode,
        title: classData.name,
        credits: classData.credits,
        fall: quarterOffered.Fall,
        winter: quarterOffered.Winter,
        spring: quarterOffered.Spring,
        summer: quarterOffered.Summer,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
        setErrorMesssage(error);
        setShowError(true);
      });
  };

  const handleInputChange = (event) => {
    const { catalogCode, value } = event.target;
    setClassData((prevFormData) => ({
      ...prevFormData,
      [catalogCode]: value,
    }));
  };

  const handleQuarterOfferedChange = (quarter) => {
    setQuarterOffered((prevQuarterOffered) => ({
      ...prevQuarterOffered,
      [quarter]: !prevQuarterOffered[quarter],
    }));
  };

  return (
    <div className="form-container">
      <h1>Add Class</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="catalogCode">Catalog Code:</label>
          <input
            type="text"
            id="catalogCode"
            value={classData.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={classData.title}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="credits">Credits:</label>
          <input
            type="text"
            id="credits"
            value={classData.credits}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Quarter Offered:</label>
          <div>
            <label htmlFor="fall">
              <input
                type="checkbox"
                id="fall"
                checked={quarterOffered.Fall}
                onChange={() => handleQuarterOfferedChange("Fall")}
              />
              Fall
            </label>
          </div>
          <div>
            <label htmlFor="winter">
              <input
                type="checkbox"
                id="winter"
                checked={quarterOffered.Winter}
                onChange={() => handleQuarterOfferedChange("Winter")}
              />
              Winter
            </label>
          </div>
          <div>
            <label htmlFor="spring">
              <input
                type="checkbox"
                id="spring"
                checked={quarterOffered.Spring}
                onChange={() => handleQuarterOfferedChange("Spring")}
              />
              Spring
            </label>
          </div>
          <div>
            <label htmlFor="summer">
              <input
                type="checkbox"
                id="summer"
                checked={quarterOffered.Summer}
                onChange={() => handleQuarterOfferedChange("Summer")}
              />
              Summer
            </label>
          </div>
        </div>

        <button type="submit">Add Class</button>
      </form>
    </div>
  );
};

export default AddClass;
