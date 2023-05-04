import React, { useState } from "react";
import "./student-add.scss";

const AddStudent = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    cwuId: "",
    email: "",
  });
  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Add Student</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          CWU ID:
          <input
            type="text"
            name="cwuId"
            pattern="[0-9]{8}"
            title="Please enter an 8-digit number."
            required
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          @cwu.edu
        </label>
        <br />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};
export default AddStudent;
