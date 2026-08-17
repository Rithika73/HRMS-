import { useEffect, useState } from "react";
import axios from "axios";

export default function Reports() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [payroll, setPayroll] = useState([]);

  // FETCH ALL DATA
  const fetchData = async () => {
    const emp = await axios.get("http://127.0.0.1:5000/employees");
    const att = await axios.get("http://127.0.0.1:5000/attendance");
    const lev = await axios.get("http://127.0.0.1:5000/leave");
    const pay = await axios.get("http://127.0.0.1:5000/payroll");

    setEmployees(emp.data);
    setAttendance(att.data);
    setLeaves(lev.data);
    setPayroll(pay.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // DOWNLOAD CSV FUNCTION
  const downloadCSV = (data, filename) => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      data.map((row) => Object.values(row).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">
        HRMS Reports Dashboard
      </h1>

      {/* REPORT CARDS */}
      <div className="grid grid-cols-2 gap-6">

        {/* EMPLOYEE REPORT */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-2">Employee Report</h2>
          <p>Total Employees: {employees.length}</p>

          <button
            onClick={() => downloadCSV(employees, "employees_report.csv")}
            className="bg-blue-600 text-white px-3 py-1 mt-3 rounded"
          >
            Download CSV
          </button>
        </div>

        {/* ATTENDANCE REPORT */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-2">Attendance Report</h2>
          <p>Total Records: {attendance.length}</p>

          <button
            onClick={() => downloadCSV(attendance, "attendance_report.csv")}
            className="bg-green-600 text-white px-3 py-1 mt-3 rounded"
          >
            Download CSV
          </button>
        </div>

        {/* LEAVE REPORT */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-2">Leave Report</h2>
          <p>Total Requests: {leaves.length}</p>

          <button
            onClick={() => downloadCSV(leaves, "leave_report.csv")}
            className="bg-yellow-600 text-white px-3 py-1 mt-3 rounded"
          >
            Download CSV
          </button>
        </div>

        {/* PAYROLL REPORT */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-2">Payroll Report</h2>
          <p>Total Records: {payroll.length}</p>

          <button
            onClick={() => downloadCSV(payroll, "payroll_report.csv")}
            className="bg-purple-600 text-white px-3 py-1 mt-3 rounded"
          >
            Download CSV
          </button>
        </div>

      </div>
    </div>
  );
}