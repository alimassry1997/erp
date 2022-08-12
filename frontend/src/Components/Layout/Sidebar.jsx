import React from "react";
import "./Sidebar.css";
import Logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <section className="side_bar">
      <div className="brand">
        <img src={Logo} alt="logo" />
      </div>
      <ul>
        <li>
          <i className="fa-brands fa-adn"></i>
          <Link to={"/admins"}>
            <span>Admins</span>
          </Link>
        </li>
        <li>
          <i className="fa-solid fa-flag"></i>
          <Link to={"/"}>
            <span>Reports</span>
          </Link>
        </li>
        <li>
          <i className="fa-solid fa-list-check"></i>
          <Link to={"/projects"}>
            <span>Projects</span>
          </Link>
        </li>
        <li>
          <i className="fa-solid fa-people-group"></i>
          <Link to={"/teams"}>
            <span>Teams</span>
          </Link>
        </li>
        <li>
          <i className="fa-solid fa-user"></i>
          <Link to={"/employees"}>
            <span>Employees</span>
          </Link>
        </li>
        <li>
          <i className="fa fa-tachometer" aria-hidden="true"></i>
          <Link to={"/roles"}>
            <span>Roles</span>
          </Link>
        </li>
        <li>
          <i className="fa fa-tachometer" aria-hidden="true"></i>
          <Link to={"/kpi"}>
            <span>KPI</span>
          </Link>
        </li>
        <li>
          <i className="fa-solid fa-right-from-bracket"></i>
          <a href="#">
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Sidebar;
