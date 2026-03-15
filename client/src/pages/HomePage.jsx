import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/authContext'

const HomePage = () => {

const user = useAuth()


  return (
    <>
    <div className='min-h-screen br-gray-100'>
<div className='max-w-4xl mx-auto px-6 py-20 text-center '>

  <h1 className='text-5xl font-bold text-blue-600 mb-6 '>
    Welcome to Devconnect !
  </h1>

<p className='text-xl text-gray-600 mb-10'>
    A Platform fro Developers and Recriuters
</p>


{ user ? (

    <Link to='/dashboard'
    className='bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 ' >
    Go to Dashboard
    </Link>
):(

<div className='flex gap-4 justify-center '>
  <Link to='/register'
  className='bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 '>
  Get Started 
  </Link>
  <Link to='/login'
   className='bg-blue-600 text-white px-8 py-3 rounded-lg text-lg border border-blue-600 hover:bg-blue-50 '  >
  Login
  </Link>

</div>

)}


</div>
    </div>
    
    </>
  )
}

export default HomePage