import {useEffect,useState} from "react"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import {getAttendance} from "../services/attendanceAPI"

function Attendance(){

const[data,setData]=useState([])

const[search,setSearch]=
useState("")


useEffect(()=>{

loadAttendance()

},[])



const loadAttendance=async()=>{

const res=
await getAttendance()

setData(
res.data
)

}



const filteredData=
data.filter((x)=>

x.name?.toLowerCase()

.includes(

search.toLowerCase()

)

)



return(

<div className="flex">

<Sidebar/>

<div className="flex-1">

<Navbar/>

<div className="p-8">

<h1 className="text-3xl font-bold mb-6">

Attendance Records

</h1>


<input

placeholder="Search Employee Name"

className="border p-3 rounded w-72 mb-5"

value={search}

onChange={(e)=>

setSearch(
e.target.value
)

}

/>


<table className="w-full border">

<thead className="bg-black text-white">

<tr>

<th>ID</th>

<th>Name</th>

<th>Check In</th>

<th>Check Out</th>

<th>Date</th>

<th>Status</th>

</tr>

</thead>


<tbody>

{

filteredData.map((x)=>(

<tr
key={x.id}
className="text-center border"
>

<td>{x.id}</td>

<td>{x.name}</td>

<td>{x.checkin}</td>

<td>{x.checkout}</td>

<td>{x.date}</td>

<td>

<span
className="text-green-600 font-bold"
>

{x.status}

</span>

</td>

</tr>

))

}

</tbody>

</table>

</div>

</div>

</div>

)

}

export default Attendance