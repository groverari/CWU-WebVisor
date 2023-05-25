import React from "react";
import "./user-search.styles.scss";
import SearchBox from "../../../components/search-box/search-box";
import { useState, useEffect } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import Switch from "@mui/material/Switch";
import ConfPopUp from "../../../components/PopUp/confirmation/confPopUp";
import UserInfo from "../../../components/user-info/user-info";

const SearchUser = () => {
  const { control, register, handleSubmit, setValue } = useForm();
  const [users, setUsers] = useState([]);
  const [searchUsers, setSearchUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [isInfo, setInfo] = useState(false);
  const [showPopup, setShowPopop] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handlePopUpOpen = () => {
    event.preventDefault();
    setShowPopup(true);
  };

  const handlePopUpClose = () => {
    setShowPopup(false);
  };

  const buttonHandler = () => {
    setInfo(true);
  };

  const handlePopUpButtonClick = (buttonValue) => {
    setSelectedOption(buttonValue);
  };
  useEffect(() => {
    if (selectedOption) {
      deactivator();
    }
  }, [selectedOption]);

  let api_url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .post(api_url + "user.php", { request: "read" })
      .then((res) => {
        setUsers(res.data);
        //setSearchClasses(res.data) ------>set searchClasses to all classes initially
      });
  }, []);
  //if the class arrya is set----an array fo the select statement
  useEffect(() => {
    if (users) {
      const temp = users.map((use) => ({
        label: use.name,
        value: users.indexOf(use),
      }));
      setSearchUsers(temp);
    }
  }, [users]);

  //If the search student array is set then this will sort it in aplhabetical order
  if (searchUsers) {
    searchUsers.sort(function (a, b) {
      return a.label.localeCompare(b.label);
    });
  }

  //sets the selected class

  const selectHandler = ({ value }) => {
    let id = parseInt(value);
    setSelectedUser(users[id]);
    console.log(selectedUser);
    setInfo(false);
  };

  return (
    <div className="class-search-container">
      <h1 className="class-title">Class Search</h1>
      <div className="search-container">
        <SearchBox
          list={searchUsers}
          placeholder="Search for a user"
          value="Search"
          onChange={selectHandler}
          className="search-box" //
        />
        <button className="overviw-btn" onClick={buttonHandler}>
          Search
        </button>
      </div>

      {selectedUser != 0 && isInfo && <UserInfo selUser={selectedUser} />}
    </div>
  );
};

export default SearchUser;


