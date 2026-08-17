import { useState, useEffect } from "react";
import axios from "axios";

export default function Payroll() {
  const [employee_name, setName] = useState("");
  const [emp_id, setEmpId] = useState("");
  const [basic, setBasic] = useState("");
  const [bonus, setBonus] = useState("");
  const [tax, setTax] = useState("");
  const [leaves, setLeaves] = useState("");
  const [month, setMonth] = useState("");

  const [payrolls, setPayrolls] = useState([]);
  const [net, setNet] = useState(0);

  // FETCH PAYROLL DATA
  const fetchPayroll = async () => {
    const res = await axios.get("http://127.0.0.1:5000/payroll");
    setPayrolls(res.data);
  };

  useEffect(() => {
    fetchPayroll();
  }, []);

  // LIVE SALARY CALCULATION
  useEffect(() => {
    const total =
      Number(basic) +
      Number(bonus) -
      Number(tax) -
      Number(leaves);

    setNet(total);
  }, [basic, bonus, tax, leaves]);

  // GENERATE PAYROLL
  const generatePayroll = async () => {
    await axios.post("http://127.0.0.1:5000/payroll", {
      employee_name,
      emp_id,
      basic,
      bonus,
      tax,
      leaves,
      month,
    });

    alert("Payroll Generated Successfully!");
    fetchPayroll();
  };

  // DOWNLOAD PAYSLIP PDF
  const downloadPayslip = (emp_id) => {
    window.open(
      `http://127.0.0.1:5000/payroll/payslip/${emp_id}`,
      "_blank"
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">
        Payroll System
      </h1>

      {/* FORM */}
      <div className="bg-white p-6 rounded-xl shadow grid grid-cols-2 gap-4">

        <input
          placeholder="Employee Name"
          className="border p-2"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Employee ID"
          className="border p-2"
          onChange={(e) => setEmpId(e.target.value)}
        />

        <input
          placeholder="Basic Salary"
          className="border p-2"
          onChange={(e) => setBasic(e.target.value)}
        />

        <input
          placeholder="Bonus"
          className="border p-2"
          onChange={(e) => setBonus(e.target.value)}
        />

        <input
          placeholder="Tax"
          className="border p-2"
          onChange={(e) => setTax(e.target.value)}
        />

        <input
          placeholder="Leaves Deduction"
          className="border p-2"
          onChange={(e) => setLeaves(e.target.value)}
        />

        <input
          placeholder="Month (Jan 2026)"
          className="border p-2"
          onChange={(e) => setMonth(e.target.value)}
        />

        {/* LIVE SALARY DISPLAY */}
        <div className="col-span-2 text-xl font-bold">
          Net Salary: ₹ {net}
        </div>

        <button
          onClick={generatePayroll}
          className="bg-blue-600 text-white p-2 rounded col-span-2"
        >
          Generate Payroll
        </button>
      </div>

      {/* TABLE */}
      <div className="mt-8 bg-white p-4 rounded-xl shadow">

        <h2 className="text-xl font-bold mb-4">
          Payroll History
        </h2>

        <table className="w-full border">

          <thead>
            <tr className="bg-gray-200">
              <th>Name</th>
              <th>ID</th>
              <th>Basic</th>
              <th>Bonus</th>
              <th>Tax</th>
              <th>Leaves</th>
              <th>Net Salary</th>
              <th>Month</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {payrolls.map((p) => (
              <tr key={p.id} className="text-center border-t">

                <td>{p.employee_name}</td>
                <td>{p.emp_id}</td>
                <td>{p.basic}</td>
                <td>{p.bonus}</td>
                <td>{p.tax}</td>
                <td>{p.leaves}</td>

                <td className="font-bold">
                  ₹ {p.net_salary}
                </td>

                <td>{p.month}</td>

                {/* PDF BUTTON */}
                <td>
                  <button
                    onClick={() => downloadPayslip(p.emp_id)}
                    className="bg-purple-600 text-white px-3 py-1 rounded"
                  >
                    PDF
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}