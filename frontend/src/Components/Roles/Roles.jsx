import axios from "axios";
import React from "react";
import { useState } from "react";
import swal from "sweetalert";
import "./Roles.css";

const Roles = () => {

  const [roleInp, setRoleInp] = useState({
    rname:"",
  });

  const handleRInput = (e) => {
    e.persist();
    setRoleInp({ ...roleInp, [e.target.name]: e.target.value })
  }


  const saveRole = (e) => {
    e.preventDefault();

    const data = {
      rname: roleInp.rname,
    }
 
    axios.post('http://localhost:8080/api/add-role', data).then(res => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        console.log("Role is Created");
        setRoleInp({
          rname:"",
        })
      } else {
        
      }
    })

  }


  return <div>
    <h1>Add Role</h1> 
    <form onSubmit={saveRole}>
      <label>Role Name</label>
      <input type="text" name="rname" onChange={handleRInput} value={roleInp.rname}  placeholder="Role Name">
      </input>
      <button type="submit">Create the role</button>
    </form>
  </div>;
};

export default Roles;

