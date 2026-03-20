import api from './api'


const getAllJobs = async (params) =>{
    const response = await api.get('/jobs' , {params})
    return response.data
}

const getJobById = async (id) =>{
    const response = await api.get(`/job/${id}`)
    return response.data
}

const createJob = async (jobData) =>{
    const response = await api.post('/jobs' , jobData)
    return response.data
}

const updateJob = async ( id , jobData ) =>{
    const response = await api.put(`/jobs/${id}` , jobData)
    return response.data

}

const deleteJob = async (id) =>{
    const response = await api.delete(`/jobs/${id}`)
    return response.data
}

const getMyJobs = async ()=>{
    const response = await api.get('/jobs/my-jobs')
    return response.data
}

export default { getAllJobs , getJobById , createJob , updateJob , deleteJob , getMyJobs }