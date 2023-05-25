import React, { useState, useEffect } from "react";
import "./user-add.styles.scss";
import ClassSelector from "../../../components/class-selector/class-selector";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import Switch from "@mui/material/Switch";

import ErrorPopUp from "../../../components/PopUp/error/errorPopUp";
import ConfPopUp from "../../../components/PopUp/confirmation/confPopUp";

const AddUser = () => {
  const api_url = import.meta.env.VITE_API_URL;
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [errorMessage, setErrorMesssage] = useState(" ");
  const [showError, setShowError] = useState(false);
  const { control, register, handleSubmit, setValue } = useForm();

  const handleErrorPopUpClose = () => {
    setShowError(false);
  };
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
      handleSubmit(addClass)();
      setSelectedOption(false);
    }
  }, [selectedOption]);

  const addClass = (data) => {
    console.log(data);
    axios
      .post(api_url + "Class.php", {
        request: "add_class",
        user_id: 41792238,
        name: data.catalog,
        title: data.title,
        credits: data.credits,
        fall: data.Fall ? "Yes" : "No",
        spring: data.Spring ? "Yes" : "No",
        winter: data.Winter ? "Yes" : "No",
        summer: data.Summer ? "Yes" : "No",
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
        console.log("no, here");
      });
  };

  return (
    <div className="class-form-container">
      <h1>Add Class</h1>
      <form onSubmit={handlePopUpOpen}>
        <div className="class-form-group">
          <label>Catalog Code:</label>
          <input type="text" {...register("catalog")} placeholder="EX: CS481" />
        </div>

        <div className="class-form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            {...register("title")}
            placeholder="EX Captstone Project"
          />
        </div>

        <div className="class-form-group">
          <label htmlFor="credits">Credits:</label>
          <input type="text" {...register("credits")} />
        </div>
        <div className="class-form-group">
          <label>Quarters Offered:</label>
          <div>
            <label>Fall</label>
            <Controller
              control={control}
              name="Fall"
              defaultValue={false}
              render={({ value: valueProp, onChange }) => {
                return (
                  <Switch
                    value={valueProp}
                    onChange={(event, val) => {
                      setValue("Fall", val);
                    }}
                  />
                );
              }}
            />
            <label>Winter</label>
            <Controller
              control={control}
              name="Winter"
              defaultValue={false}
              render={({ value: valueProp, onChange }) => {
                return (
                  <Switch
                    value={valueProp}
                    onChange={(event, val) => {
                      setValue("Winter", val);
                    }}
                  />
                );
              }}
            />
          </div>
          <div>
            <label>Spring</label>
            <Controller
              control={control}
              name="Spring"
              defaultValue={false}
              render={({ value: valueProp, onChange }) => {
                return (
                  <Switch
                    value={valueProp}
                    onChange={(event, val) => {
                      setValue("Spring", val);
                    }}
                  />
                );
              }}
            />
            <label>Summer</label>
            <Controller
              control={control}
              name="Summer"
              defaultValue={false}
              render={({ value: valueProp, onChange }) => {
                return (
                  <Switch
                    value={valueProp}
                    onChange={(event, val) => {
                      setValue("Summer", val);
                    }}
                  />
                );
              }}
            />
          </div>
        </div>

        <button className="btnAdd" type="submit">
          Add Class
        </button>
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

export default AddUser;
