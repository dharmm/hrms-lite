import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import EmployeeList from "./EmployeeList";
import EmployeeForm from "./EmployeeForm";
import Home from "./Home";
import "./App.css";

  
function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <div className="header">
          <h2>HRMS Lite</h2>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/employeeslist">Employees</Link>
            <Link to="/employeesform">Add Employee</Link>
          </nav>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employeeslist" element={<EmployeeList />} />
          <Route path="/employeesform" element={<EmployeeForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
