import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function EmployeeForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await API.post("/employees/", formData);

      setSuccess("Employee created successfully");

      // reset form
      setFormData({
        employee_id: "",
        full_name: "",
        email: "",
        department: "",
      });

      setTimeout(() => {
        navigate("/employeeslist");
      }, 1000);

    } catch (err) {
      console.error("Backend error:", err.response?.data);

      const backendError = err.response?.data;

      if (backendError) {
        const msg = Object.values(backendError).flat().join(" ");
        setError(msg);
      } else {
        setError("Failed to create employee");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3>Add Employee</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            name="employee_id"
            placeholder="Employee ID"
            value={formData.employee_id}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? "Saving..." : "Create Employee"}
        </button>
      </form>
    </div>
  );
}

export default EmployeeForm;
