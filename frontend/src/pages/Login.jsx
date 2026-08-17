import {useState} from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios"
import "./Login.css"

function Login(){

const navigate=useNavigate()

const[employee_code,setEmployeeCode]=
useState("")

const[password,setPassword]=
useState("")


const login=async()=>{

try{

const res=await axios.post(

"http://127.0.0.1:5000/login",

{
employee_code,
password
}

)

const user=res.data

localStorage.setItem(
"user",
JSON.stringify(user)
)


if(user.role==="admin"){

navigate("/dashboard")

}

else{

navigate(
"/employee-dashboard"
)

}

}

catch{

alert(
"Login Failed"
)

}

}


return(

<div className="login-container">

<div className="login-box">

<h1>

SmartHR Pro

</h1>

<h3>

Human Resource Management System

</h3>


<input

type="text"

placeholder="Employee ID"

value={employee_code}

onChange={(e)=>

setEmployeeCode(
e.target.value
)

}

/>


<input

type="password"

placeholder="Password"

value={password}

onChange={(e)=>

setPassword(
e.target.value
)

}

/>


<button
onClick={login}
>

Login

</button>

</div>

</div>

)

}

export default Login

