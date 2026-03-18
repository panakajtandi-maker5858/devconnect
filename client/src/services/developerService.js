import api from './api'

const updateProfile = async (profileData) =>{
    const response = await api.put('/developer/profile' , profileData)
    return response.data
}

const getMyProfile = async ()=>{
    const response = await api.get('/developer/profile/me')
    return response.data
}

const getProfilebyId = async (userId)=>{
    const response = await api.get(`/developer/profile/${userId}`)
    return response.data
}



export default { updateProfile , getMyProfile , getProfilebyId}