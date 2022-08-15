import "./Employees.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { AiOutlineTeam } from "react-icons/ai";
import { FaPlusSquare } from "react-icons/fa";
import Popup from "./Add-Employees/add-Popup";
import AddEmployee from "./Add-Employees/add-employee";
import PopUp from "./Edit-Employees/edit-Popup";
import EditEmployee from "./Edit-Employees/edit-employee";



const Employees = () => {
  const [loading, setLoading] = useState(true);
  const [employeeList, setEmployeeList] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [eopenPopup, esetOpenPopup] = useState(false);

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
        <tr key={item.email}>
          <td><img src={`http://localhost:8080/${item.picture}`} alt="Image" width="50px" /></td>
          <td>{item.first_name}</td>
          <td>{item.last_name}</td>
          <td>{item.email}</td>
          <td>{item.phone_number}</td>
            <td>{item.status === 1 ? "🟢" : "🔴"}</td>
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
    <div className="dashboard employees-dashboard">
        <div className="header">
          <h2>
            <AiOutlineTeam />
            Employees Management
        </h2>
        {/* <Link to="/add-employee"> */}
        <button className="btn add-btn"
        onClick={()=> setOpenPopup(true)}>
            <FaPlusSquare />
          </button>
          {/* </Link> */}
        </div>
        <div className="table-responsive">
          <table className="table table-employees">
            <thead>
              <tr>
                <th>Image</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Status</th>
                <th>Manage</th>
              </tr>
            </thead>
            <tbody>{emp_table}</tbody>
          </table>
      </div>
      <Popup
        openPopup={openPopup}
      setOpenPopup={setOpenPopup}>
        <AddEmployee />
      </Popup>


      {/* <PopUp
      eopenPopup={eopenPopup}
      esetOpenPopup={esetOpenPopup}>
      <EditEmployee />
      </PopUp> */}
      </div>
  );
};

export default Employees;

