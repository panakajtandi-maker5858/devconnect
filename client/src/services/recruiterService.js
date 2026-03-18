import api from './api'

const updateProfile = async (profileData) =>{
    const response = await api.put('/recruiter/profile' , profileData)
    return response.data
}


const getMyProfile = async  ()=>{
const response = await api.get('recruiter/profile/me')
return response.data
}


const getMyProfileById = async (userId)=>{
const response = await api.get(`/recruiter/profile/${userId}`)
return response.data
}

export default { updateProfile , getMyProfile , getMyProfileById }