import Admins from './Components/Admins/Admins';
import './App.css';
import Employees from './Components/Employees/Employees';
import AddEmployee from './Components/Add-Employees/add-employee';
import {
  BrowserRouter as Router,
  Route,
  Routes,

} from "react-router-dom"

function App() {
  return (
    <Router>
      <div className="App">
      </div>
        <Routes>
      
        <Route exact path="/employees" element={<Employees />} />
        <Route exact path="/add-employee" element={<AddEmployee />} />
      </Routes>
      </Router>
  );
}

export default App;
