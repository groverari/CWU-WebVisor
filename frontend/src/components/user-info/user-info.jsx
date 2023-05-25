import React, { useEffect, useState } from "react";
import "./user-info.styles.scss";
import { useForm, Controller } from "react-hook-form";
import Switch from "@mui/material/Switch";
import axios from "axios";
import ConfPopUp from "../PopUp/confirmation/confPopUp";

function UserInfo({ selUser }) {
  const { control, register, handleSubmit, setValue } = useForm();
  const api_url = import.meta.env.VITE_API_URL;

  const onUpdate = () => {
    console.log(selUser);
    //console.log(data.)
    axios
      .post(api_url + "user.php", {
        request: "update_user_simple",
        user_id: selUser.id,
        login: selUser.login,
        password: selUser.password,
        superuser: selUser.superuser ? "Yes" : "No",
      })
      .then((res) => {
        console.log(res.data);
        //window.location.reload(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const [class, setClass] = useState(props)

  const {login, password, superuser} = selUser;

  const isSuperUser = superuser == "Yes";

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
    <div className="class-info-container">
      <div className="class-info">
        <form onSubmit={handlePopUpOpen}>
          <div className="form-group">
            <label>user name</label>
            <input type="text" {...register("login")} defaultValue={login} />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="text" {...register("password")} defaultValue={password} />
          </div>

          <div superuser="form-group">
            <label>Super User</label>
            <Controller
              control={control}
              name="superuser"
              defaultValue={isSuperUser}
              render={({ value: valueProp, onChange }) => {
                return (
                  <Switch
                    value={valueProp}
                    onChange={(event, val) => {
                      setValue("superuser", val);
                    }}
                    defaultChecked={isSuperUser}
                  />
                );
              }}
            />
          </div>
            <br />
          <input className=" class-btn_update" type="submit" value="Update" />
        </form>
        {showPopup && (
          <ConfPopUp
            action="update"
            onClose={handlePopUpClose}
            onButtonClick={handlePopUpButtonClick}
          />
        )}
      </div>
    </div>
  );
}
export default UserInfo;
