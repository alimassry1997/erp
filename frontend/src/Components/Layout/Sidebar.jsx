import React from "react";
import "./Sidebar.css";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <section className="side_bar">
        <div className="top">
          <div className="brand">
            <img src={Logo} alt="logo" />
            {/* <span>Company Logo</span> */}
          </div>
          <div className="links">
            <ul>
              <li>
                <i className="fa-brands fa-adn"></i>
                <Link to={"/Admins"}>
                  <span>Admins</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="links">
            <ul>
              <li>
                <i className="fa-solid fa-flag"></i>
                <Link to={"/"}>
                  <span>Reports</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="links">
            <ul>
              <li>
                <i className="fa-solid fa-list-check"></i>
                <Link to={"/Projects"}>
                  <span>Projects</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="links">
            <ul>
              <li>
                <i className="fa-solid fa-people-group"></i>
                <Link to={"/Teams"}>
                  <span>Teams</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="links">
            <ul>
              <li>
                <i className="fa-solid fa-user"></i>
                <Link to={"/Employees"}>
                  <span>Employees</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="links">
            <ul>
              <li>
                <i className="fa fa-tachometer" aria-hidden="true"></i>
                <Link to={"/roles"}>
                  <span>Roles</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="links">
            <ul>
              <li>
                <i className="fa fa-tachometer" aria-hidden="true"></i>
                <Link to={"/kpi"}>
                  <span>KPI</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="links">
            <ul>
              <li>
                <i className="fa-solid fa-right-from-bracket"></i>
                <a href="#">
                  <span>Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default Sidebar;
