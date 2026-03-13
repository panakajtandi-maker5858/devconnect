import React from 'react'
import { useAuth } from '../context/authContext'
import { useNavigate  } from 'react-router-dom'

const DashboardPage = () => {

const { user , logout } = useAuth()
const navigate = useNavigate()

const handlelogout = ()=>{
  logout()
  navigate('/login')
}



  return (
        <>
    
    <div className='min-h-screen bg-gray-100 '>
   <div className=' max-w-4xl mx-auto p-8 '>
    <div className='bg-white rounded-lg shadow-md p-6 '> 


<div className='flex justify-between items-center mb-6 '>
  <h1 className='text-2xl font-bold '>Dashboard</h1>
  <button
      onClick={handlelogout}
      className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 active:scale-95 '
      >
    Logout 
  </button>
</div>

<div className='bg-blue-50 p-4 rounded-lg '>
  <h2 className='text-xl font-semibold mb-2'> 
    Welcome , {user?.name}!
  </h2>

  <p className='text-gray-600'> Email: {user?.email}</p>
 <p className='text-gray-600 capitalize'>Role: {user?.role}</p>

</div>


    </div>
   </div>
    </div>
    
    </>
  )
}

export default DashboardPage