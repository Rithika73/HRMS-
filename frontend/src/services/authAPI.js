import axios from "axios"

const API="http://127.0.0.1:5000"

export const loginUser=async(data)=>{

return await axios.post(
`${API}/login`,
data
)

}