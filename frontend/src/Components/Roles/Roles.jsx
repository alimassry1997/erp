import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'





function Roles() {
  const [loading, setLoading] = useState(true);
  const [roleList, setRoleList] = useState([]);

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
            <button type='button'>Delete</button>
          </td>
          </tr>
      )
    });
  }

  return (
    <div>
      <h1>Roles Table</h1>
      <table>
        <thead>
          <th>Name</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {viewRole_table}
        </tbody>
      </table>
    </div>
  )
}

export default Roles
