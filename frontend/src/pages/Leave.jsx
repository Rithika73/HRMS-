import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"

import {
getLeaves,
approveLeave,
rejectLeave
} from "../services/leaveAPI"


function Leave(){

const[data,setData]=useState([])


useEffect(()=>{

loadLeaves()

},[])



const loadLeaves=async()=>{

const res=
await getLeaves()

setData(
res.data
)

}

const approve=async(id)=>{

await approveLeave(id)

loadLeaves()

}



const reject=async(id)=>{

await rejectLeave(id)

loadLeaves()

}


return(

<div className="flex">

<Sidebar/>


<div className="flex-1">

<Navbar/>


<div className="p-8">

<h1 className="text-3xl font-bold mb-5">

Leave Management

</h1>


<div className="bg-white shadow rounded-xl p-5">

<h2 className="text-xl font-bold mb-4">

Employee Leave Requests

</h2>


<table className="w-full border">

<thead className="bg-black text-white">

<tr>

<th>ID</th>

<th>Name</th>

<th>Type</th>

<th>From</th>

<th>To</th>

<th>Status</th>

<th>Action</th>

</tr>

</thead>


<tbody>

{

data.map((l)=>(

<tr
key={l.id}
className="text-center border"
>

<td>{l.id}</td>

<td>{l.employee_name}</td>

<td>{l.leave_type}</td>

<td>{l.from_date}</td>

<td>{l.to_date}</td>


<td>

<span
style={{

color:

l.status==="Approved"

?

"green"

:

l.status==="Rejected"

?

"red"

:

"orange"

}}

>

{l.status}

</span>

</td>



<td>

<button
onClick={()=>approve(l.id)}

className="bg-green-600 text-white px-2 py-1 mr-2 rounded"
>

Approve

</button>


<button
onClick={()=>reject(l.id)}

className="bg-red-600 text-white px-2 py-1 rounded"
>

Reject

</button>

</td>

</tr>

))

}

</tbody>

</table>

</div>

</div>

</div>

</div>

)

}

export default Leave