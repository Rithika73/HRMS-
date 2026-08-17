import axios from "axios"

export const getProfile=(id)=>{

return axios.get(

`http://127.0.0.1:5000/employee/${id}`

)

}