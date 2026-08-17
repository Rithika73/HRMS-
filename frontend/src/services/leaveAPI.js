import axios from "axios"

const API="http://127.0.0.1:5000"

export const getLeaves=async()=>{
return await axios.get(`${API}/leave`)
}

export const applyLeave=async(data)=>{
return await axios.post(`${API}/leave`,data)
}

export const approveLeave=async(id)=>{
return await axios.put(`${API}/approve/${id}`)
}

export const rejectLeave=async(id)=>{
return await axios.put(`${API}/reject/${id}`)
}