import "./App.css";
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
import EditEmployee from './Components/Employees/Edit-Employees/edit-employee';
import AddEmployee from './Components/Employees/Add-Employees/add-employee';

const App = () => {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Reports />} />
          </Route>
          <Route path="/admins" element={<DashboardLayout />}>
            <Route index element={<Admins />} />
          </Route>
          <Route path="/projects" element={<DashboardLayout />}>
            <Route index element={<Projects />} />
          </Route>
          <Route path="/teams" element={<DashboardLayout />}>
            <Route index element={<Teams />} />
          </Route>
          <Route path="/employees" element={<DashboardLayout />}>
            <Route index element={<Employees />} />
          </Route>
          <Route path="/roles" element={<DashboardLayout />}>
            <Route index element={<Roles />} />
          </Route>
          <Route path="/kpi" element={<DashboardLayout />}>
            <Route index element={<KPI />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </>
    </Router>
  );
};

export default App;
