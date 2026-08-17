import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {

const navigate = useNavigate();

  return (
    <div className="dashboard">

      {/* HEADER */}
      <div className="dashboard-header">
        <div>
          <h1>Human Resource Management System</h1>
          <p>Admin Panel</p>
        </div>
      </div>

      {/* QUICK STATS CARDS */}
      <div className="card-container">

        <div
        className="card blue"
        onClick={()=>navigate("/employees")}
        >
          <h3>Employees</h3>
          <h2>120</h2>
        </div>

        <div
        className="card green"
        onClick={()=>navigate("/attendance")}
        >
          <h3>Attendance</h3>
          <h2>92%</h2>
        </div>

        <div
        className="card orange"
        onClick={()=>navigate("/leave")}
        >
          <h3>Leaves</h3>
          <h2>8 Pending</h2>
        </div>

        <div
        className="card purple"
        onClick={()=>navigate("/payroll")}
        >
          <h3>Payroll</h3>
          <h2>₹3,50,000</h2>
        </div>

      </div>

      {/* MENU SECTION */}
      <div className="menu-box">

        <h3>Quick Navigation</h3>

        <div className="menu-grid">

          <div
          className="menu-item"
          onClick={()=>navigate("/dashboard")}
          >
          Dashboard
          </div>

          <div
          className="menu-item"
          onClick={()=>navigate("/employees")}
          >
          Employees
          </div>

          <div
          className="menu-item"
          onClick={()=>navigate("/attendance")}
          >
          Attendance
          </div>

          <div
          className="menu-item"
          onClick={()=>navigate("/leave")}
          >
          Leaves
          </div>

          <div
          className="menu-item"
          onClick={()=>navigate("/payroll")}
          >
          Payroll
          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;