import React, { useState } from "react";
import "./class-add.styles.scss";

//import { useForm, Controller } from "react-hook-form";
import ClassSelector from "../../../components/class-selector/class-selector";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import Switch from "@mui/material/Switch";

import ErrorPopUp from "../../../components/PopUp/error/ErrorPopUp";
import ConfPopUp from "../../../components/PopUp/confirmation/confPopUp";

const AddClass = () => {
  const api_url = import.meta.env.VITE_API_URL;
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [errorMessage, setErrorMesssage] = useState(" ");
  const [showError, setShowError] = useState(false);

  const [classData, setClassData] = useState({
    catalogCode: "",
    name: "",
    credits: "",
  });

  const handleErrorPopUpClose = () => {
    setShowError(false);
  };

  const [quarterOffered, setQuarterOffered] = useState({
    Fall: false,
    Winter: false,
    Spring: false,
    Summer: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(classData);

    const selectedQuarters = Object.keys(quarterOffered).reduce(
      (quarters, quarter) => {
        quarterOffered[quarter] == quarterOffered[quarter] ? "yes" : "no";
        return quarters;
      },
      {}
    );

    axios
      .post(api_url + "Class.php", {
        request: "add_class",
        user_id: localStorage.getItem("userId"),
        name: classData.catalogCode,
        title: classData.name,
        credits: classData.credits,

        quarters: selectedQuarters,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
        console.log("no, here");
      });
  };

  /**
   *  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setClassData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleQuarterOfferedChange = (quarter) => {
    setQuarterOffered((prevQuarterOffered) => ({
      ...prevQuarterOffered,
      [quarter]: !prevQuarterOffered[quarter] === "yes" ? "no" : "yes",
    }));
  };

   * @param {*} event 
   */

  return (
    <div className="form-container">
      <h1>Add Class</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="catalogCode">Catalog Code:</label>
          <input
            type="text"
            id="catalogCode"
            value={classData.catalogCode}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={classData.name}
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

      {showPopup && (
        <ConfPopUp
          action="add"
          onClose={handlePopUpClose}
          onButtonClick={handlePopUpButtonClick}
        />
      )}
      {showError && (
        <ErrorPopUp
          popUpContent={errorMessage}
          onErrorClose={handleErrorPopUpClose}
        />
      )}
    </div>
  );
};

export default AddClass;

/*

<div className="form-group">
          <label>Quarter Offered:</label>
          <div>
            <Controller
              control={control}
              name="quarterOffered.Fall"
              render={({ field }) => (
                <label htmlFor="fall">
                  <input
                    type="checkbox"
                    id="fall"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                  Fall
                </label>
              )}
            />
          </div>

          <div>
            <Controller
              control={control}
              name="quarterOffered.Winter"
              render={({ field }) => (
                <label htmlFor="winter">
                  <input
                    type="checkbox"
                    id="winter"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                  Winter
                </label>
              )}
            />
          </div>

          <div>
            <Controller
              control={control}
              name="quarterOffered.Spring"
              render={({ field }) => (
                <label htmlFor="spring">
                  <input
                    type="checkbox"
                    id="spring"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                  Spring
                </label>
              )}
            />
          </div>

          <div>
            <Controller
              control={control}
              name="quarterOffered.Summer"
              render={({ field }) => (
                <label htmlFor="summer">
                  <input
                    type="checkbox"
                    id="summer"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                  Summer
                </label>
              )}
            />
          </div>
        </div> */
