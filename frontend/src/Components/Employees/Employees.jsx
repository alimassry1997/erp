import "./Employees.css";
import { useEffect } from "react";
import Spinner from "../Layout/Spinner";
import { AiOutlineTeam } from "react-icons/ai";
import { FaPlusSquare } from "react-icons/fa";
import Employee from "./Employee";

const Employees = ({ fetchEmployees, employees, loadingEmployees }) => {
  useEffect(() => {
    fetchEmployees();
  }, []);
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
          <button className="btn add-btn">
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
              {employees.map((employee) => (
                <Employee
                  key={employee.id}
                  image={employee.picture}
                  firstName={employee.first_name}
                  lastName={employee.last_name}
                  email={employee.email}
                  phoneNumber={employee.phone_number}
                  status={employee.status}
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
