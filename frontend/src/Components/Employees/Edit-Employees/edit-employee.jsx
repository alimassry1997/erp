import React from "react";
import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const EditEmployee = (props) => {

    const [empInput, setEmp] = useState([]);


  useEffect(() => {
  });

    const handleInput = (e) => {
        e.persist();
        setEmp([...empInput, [e.target.name]= e.target.value]);
    }

  return (
    <div>
      <form>
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
        {/* <label>Upload your Image </label>
                    <input type="file" name="picture" placeholder='Upload your Image'></input><br/> */}
        <button>Update the Employee</button>
      </form>
    </div>
  );
};

export default EditEmployee;
