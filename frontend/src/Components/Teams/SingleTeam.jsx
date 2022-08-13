import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Spinner from "../Layout/Spinner";
import "./SingleTeam.css";
import "./SingleTeamEmployees.css";
import { HiUserGroup } from "react-icons/hi";
import { AiOutlineTeam } from "react-icons/ai";
import { FaPlusSquare } from "react-icons/fa";
import SingleTeamEmployees from "./SingleTeamEmployees";

const SingleTeam = ({ team, loadingTeam, getTeam }) => {
  const { slug } = useParams();

  useEffect(() => {
    getTeam(slug);
  }, [slug]);

  if (loadingTeam) {
    return <Spinner />;
  } else {
    const { name, users: employees } = team;
    console.log(employees);
    return (
      <div className="single-team-container">
        <header>
          <h2>{name} Team</h2>
          <div>
            <HiUserGroup />
            Team Size: {employees.length}
          </div>
        </header>
        <h3>Employees Assigned</h3>
        <div className="dashboard team-employees-dashboard">
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
            <table className="table table-team-employees">
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
                  <SingleTeamEmployees
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
      </div>
    );
  }
};

export default SingleTeam;
