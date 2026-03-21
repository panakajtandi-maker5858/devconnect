import api from './api'

const applyForJob = async (jobId , coverLetter ) =>{
    const response = await api.post(`/application/apply/${jobId}` , { coverLetter})
    return response.data
}

const getMyApplications = async ()=>{
    const response = await api.get(`/applications/my-applications`)
    return response.data
}

const getJobApplications = async (jobId) =>{
    const response = await api.get(`/applications/job/${jobId}`)
    return response.data
}


const updateApplicationStatus = async (applicationId , status )=>{
    const response = await api.put(`/applications/${applicationId}/status` , { status})
    return response.data
}


export default { applyForJob , getMyApplications , getJobApplications , updateApplicationStatus}