import React, { useEffect, useState } from "react";
import "./student-info.styles.scss";
import { useForm, Controller } from "react-hook-form";
import Switch from "@mui/material/Switch";
import axios from "axios";
import ConfPopUp from "../PopUp/confirmation/confPopUp";
import GenericPopUp from "../PopUp/generic/generic-popup";
import Confirmation from "../PopUp/conf/confirmation";

import LoadingScreen from "../PopUp/LoadingScreen/loading";

function StudentInfo(props) {
  // Destructuring properties from props
  const { control, register, handleSubmit, setValue } = useForm();
  const [isLoading, setLoading] = useState(false);
  const api_url = import.meta.env.VITE_API_URL;
  const onUpdate = (data) => {
    setLoading(true);
    console.log(data);
    axios
      .post(api_url + "student.php", {
        request: "update_student",
        user_id: 41792238,
        id: id,
        first: data.first,
        last: data.last,
        cwu_id: data.cwu_id,
        email: data.email,
        phone: data.phone,
        address: data.address,
        postbac: data.postbac ? "Yes" : "No",
        withdrawing: data.withdrawing ? "Yes" : "No",
        veterans: data.veterans ? "Yes" : "No",
        active: "Yes",
        non: data.non,
      })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage("");
      });
  };
  const { programs, advisors } = props;

  // State variables
  const [student, setStudent] = useState(props);
  const [fname, setFname] = useState("");

  const {
    id,
    first,
    last,
    email,
    cwu_id,
    phone,
    address,
    postbaccalaureate,
    veterans_benefits,
    withdrawing,
    non_stem_majors,
  } = props.student;

  // Check if the first name has changed
  if (fname != first) {
    setFname(first);
  }
  // State variables for switches
  const [post, setPost] = useState(() => {
    return postbaccalaureate == "Yes";
  });
  const [withdraw, setWithdraw] = useState(() => {
    return withdrawing == "Yes";
  });
  const vet = veterans_benefits == "Yes";

  const test = (data) => {};
  // State variables for pop-ups
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [conf, setConf] = useState(false);
  const [formData, setFormData] = useState([]);
  const handleSuccess = () => {
    setSuccess(false);
  };
  const successOpen = () => {
    setSuccess(true);
  };
  const errorClose = () => {
    setError(false);
  };
  const errorOpen = () => {
    setError(true);
  };
  const confClose = () => {
    setConf(false);
  };
  const confYes = () => {
    setConf(false);
    onUpdate(formData);
  };

  const formSubmit = (data) => {
    setConf(true);
    setFormData(data);
  };

  return (
    <div className="info-wrapper">
      <form className="student-info-form" onSubmit={handleSubmit(formSubmit)}>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            {...register("first")}
            defaultValue={props.student.first}
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input type="text" {...register("last")} defaultValue={last} />
        </div>
        <div className="form-group">
          <label>CWU ID</label>
          <input
            {...register("cwu_id")}
            pattern="[0-9]{8}"
            type="text"
            defaultValue={cwu_id}
          />
        </div>
        <div className="form-group">
          <label>CWU Email</label>
          <input type="text" {...register("email")} defaultValue={email} />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input type="text" {...register("address")} defaultValue={address} />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input type="text" {...register("phone")} defaultValue={phone} />
        </div>
        <div className="form-group">
          <label>Non-Stem</label>
          <input
            type="text"
            {...register("non")}
            defaultValue={non_stem_majors}
          />
        </div>
        <div className="form-group">
          <label>Postbaccalaurate</label>
          <Controller
            control={control}
            name="postbac"
            defaultValue={post}
            render={({ value: valueProp, onChange }) => {
              return (
                <Switch
                  value={valueProp}
                  onChange={(event, val) => {
                    setValue("postbac", val);
                  }}
                  defaultChecked={post}
                />
              );
            }}
          />
        </div>
        <div className="form-group">
          <label>Withdrawing</label>
          <Controller
            control={control}
            name="withdrawing"
            defaultValue={withdraw}
            render={({ value: valueProp, onChange }) => {
              return (
                <Switch
                  defaultChecked={withdraw}
                  value={valueProp}
                  onChange={(event, val) => {
                    setValue("withdrawing", val);
                  }}
                />
              );
            }}
          />
        </div>
        <div className="form-group">
          <label>Veteran</label>
          <Controller
            control={control}
            name="veterans"
            defaultValue={vet}
            render={({ value: valueProp, onChange }) => {
              return (
                <Switch
                  value={valueProp}
                  onChange={(event, val) => {
                    setValue("veterans", val);
                  }}
                  defaultChecked={vet}
                />
              );
            }}
          />
          <br />
        </div>
        <div className="submit-btn-wrapper">
          <input
            type="submit"
            value="Update"
            className="student-info-update-btn"
          />
        </div>
      </form>
      <h3>Program Info</h3>
      <div className="program-info-wrapper">
        <div className="student-programs pro-info">
          <h4 className="program-label">Assigned Student Programs: </h4>
          {programs.map((row) => (
            <div className="program-row" key={row[0]}>
              <p>{row}</p>
            </div>
          ))}
          <button className="program-btn">Change Programs</button>
        </div>
        <div className="student-advisors pro-info">
          <h4 className="program-label">Advisors for Student: </h4>
          {advisors.map((row) => (
            <div className="advisor-row " key={row[0]}>
              <p>{row}</p>
            </div>
          ))}
          <button className="program-btn">Unassign Student from Me</button>
        </div>
      </div>
      <GenericPopUp
        onClose={handleSuccess}
        message="Successfully added a student"
        title="Success!"
        open={success}
      />
      <GenericPopUp
        onClose={errorClose}
        message={errorMessage}
        title="Error"
        open={error}
      />
      <Confirmation
        onClose={confClose}
        open={conf}
        yesClick={confYes}
        message="Are you sure you would like to update this student? "
        button_text="Update Student"
      />
      <LoadingScreen open={isLoading} />
    </div>
  );
}

export default StudentInfo;
