import axios from "axios"

const API="http://127.0.0.1:5000"

export const getAttendance=async()=>{

return await axios.get(
`${API}/attendance`
)

}

export const checkin=async(data)=>{

return await axios.post(
`${API}/checkin`,
data
)

}

export const checkout=async(id)=>{

return await axios.put(
`${API}/checkout/${id}`
)

}