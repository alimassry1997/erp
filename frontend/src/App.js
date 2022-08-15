import Admins from './Components/Admins/Admins';
import './App.css';
import Employees from './Components/Employees/Employees';
import {
  BrowserRouter as Router,
  Route,
  Routes,

} from "react-router-dom"
import EditEmployee from './Components/Employees/Edit-Employees/edit-employee';
import Sidebar from './Components/Layout/Sidebar';

function App() {
  return (
    <Router>
      <div className="App">
      </div>
      <Routes>
        {/* <Sidebar /> */}
        <Route exact path="/employees" element={<Employees />} />
        <Route exact path="/employees/edit-employee/:id" element={<EditEmployee />} />
        <Route exact path="/admins" element={<Admins />} />
      </Routes>
      </Router>
  );
}

export default App;
