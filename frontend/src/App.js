import Admins from './Components/Admins/Admins';
import './App.css';
import Employees from './Components/Employees/Employees';
import AddEmployee from './Components/Employees/Add-Employees/add-employee';
import {
  BrowserRouter as Router,
  Route,
  Routes,

} from "react-router-dom"
import EditEmployee from './Components/Employees/Edit-Employees/edit-employee';

function App() {
  return (
    <Router>
      <div className="App">
      </div>
        <Routes>
        <Route exact path="/employees" element={<Employees />} />
        <Route exact path="/add-employee" element={<AddEmployee />} />
        <Route exact path="/employees/edit-employee/:id" element={<EditEmployee />} />
        <Route exact path="/admins" element={<Admins />} />
      </Routes>
      </Router>
  );
}

export default App;
