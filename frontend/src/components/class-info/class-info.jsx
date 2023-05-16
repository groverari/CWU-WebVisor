import React, { useEffect, useState } from "react";
import "./class-info.styles.scss";
import { useForm, Controller } from "react-hook-form";
import Switch from "@mui/material/Switch";
import axios from "axios";
import ConfPopUp from "../PopUp/confirmation/confPopUp";

function ClassInfo(props) {
  const { control, register, handleSubmit, setValue } = useForm();
  const api_url = import.meta.env.VITE_API_URL;
  const onUpdate = (data) => {
    console.log(data);
    axios
      .post(api_url + "class.php", {
        request: "update_class",
        user_id: 41792238,

        name: data.name,
        title: data.title,
        credits: data.cwu_id,

        fall: data.fall ? "Yes" : "No",
        winter: data.winter ? "Yes" : "No",
        spring: data.spring ? "Yes" : "No",
        summer: data.summer ? "Yes" : "No",
        active: "Yes",
        non: data.non,
      })
      .then((res) => {
        console.log(res.data);
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const [class, setClass] = useState(props)

  const [fname, setFname] = useState("");

  const { id, name, title, fall, winter, spring, summer } = props.class;

  if (fname != name) {
    setFname(name);
  }

  const [fal, setfal] = useState(() => {
    return fall == "Yes";
  });
  const [wint, setwint] = useState(() => {
    return winter == "Yes";
  });
  const [spri, setspri] = useState(() => {
    return fall == "Yes";
  });
  const [sum, setsum] = useState(() => {
    return fall == "Yes";
  });

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
    <div>
      <form onSubmit={handlePopUpOpen}>
        <div className="form-group">
          <label>Catalog</label>
          <input
            type="text"
            {...register("name")}
            defaluValue={props.class.name}
          />
        </div>

        <div className="form-group">
          <label>Course Name</label>
          <input
            type="text"
            {...register("title")}
            defaluValue={props.class.title}
          />
        </div>
        <div className="form-group">
          <label>Credits</label>
          <input
            type="text"
            {...register("credits")}
            defaluValue={props.class.credits}
          />
        </div>

        <div className="form-group">
          <label>Fall</label>
          <Controller
            control={control}
            name="fall"
            defaultValue={post}
            render={({ value: valueProp, onChange }) => {
              return (
                <Switch
                  value={valueProp}
                  onChange={(event, val) => {
                    setValue("fall", val);
                  }}
                  defaultChecked={post}
                />
              );
            }}
          />
        </div>

        <div className="form-group">
          <label>Winter</label>
          <Controller
            control={control}
            name="winter"
            defaultValue={post}
            render={({ value: valueProp, onChange }) => {
              return (
                <Switch
                  value={valueProp}
                  onChange={(event, val) => {
                    setValue("winter", val);
                  }}
                  defaultChecked={post}
                />
              );
            }}
          />
        </div>
        <div className="form-group">
          <label>Spring</label>
          <Controller
            control={control}
            name="spring"
            defaultValue={post}
            render={({ value: valueProp, onChange }) => {
              return (
                <Switch
                  value={valueProp}
                  onChange={(event, val) => {
                    setValue("spring", val);
                  }}
                  defaultChecked={post}
                />
              );
            }}
          />
        </div>
        <div className="form-group">
          <label>Summer</label>
          <Controller
            control={control}
            name="summer"
            defaultValue={post}
            render={({ value: valueProp, onChange }) => {
              return (
                <Switch
                  value={valueProp}
                  onChange={(event, val) => {
                    setValue("summer", val);
                  }}
                  defaultChecked={post}
                />
              );
            }}
          />

          <br />
        </div>
        <input type="submit" value="Update" />
      </form>
      {}
      {showPopup && (
        <ConfPopUp
          action="update"
          onClose={handlePopUpClose}
          onButtonClick={handlePopUpButtonClick}
        />
      )}
    </div>
  );
}
export default ClassInfo;
