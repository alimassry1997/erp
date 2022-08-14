import "./Employees.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const Employees = () => {
  const [loading, setLoading] = useState(true);
  const [employeeList, setEmployeeList] = useState([]);

  const getEmployees = () => {
    axios.get("http://localhost:8080/api/employees").then((response) => {
      if (response.status === 200) {
        setEmployeeList(response.data.employees);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    getEmployees();
  }, []);

 
  /* Image lal employee then fname then lname then email then phone then status with a button to 
  whether you want to activate or deactivate an employee and a manage finally containing edit icon 
  if we need to edit the record, when the whole record is clicked it opens a page containing whole information 
  about the employee 
  - filtering and search is a plus to the employees table
   */

  let emp_table = "";
  if (loading) {
    return (
      <tr>
        <td colSpan="6">
          <h2>Loading ...</h2>
        </td>
      </tr>
    );
  } else {
    emp_table = employeeList.map((item) => {
      return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.status === 1 ? "Inactive" : "Active"}</td>
            <td>{item.first_name}</td>
            <td>{item.last_name}</td>
            <td>{item.email}</td>
          <td>{item.phone_number}</td>
          <td><img src={`http://localhost:8080/${item.picture}`} alt="Image" width="50px" /></td>
            <td>
              <button type="button">View</button>
              <Link to={`edit-employee/${item.id}`}>
                {" "}
                <button type="button">Edit</button>{" "}
              </Link>
              <button type="button">Deactivate</button>
            </td>
          </tr>
      );
    });
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{emp_table}</tbody>
      </table>
      <Link to="/add-employee">Add</Link>
    </div>
  );
};

export default Employees;
