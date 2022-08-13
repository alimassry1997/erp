import React from "react";
import "./Sidebar.css";
import Logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { RiAdminFill } from "react-icons/ri";
import { TbReportSearch } from "react-icons/tb";
import { AiOutlineProject, AiOutlineTeam, AiOutlineUser } from "react-icons/ai";
import { FaUsersCog } from "react-icons/fa";
import { GiSkills } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";

const Sidebar = () => {
  return (
    <section className="sidebar">
      <div className="brand">
        <Link to={"/"}>
          <img src={Logo} alt="logo" />
        </Link>
      </div>
      <ul>
        <li>
          <Link to={"/admins"}>
            <RiAdminFill /> Admins
          </Link>
        </li>
        <li>
          <Link to={"/"}>
            <TbReportSearch /> Reports
          </Link>
        </li>
        <li>
          <Link to={"/projects"}>
            <AiOutlineProject /> Projects
          </Link>
        </li>
        <li>
          <Link to={"/teams"}>
            <AiOutlineTeam /> Teams
          </Link>
        </li>
        <li>
          <Link to={"/employees"}>
            <AiOutlineUser /> Employees
          </Link>
        </li>
        <li>
          <Link to={"/roles"}>
            <FaUsersCog /> Roles
          </Link>
        </li>
        <li>
          <Link to={"/kpi"}>
            <GiSkills /> KPI
          </Link>
        </li>
        <li>
          <button>
            <FiLogOut /> Logout
          </button>
        </li>
      </ul>
    </section>
  );
};

export default Sidebar;
