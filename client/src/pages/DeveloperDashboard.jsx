import { useState , useEffect } from 'react'
import  { Link } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import applicationService from '../services/applicationService'

function DeveloperDashboard () {
const { user } = useAuth()
const [applications , setApplications ] = useState([])
const [ loading , setLoading ] = useState(true)



// STATES
const total = applications.length
const shortlisted = applications.filter(a=> a.status === 'shortlisted').length
const rejected = applications.filter(a=> a.status === 'rejected').length
const pending = applications.filter(a=> a.status === 'pending').length


useEffect(()=> {
const loadApplications = async ()=>{
    try {
        const data = await applicationService.getMyApplications()
        setApplications(data.applications)
    } catch(err) {
        console.log(err)
    } finally {
        setLoading(false)
    }
}

loadApplications()


},[])

const getStatusColor = (status) => {
    if(status === 'shortlisted') return 'bg-green-100 text-green-600'
    if(status === 'rejected') return 'bg-red-100 text-red-600 '
    return 'bg-yellow-100 text-yellow-600'
}


if(loading) {
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <p className='text-gray-500 '>Loading...</p>
        </div>
    )
}

return (
    <div className='min-h-screen bg-gray-100 py-8 '>
        <div className='max-w-5xl mx-auto px-6 '>

<h1 className='text-3xl font-bold mb-6 '>
    welcome, {user?.name} !👋
</h1>


  {/* States cards */}
  <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 '>

<div className='bg-white rounded-lg shadow p-4 text-center '>
    <p className='text-3xl font-bold text-blue-600 '>{total}</p>
    <p className='text-gray-500 text-sm '>Total Applied</p>
</div>


<div className='bg-white rounded-lg shadow p-4 text-center '>
    <p className='text-3xl font-bold text-yellow-500 '>{pending}</p>
    <p className='text-gray-500 text-sm '>Pending</p>
</div>

<div className='bg-white rounded-lg shadow p-4 text-center '>
    <p className='text-3xl font-bold text-green-500 '>{shortlisted}</p>
    <p className='text-gray-500 text-sm'>Shortlisted </p>
</div>

<div className='bg-white rounded-lg shadow p-4 text-center '>
    <p className='text-3xl font-bold text-red-500 '>{rejected}</p>
    <p className='text-gray-500 text-sm '>Rejected</p>
</div>

  </div>


{/* Quick Links  */}
<div className='flex gap-4 mb-8 '>
    <Link
    to='/jobs'
    className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
    >
    Browse Jobs 
    </Link>
    <Link
    to='/developer/profile'
    className='bg-white text-blue-600 px-4 py-2 rounded border border-blue-600 hover:bg-blue-50 '
    >
    Edit Profile 
    </Link>
</div>


{/* Applications List */}
        <h2 className='text-xl font-semibold mb-4'>My Applications</h2>

        {applications.length === 0 ? (
          <div className='bg-white rounded-lg shadow p-6 text-center'>
            <p className='text-gray-500 mb-3'>There is no application for job !</p>
            <Link
              to='/jobs'
              className='text-blue-600 hover:underline'
            >
              Jobs browse karo
            </Link>
          </div>
        ) : (
          applications.map((app) => (
            <div key={app._id} className='bg-white rounded-lg shadow p-4 mb-3'>

              <div className='flex justify-between items-start'>
                <div>
                  <h3 className='font-semibold text-lg'>
                    {app.job?.title}
                  </h3>
                  <div className='flex gap-3 text-gray-500 text-sm mt-1'>
                    {app.job?.location && (
                      <span>📍 {app.job.location}</span>
                    )}
                    {app.job?.jobType && (
                      <span>💼 {app.job.jobType}</span>
                    )}
                    {app.job?.salaryMin && app.job?.salaryMax && (
                      <span>💰 ₹{app.job.salaryMin} - ₹{app.job.salaryMax}</span>
                    )}
                  </div>
                </div>

                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(app.status)}`}>
                  {app.status}
                </span>
              </div>

              <p className='text-gray-400 text-xs mt-2'>
                Applied: {new Date(app.createdAt).toLocaleDateString('en-IN')}
              </p>

            </div>
          ))
        )}



        </div>
    </div>
)

}

export default DeveloperDashboard