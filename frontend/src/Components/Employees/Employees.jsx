import "./Employees.css";
import Spinner from "../Layout/Spinner";
import Employee from "./Employee";
import { AiOutlineTeam, AiOutlineSearch } from "react-icons/ai";
import { FaPlusSquare } from "react-icons/fa";
import { useState } from "react";


const Employees = ({
  employees,
  token,
  loadingEmployees,
  showEditEmployeePopup,
  showAddEmployeeFormPopup,
  showDeleteEmployeePopup,
}) => {
  const [searchTerm, setSearchTerm] = useState([]);
  document.title = "Employees Dashboard | ERP";
  if (loadingEmployees) {
    return <Spinner />;
  } else {
    return (
      <div className="dashboard employees-dashboard">
        <div className="header">
          <h2>
            <AiOutlineTeam />
            Employees Management
          </h2>
          <form className="search-bar">
                    <input type="search" name="search" pattern=".\S."
                           onChange={(e) => {
                               setSearchTerm((e.target.value))
                           }}
                           required/>
                    <button className="btn" type="submit">
                        <span>Search</span>
                    </button>
                </form>
          <button
            className="btn add-btn"
            onClick={() => showAddEmployeeFormPopup()}
          >
            <FaPlusSquare />
          </button>
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
            <tbody>
            {employees.filter((employee => {
                        if (searchTerm === "") {
                            return employee;
                        } else if (employee.first_name.includes(searchTerm)) {
                            return employee;
                        }
                    })).map((employee) => (
                <Employee
                  key={employee.id}
                  token={token}
                  image={employee.picture}
                  firstName={employee.first_name}
                  lastName={employee.last_name}
                  email={employee.email}
                  phoneNumber={employee.phone_number}
                  status={employee.status}
                  showEditEmployeePopup={showEditEmployeePopup}
                  showDeleteEmployeePopup={showDeleteEmployeePopup}
                  employee={employee}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

export default Employees;
