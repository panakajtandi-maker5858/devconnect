import React from 'react'
import { useState } from "react"
import { useNavigate , Link } from "react-router-dom"
import authService  from '../services/authService'
import { useAuth } from '../context/authContext'


const LoginPage = () => {

  
// LOGICAL CODE FOR PROPER FUNCTIONG OF THIS PAGE 

const navigate = useNavigate()
const { login } = useAuth()

const [ formData , setFormData] = useState({
  email:'',
  password:''
})

const [ error , setError ] = useState('')
const [ loading , setLoading ] = useState(false)

const handelChange = (e)=>{
 setFormData({ ...formData  , [e.target.name] : e.target.value   })
}

const handleSubmit = async  (e)=>{
e.preventDefault()
setLoading(true)
setError('')


try{

const data = await authService.login(formData)
login(data.user , data.token)
navigate('/dashboard')

}
catch(err){
setError(err.response?.data?.message || " Something went Wrong !")
}
finally{
  setLoading(false)
}

}


// UI AND WEBSITE INTERFRENCE TO WHICH THE USER INTERACT  

  return (
        <>
    
    <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
       
<div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
  <h2 className='text-2xl font-bold text-center mb-6'>Welcome Back !</h2>

{ error && (
  <div className=' bg-red-100 text-red-600 p-3 rounded mb-4 '>
    {error}
  </div>
)}


<form onSubmit={handleSubmit} >

  <div className='mb-4'> 

<label className='block text-gray-700 mb-2 '>Email </label>
<input
 type="email" 
 name='email'     
 value={formData.email}
 onChange={handelChange}
 className=' w-full border rounded p-2 '
 placeholder='Enter your Email'  
 required    />

  </div>

<div className='mb-6'>
  <label className='block text-gray-700 mb-2 '>Password</label>
  <input
   type="password" 
  name='password'
  value={formData.password}
  onChange={handelChange}
  className='w-full border rounded p-2 '
  placeholder='Enter your password '
  required   />

</div>
 

 <button
 type='submit'
 disabled={loading}
 className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 active:scale-95  disabled:opacity-50 '
 >

{loading ? ' Logging in...' : ' Login '}

 </button>

</form>


<p className='text-center mt-4 text-gray-600 '>

Don't have an account?{''}
<Link to='/register'
className='text-blue-600 hover:underline '
> Register </Link>
</p>

</div>
    </div>
    
    </>
  )
}

export default LoginPage