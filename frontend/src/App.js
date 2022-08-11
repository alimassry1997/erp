import React from "react";
import "./App.css";
import Sidebar from "./Components/Layout/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admins from "./Components/Admins/Admins";
import Employees from "./Components/Employees/Employees";
import KPIRoles from "./Components/KPIRoles/KPIRoles";
import Reports from "./Components/Reports/Reports";
import Projects from "./Components/Projects/Projects";
import Teams from "./Components/Teams/Teams";
import Footer from "./Components/Layout/Footer";

function App() {
  return (
    <Router>
      <>
        <Sidebar />
        <Routes>
          <Route path="/admins" exact element={<Admins />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/kpiroles" element={<KPIRoles />} />
        </Routes>
        <Footer />
      </>
    </Router>
  );
}

export default App;
