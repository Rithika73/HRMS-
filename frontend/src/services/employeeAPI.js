import axios from "axios"

const API="http://127.0.0.1:5000"

export const getEmployees=async()=>{

return await axios.get(
`${API}/employees`
)

}

export const addEmployee=async(data)=>{

return await axios.post(
`${API}/employees`,
data
)

}

export const deleteEmployee=async(id)=>{

return await axios.delete(
`${API}/employees/${id}`
)

}

export const updateEmployee=async(id,data)=>{

return await axios.put(
`${API}/employees/${id}`,
data
)

}

export const uploadPhoto=async(
id,
formData
)=>{

return await axios.post(
`${API}/upload/${id}`,
formData
)

}