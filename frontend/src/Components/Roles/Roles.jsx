import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import swal from 'sweetalert';
import { FaPlusSquare } from "react-icons/fa";
import RPopup from './Add-Roles/add-rPopup';
import AddRoles from './Add-Roles/add-roles';


function Roles() {
  const [loading, setLoading] = useState(true);
  const [roleList, setRoleList] = useState([]);
  const [openRPopup, setROpenPopup] = useState(false);


  const deleteRole = (e, id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting";

    axios.delete(`http://localhost:8080/api/delete-role/${id}`).then(res => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "Success");
        thisClicked.closest("tr").remove();
      } else if (res.data.status === 404) {
        thisClicked.innerText = "Delete";
      }
    })

  }

  useEffect(() => {
    axios.get('http://localhost:8080/api/roles').then(res => {
      if (res.status === 200) {
       setRoleList(res.data.role) 
      } setLoading(false);
    })
  }, []);

  let viewRole_table = "";
  if (loading) {
    return <h1>Loading ... </h1>
  } else {
    viewRole_table = roleList.map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.rname}</td>
          <td>
            <button>Edit</button>
            <button type='button' onClick={(e)=> deleteRole(e, item.id)}>Delete</button>
          </td>
          </tr>
      )
    });
  }

  return (
    <div>
      <h1>Roles Table</h1>
      <button onClick={()=>{setROpenPopup(true)}}> <FaPlusSquare /></button>
      <table>
        <thead>
          <th>Name</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {viewRole_table}
        </tbody>
      </table>
      <RPopup
      openRPopup={openRPopup}
      setROpenPopup={setROpenPopup}>
         <AddRoles />
      </RPopup>
    </div>
  )
}

export default Roles
