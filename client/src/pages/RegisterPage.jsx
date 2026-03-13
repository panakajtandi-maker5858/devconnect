import React from 'react'
import { useState } from 'react'
import { useNavigate , Link} from 'react-router-dom'
import authService from '../services/authService'



// LOGICAL CODE FOR PROPER FUNCTIONG OF THIS PAGE 

const RegisterPage = () => {
const navigate = useNavigate()

const [ formData , setFormData] = useState({
  name:'',
  email:'',
  password:'',
  role:'developer'
})

const [error , setError ] = useState('')
const [ loading , setLoading] = useState(false)

const handleChange = (e)=>{

  setFormData({ ...formData , [e.target.name] : e.target.value })
}

const handelSubmit = async (e)=>{
  e.preventDefault()
setLoading(true)
setError('')

try{
  await authService.register(formData)
  navigate("/login")
}
catch(err){
  setError(err.response?.data?.message ||" Somethng went wrong !")
}
finally{
  setLoading(false)
}

}

// UI AND WEBSITE INTERFRENCE TO WHICH THE USER INTERACT  

  return (
        <>
      <div className='bg-gray-100 flex items-center justify-center min-h-screen'>
     <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
<h2 className='text-2xl font-bold text-center mb-6 '> Create Account</h2>


{ error && (
  <div className='bg-red-100 text-red-600 p-3 rounded mb-4 '>
    {error}
  </div>
)}


<form onSubmit={handelSubmit} >
<div className='mb-4'>

  <label className='mb-2 text-gray-700 block' > Name </label>
<input 
type="text"
 name='name'
 value={formData.name}        
 onChange={handleChange}
 className='w-full border rounded p-2 capitalize'
 placeholder='Enter your name'
 required        />

</div>

<div className='mb-4'>

<label className='mb-2 text-gray-700 block'> Email</label>
<input
type='email'
name="email"
value={formData.email}
onChange={handleChange}
className='w-full border rounded p-2 '
placeholder='Enter your Email '
required         />

</div>

<div className='mb-4'>
  <label className='mb-2 text-gray-700 block ' > Password</label>
<input 
type='password'
name='password'
value={formData.password}
onChange={handleChange}
className='w-full border rounded p-2 '
placeholder='Enter your password'
minLength={6}
   required  />

</div>

<div className='mb-6 '>

  <label  className='mb-2'> Role</label>
  
<select 
name='role'
value={formData.role}
onChange={handleChange}
className='w-full border rounded p-2'  >

<option value="developer" > Developer </option>
<option value="recruiter" > Recruiter </option>
<option value="admin" >  Admin </option>

</select>
</div>


<button
type='submit'
disabled={loading}
className=' w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 active:scale-95 disabled:opacity-50 '
>

{ loading ? ' Registering...' : ' Register'}
</button>

</form>

<p className='text-center mt-4 text-gray-600 '>
  Already have an account ? {' '}
  <Link to='/login' className='text-blue-600 hover:underline'>
  Login 
  </Link>
</p>


     </div>
      </div>
    </>
  )
}

export default RegisterPage