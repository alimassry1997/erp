import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import Spinner from "../Layout/Spinner";
import "./SingleTeam.css";
import "./SingleTeamEmployees.css";
import { HiUserGroup } from "react-icons/hi";
import { AiOutlineProject, AiOutlineTeam, AiOutlineUser } from "react-icons/ai";
import { FaEdit, FaPlusSquare, FaTrashAlt } from "react-icons/fa";
import SingleTeamEmployees from "./SingleTeamEmployees";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const SingleTeam = ({
  team,
  loadingTeam,
  getTeam,
  showDeleteTeamPopup,
  showEditTeamPopup,
}) => {
  const { slug } = useParams();

  useEffect(() => {
    getTeam(slug);
  }, [slug]);

  if (loadingTeam) {
    return <Spinner />;
  } else {
    const { name, users: employees } = team;
    const size = employees.length;
    return (
      <div className="single-team-container">
        <header>
          <div className="description">
            <h2>{name} Team</h2>
            <div>
              <HiUserGroup />
              Team Size: {employees.length}
            </div>
          </div>
          <div className="single-team-manage">
            <button
              className="btn edit-btn"
              onClick={() => showEditTeamPopup({ name, size, slug })}
            >
              <FaEdit />
            </button>
            <button
              disabled={size > 0}
              className={`btn ${size > 0 ? "disabled-btn" : "delete-btn"}`}
              onClick={() => showDeleteTeamPopup({ name, slug })}
            >
              <FaTrashAlt />
            </button>
          </div>
        </header>
        <Tabs>
          <TabList>
            <Tab>
              <AiOutlineProject /> Projects
            </Tab>
            <Tab>
              <AiOutlineUser /> Team Members
            </Tab>
          </TabList>
          <TabPanel>
            <div className="dashboard team-employees-dashboard">
              <h2>Projects Here</h2>
            </div>
          </TabPanel>
          <TabPanel>
            {size > 0 ? (
              <div className="dashboard team-employees-dashboard">
                <div className="header">
                  <h2>
                    <AiOutlineTeam />
                    Employees Assigned
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
            ) : (
              <div className="dashboard team-employees-dashboard">
                No Employees Assigned
              </div>
            )}
          </TabPanel>
        </Tabs>
      </div>
    );
  }
};

export default SingleTeam;
