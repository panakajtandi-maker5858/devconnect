import axios from 'axios'
import api from './api'


const API_URL = 'http://localhost:5000/api/auth'

const register = async (userData)=>{
    const response = await api.post('/auth/register', userData)
    return response.data

}

const login = async (userData)=>{
    const response = await api.post('/auth/login' , userData )
    return response.data 
}

export default { register , login }