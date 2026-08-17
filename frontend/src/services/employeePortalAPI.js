import axios from "axios"

const API="http://127.0.0.1:5000"

export const getMyAttendance=(id)=>{

return axios.get(

`${API}/attendance/${id}`

)

}