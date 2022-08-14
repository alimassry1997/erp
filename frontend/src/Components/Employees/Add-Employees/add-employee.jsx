import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import swal from "sweetalert";
import { useEffect } from "react";

const AddEmployee = () => {
  const [empInput, setEmpInput] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    system_role_id: "",
  });

  const [pic, setPic] = useState([]);

  const handleInput = (e) => {
    e.persist();
    setEmpInput({ ...empInput, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setPic({ image: e.target.files[0] });
  };

  const saveEmployee = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", pic.image);
    formData.append("first_name", empInput.first_name);
    formData.append("last_name", empInput.last_name);
    formData.append("email", empInput.email);
    formData.append("phone_number", empInput.phone_number);
    formData.append("system_role_id", empInput.system_role_id);

    axios
      .post("http://localhost:8080/api/add-employee", formData)
      .then((res) => {
        if (res.data.status === 200) {
          swal("Success", res.data.message, "success");
          setEmpInput({
            ...empInput,
            first_name: "",
            last_name: "",
            email: "",
            phone_number: "",
            system_role_id: "",
          });
        } else if (res.data.status === 422) {
          console.log("All fields are mandatory");
        }
      });
  };
  return (
    <div>
      <Link to="/employees">Back</Link>
      <form onSubmit={saveEmployee} encType="multipart/form-data">
        <label>First Name </label>
        <input
          type="text"
          name="first_name"
          onChange={handleInput}
          value={empInput.first_name}
          placeholder="Type your first name"
        ></input>
        <br />
        <label>Last Name </label>
        <input
          type="text"
          name="last_name"
          onChange={handleInput}
          value={empInput.last_name}
          placeholder="Type your Last name"
        ></input>
        <br />
        <label>Email Address </label>
        <input
          type="email"
          name="email"
          onChange={handleInput}
          value={empInput.email}
          placeholder="Type your email"
        ></input>
        <br />
        <label>Phone Number </label>
        <input
          type="text"
          name="phone_number"
          onChange={handleInput}
          value={empInput.phone_number}
          placeholder="Type your Phone Number"
        ></input>
        <br />
        <label>System Role </label>
        <input
          type="number"
          name="system_role_id"
          onChange={handleInput}
          value={empInput.system_role_id}
          placeholder="Type your Role"
        ></input>
        <br />
        <label>Upload your Image </label>
        <input
          type="file"
          name="picture"
          onChange={handleImage}
          placeholder="Upload your Image"
        ></input>
        <br />
        <button type="submit">Save Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
