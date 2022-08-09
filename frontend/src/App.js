import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Components/Pages/LoginPage";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
