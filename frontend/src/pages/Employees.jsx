import {useEffect,useState} from "react"
import axios from "axios"
import "./Employees.css"

function Employees(){

const[data,setData]=useState([])

const[selectedFile,setSelectedFile]=
useState(null)

const[editId,setEditId]=
useState(null)

const[form,setForm]=useState({

name:"",
email:"",
department:"",
position:"",
salary:"",
joining_date:""

})


useEffect(()=>{

loadEmployees()

},[])



const loadEmployees=async()=>{

try{

const res=
await axios.get(

"http://127.0.0.1:5000/employees"

)

setData(
res.data
)

}

catch(error){

console.log(error)

}

}



const submit=async()=>{

try{

const dataForm=
new FormData()

dataForm.append(
"name",
form.name
)

dataForm.append(
"email",
form.email
)

dataForm.append(
"department",
form.department
)

dataForm.append(
"position",
form.position
)

dataForm.append(
"salary",
form.salary
)

dataForm.append(
"joining_date",
form.joining_date
)



if(editId){

await axios.put(

`http://127.0.0.1:5000/employees/${editId}`,

form

)


if(selectedFile){

const photoData=
new FormData()

photoData.append(
"photo",
selectedFile
)

await axios.post(

`http://127.0.0.1:5000/upload/${editId}`,

photoData,

{

headers:{

"Content-Type":
"multipart/form-data"

}

}

)

}

alert(
"Employee Updated"
)

}

else{

const res=
await axios.post(

"http://127.0.0.1:5000/employees",

dataForm,

{

headers:{

"Content-Type":
"multipart/form-data"

}

}

)



if(selectedFile){

const photoData=
new FormData()

photoData.append(
"photo",
selectedFile
)

await axios.post(

`http://127.0.0.1:5000/upload/${res.data.id}`,

photoData,

{

headers:{

"Content-Type":
"multipart/form-data"

}

}

)

}


alert(
"Employee Added"

)

}



setForm({

name:"",
email:"",
department:"",
position:"",
salary:"",
joining_date:""

})

setSelectedFile(null)

setEditId(null)

loadEmployees()

}

catch(error){

console.log(error)

alert(
"Error Updating Employee"
)

}

}



const editEmployee=(emp)=>{

setEditId(emp.id)

setForm({

name:emp.name,
email:emp.email,
department:emp.department,
position:emp.position,
salary:emp.salary,
joining_date:""

})

window.scrollTo({

top:0,
behavior:"smooth"

})

}



const deleteEmployee=
async(id)=>{

await axios.delete(

`http://127.0.0.1:5000/employees/${id}`

)

loadEmployees()

}



return(

<div className="employee-page">

<div className="header-box">

<h1>
Human Resource Management System
</h1>

<p>
Admin • Employee Management
</p>

</div>



<div className="form-box">

<div className="employee-form">

<input
placeholder="Name"
value={form.name}
onChange={(e)=>

setForm({

...form,
name:e.target.value

})

}
/>


<input
placeholder="Email"
value={form.email}
onChange={(e)=>

setForm({

...form,
email:e.target.value

})

}
/>



<input
placeholder="Department"
value={form.department}
onChange={(e)=>

setForm({

...form,
department:e.target.value

})

}
/>



<input
placeholder="Position"
value={form.position}
onChange={(e)=>

setForm({

...form,
position:e.target.value

})

}
/>



<input
placeholder="Salary"
value={form.salary}
onChange={(e)=>

setForm({

...form,
salary:e.target.value

})

}
/>



<input
type="date"
value={form.joining_date}
onChange={(e)=>

setForm({

...form,
joining_date:e.target.value

})

}
/>



<input
type="file"
onChange={(e)=>

setSelectedFile(
e.target.files[0]
)

}
/>


<button onClick={submit}>

{

editId

?

"Update Employee"

:

"Add Employee"

}

</button>

</div>

</div>



<div className="table-box">

<table>

<thead>

<tr>

<th>Photo</th>
<th>ID</th>
<th>Name</th>
<th>Email</th>
<th>Department</th>
<th>Position</th>
<th>Salary</th>
<th>Code</th>
<th>Password</th>
<th>Action</th>

</tr>

</thead>


<tbody>

{

data.map(emp=>(

<tr key={emp.id}>

<td>

{

emp.photo ?

<img

className="emp-photo"

src={`http://127.0.0.1:5000/uploads/${emp.photo}?t=${new Date().getTime()}`}

alt="employee"

/>

:

"No Image"

}

</td>

<td>{emp.id}</td>
<td>{emp.name}</td>
<td>{emp.email}</td>
<td>{emp.department}</td>
<td>{emp.position}</td>
<td>{emp.salary}</td>
<td>{emp.employee_code}</td>
<td>123456</td>


<td>

<button
className="edit-btn"
onClick={()=>editEmployee(emp)}
>

Edit

</button>


<button
className="delete-btn"
onClick={()=>deleteEmployee(emp.id)}
>

Delete

</button>

</td>

</tr>

))

}

</tbody>

</table>

</div>

</div>

)

}

export default Employees