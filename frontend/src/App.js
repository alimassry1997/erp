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
   * Team States
   * Loading & Team
   */
  const [loadingTeam, setLoadingTeam] = useState(true);
  const [teams, setTeams] = useState([]);

  /**
   * Get All teams with their corresponding employees
   * @returns {Promise<void>}
   */
  const fetchTeams = async () => {
    try {
      setLoadingTeam(true);
      const response = await axios.get(`/api/teams/`);
      const { data } = response;
      setTeams(data);
      setLoadingTeam(false);
    } catch (error) {
      console.log(error.message);
    }
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
                  loadingTeam={loadingTeam}
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
