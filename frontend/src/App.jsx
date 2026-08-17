import {
BrowserRouter,
Routes,
Route
}
from "react-router-dom"

import Login from "./pages/Login"

import Dashboard from "./pages/Dashboard"
import Employees from "./pages/Employees"
import Attendance from "./pages/Attendance"
import Leave from "./pages/Leave"
import Payroll from "./pages/Payroll"
import Reports from "./pages/Reports"

import EmployeeDashboard from "./pages/EmployeeDashboard"

import ProtectedRoute from "./components/ProtectedRoute"


function App(){

return(

<BrowserRouter>

<Routes>


<Route
path="/"
element={<Login/>}
/>


<Route
path="/dashboard"
element={
<ProtectedRoute role="admin">
<Dashboard/>
</ProtectedRoute>
}
/>


<Route
path="/employees"
element={
<ProtectedRoute role="admin">
<Employees/>
</ProtectedRoute>
}
/>


<Route
path="/attendance"
element={
<ProtectedRoute role="admin">
<Attendance/>
</ProtectedRoute>
}
/>


<Route
path="/leave"
element={
<ProtectedRoute role="admin">
<Leave/>
</ProtectedRoute>
}
/>


<Route
path="/payroll"
element={
<ProtectedRoute role="admin">
<Payroll/>
</ProtectedRoute>
}
/>


<Route
path="/reports"
element={
<ProtectedRoute role="admin">
<Reports/>
</ProtectedRoute>
}
/>


<Route
path="/employee-dashboard"
element={
<ProtectedRoute role="employee">
<EmployeeDashboard/>
</ProtectedRoute>
}
/>


</Routes>

</BrowserRouter>

)

}

export default App