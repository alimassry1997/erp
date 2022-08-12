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
        <img src={Logo} alt="logo" />
      </div>
      <ul>
        <li>
          <RiAdminFill />
          <Link to={"/admins"}>Admins</Link>
        </li>
        <li>
          <TbReportSearch />
          <Link to={"/"}>Reports</Link>
        </li>
        <li>
          <AiOutlineProject />
          <Link to={"/projects"}>Projects</Link>
        </li>
        <li>
          <AiOutlineTeam />
          <Link to={"/teams"}>Teams</Link>
        </li>
        <li>
          <AiOutlineUser />
          <Link to={"/employees"}>Employees</Link>
        </li>
        <li>
          <FaUsersCog />
          <Link to={"/roles"}>Roles</Link>
        </li>
        <li>
          <GiSkills />
          <Link to={"/kpi"}>KPI</Link>
        </li>
        <li>
          <FiLogOut />
          <button>Logout</button>
        </li>
      </ul>
    </section>
  );
};

export default Sidebar;
