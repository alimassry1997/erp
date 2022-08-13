import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admins from "./Components/Admins/Admins";
import Employees from "./Components/Employees/Employees";
import Reports from "./Components/Reports/Reports";
import Projects from "./Components/Projects/Projects";
import Teams from "./Components/Teams/Teams";
import LoginPage from "./Components/Pages/LoginPage";
import DashboardLayout from "./Components/Layout/DashboardLayout";
import Roles from "./Components/Roles/Roles";
import KPI from "./Components/KPI/KPI";
import axios from "axios";
import SingleTeam from "./Components/Teams/SingleTeam";
import capitalizeFirstLetter from "./utils/capitalizeFirstLetter";

const App = () => {
  /**
   * Get the user state from local storage
   * @type {object}
   */
  const user = JSON.parse(localStorage.getItem("user"));

  /**
   * Auth State for Admin Credentials & Token
   */
  const [auth, setAuth] = useState(user ? user : null);

  /**
   * Teams States
   * Loading & Team
   */
  const [loadingTeams, setLoadingTeams] = useState(true);
  const [teams, setTeams] = useState([]);

  // Single Product State
  const [loadingTeam, setLoadingTeam] = useState(true);
  const [team, setTeam] = useState([]);

  /**
   * Get All teams with their corresponding employees
   * @returns {Promise<void>}
   */
  const fetchTeams = async () => {
    try {
      setLoadingTeams(true);
      const response = await axios.get(`/api/teams/`);
      const { data } = response;
      setTeams(data);
      setLoadingTeams(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  /**
   * Get a single Team by SLug
   * @param slug
   * @returns {Promise<void>}
   */
  const getTeam = async (slug) => {
    setLoadingTeam(true);
    try {
      const response = await axios.get(`/api/teams/${slug}`);
      const { data } = response;
      setTeam(data);
      document.title = `${capitalizeFirstLetter(
        data.team.name
      )} Team | ERP Teams`;
    } catch (error) {
      console.log(error.message);
    }
    setLoadingTeam(false);
  };

  return (
    <Router>
      <>
        <Routes>
          <Route
            path="/"
            element={<DashboardLayout auth={auth} setAuth={setAuth} />}
          >
            <Route index element={<Reports />} />
          </Route>
          <Route
            path="/admins"
            element={<DashboardLayout auth={auth} setAuth={setAuth} />}
          >
            <Route index element={<Admins />} />
          </Route>
          <Route
            path="/projects"
            element={<DashboardLayout auth={auth} setAuth={setAuth} />}
          >
            <Route index element={<Projects />} />
          </Route>
          <Route
            path="/teams"
            element={<DashboardLayout auth={auth} setAuth={setAuth} />}
          >
            <Route
              index
              element={
                <Teams
                  fetchTeams={fetchTeams}
                  teams={teams}
                  loadingTeams={loadingTeams}
                />
              }
            />
          </Route>
          <Route
            path="/teams/:slug/"
            element={<DashboardLayout auth={auth} setAuth={setAuth} />}
          >
            <Route
              index
              element={
                <SingleTeam
                  team={team}
                  loadingTeam={loadingTeam}
                  getTeam={getTeam}
                />
              }
            />
          </Route>
          <Route
            path="/employees"
            element={<DashboardLayout auth={auth} setAuth={setAuth} />}
          >
            <Route index element={<Employees />} />
          </Route>
          <Route
            path="/roles"
            element={<DashboardLayout auth={auth} setAuth={setAuth} />}
          >
            <Route index element={<Roles />} />
          </Route>
          <Route
            path="/kpi"
            element={<DashboardLayout auth={auth} setAuth={setAuth} />}
          >
            <Route index element={<KPI />} />
          </Route>
          <Route
            path="/login"
            element={<LoginPage auth={auth} setAuth={setAuth} />}
          />
        </Routes>
      </>
    </Router>
  );
};

export default App;
