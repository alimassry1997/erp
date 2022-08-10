import React from "react";
import "./App.css";
import Sidebar from "./Components/Layout/Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Admins from "./Components/Admins/Admins";
import Employees from "./Components/Employees/Employees";
import KPIRoles from "./Components/KPIRoles/KPIRoles";
import Reports from "./Components/Reports/Reports";
import Projects from "./Components/Projects/Projects";
import Teams from "./Components/Teams/Teams";

function App() {
  return (
    <>
      <Router>
        <Sidebar />
        <Switch>
          <Route path="/" exact component={Admins} />
          <Route path="/reports" component={Reports} />
          <Route path="/projects" component={Projects} />
          <Route path="/teams" component={Teams} />
          <Route path="/employees" component={Employees} />
          <Route path="/kpiroles" component={KPIRoles} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
