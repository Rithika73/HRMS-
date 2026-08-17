import { useEffect, useState } from "react"

import { getProfile } from "../services/userAPI"
import { getMyAttendance } from "../services/employeePortalAPI"
import { getMyLeave } from "../services/leavePortalAPI"

function EmployeeDashboard(){

const user =
JSON.parse(
localStorage.getItem("user")
)

const [profile,setProfile]=useState({})
const [attendance,setAttendance]=useState([])
const [leave,setLeave]=useState([])

const [leaveForm,setLeaveForm]=useState({

employee_name:user?.name || "",

leave_type:"",

from_date:"",

to_date:"",

reason:""

})

useEffect(()=>{

if(user){

load()

}

},[])



const load=async()=>{

try{

const profileRes=
await getProfile(user.id)

setProfile(
profileRes.data
)


const attendanceRes=
await getMyAttendance(
user.id
)

setAttendance(
attendanceRes.data || []
)



const leaveRes=
await getMyLeave(
user.name
)

setLeave(
leaveRes.data || []
)

}
catch(error){

console.log(
"Load Error:",
error
)

}

}




const checkIn=async()=>{

try{

await fetch(

`http://127.0.0.1:5000/checkin/${user.id}`,

{

method:"POST"

}

)

alert(
"Checked In Successfully"
)

load()

}
catch(error){

console.log(error)

}

}




const checkOut=async()=>{

try{

await fetch(

`http://127.0.0.1:5000/checkout/${user.id}`,

{

method:"POST"

}

)

alert(
"Checked Out Successfully"
)

load()

}
catch(error){

console.log(error)

}

}




const applyLeave=async()=>{

try{

await fetch(

"http://127.0.0.1:5000/leave",

{

method:"POST",

headers:{

"Content-Type":
"application/json"

},

body:JSON.stringify(
leaveForm
)

}

)

alert(
"Leave Applied"
)

setLeaveForm({

employee_name:user.name,

leave_type:"",

from_date:"",

to_date:"",

reason:""

})

load()

}
catch(error){

console.log(error)

}

}



return(

<div className="min-h-screen bg-gray-100">

<div className="bg-blue-900 text-white p-6 shadow">

<h1 className="text-3xl font-bold">

Employee Portal

</h1>

<p className="mt-2">

Welcome {profile?.name || "Employee"}

</p>

</div>



<div className="p-8">



<div className="bg-white p-6 rounded-xl shadow mb-8">

<h2 className="text-2xl font-bold mb-5">

My Profile

</h2>

<div className="grid grid-cols-2 gap-4">

<p><b>Name:</b> {profile?.name}</p>

<p><b>Email:</b> {profile?.email}</p>

<p><b>Department:</b> {profile?.department}</p>

<p><b>Position:</b> {profile?.position}</p>

<p><b>Salary:</b> ₹{profile?.salary}</p>

</div>

</div>




<div className="bg-white p-6 rounded-xl shadow mb-8">

<h2 className="text-2xl font-bold mb-5">

My Attendance

</h2>

<div className="flex gap-4 mb-5">

<button

onClick={checkIn}

className="bg-green-600 text-white px-5 py-2 rounded"

>

Check In

</button>


<button

onClick={checkOut}

className="bg-red-600 text-white px-5 py-2 rounded"

>

Check Out

</button>

</div>



<table className="w-full border">

<thead className="bg-gray-200">

<tr>

<th>Date</th>
<th>Check In</th>
<th>Check Out</th>
<th>Status</th>

</tr>

</thead>

<tbody>

{

attendance.length>0 ?

attendance.map((a,index)=>(

<tr
key={index}
className="border text-center"
>

<td>{a.date}</td>

<td>{a.checkin}</td>

<td>{a.checkout}</td>

<td>{a.status}</td>

</tr>

))

:

<tr>

<td
colSpan="4"
className="p-4 text-center"
>

No Attendance Data

</td>

</tr>

}

</tbody>

</table>

</div>





<div className="bg-white p-6 rounded-xl shadow mb-8">

<h2 className="text-2xl font-bold mb-5">

Apply Leave

</h2>


<div className="grid grid-cols-2 gap-4">

<input

placeholder="Leave Type"

className="border p-3 rounded"

value={leaveForm.leave_type}

onChange={(e)=>

setLeaveForm({

...leaveForm,

leave_type:e.target.value

})

}

/>



<input

type="date"

className="border p-3 rounded"

value={leaveForm.from_date}

onChange={(e)=>

setLeaveForm({

...leaveForm,

from_date:e.target.value

})

}

/>



<input

type="date"

className="border p-3 rounded"

value={leaveForm.to_date}

onChange={(e)=>

setLeaveForm({

...leaveForm,

to_date:e.target.value

})

}

/>



<input

placeholder="Reason"

className="border p-3 rounded"

value={leaveForm.reason}

onChange={(e)=>

setLeaveForm({

...leaveForm,

reason:e.target.value

})

}

/>

</div>


<button

onClick={applyLeave}

className="bg-blue-700 text-white px-6 py-3 rounded mt-5"

>

Apply Leave

</button>

</div>






<div className="bg-white p-6 rounded-xl shadow">

<h2 className="text-2xl font-bold mb-5">

My Leave Status

</h2>

<table className="w-full border">

<thead className="bg-gray-200">

<tr>

<th>Type</th>
<th>From</th>
<th>To</th>
<th>Reason</th>
<th>Status</th>

</tr>

</thead>

<tbody>

{

leave.length>0 ?

leave.map((l,index)=>(

<tr
key={index}
className="border text-center"
>

<td>{l.leave_type}</td>

<td>{l.from_date}</td>

<td>{l.to_date}</td>

<td>{l.reason}</td>

<td>

<span
className={

l.status==="Approved"

?

"text-green-600 font-bold"

:

l.status==="Rejected"

?

"text-red-600 font-bold"

:

"text-yellow-500 font-bold"

}

>

{l.status}

</span>

</td>

</tr>

))

:

<tr>

<td
colSpan="5"
className="text-center p-4"
>

No Leave Data

</td>

</tr>

}

</tbody>

</table>

</div>



</div>

</div>

)

}

export default EmployeeDashboard