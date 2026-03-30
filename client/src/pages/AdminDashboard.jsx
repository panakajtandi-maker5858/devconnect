import { useState , useEffect } from 'react'
import { useAuth } from '../context/authContext'
import api from '../services/api'



function AdminDashboard() {
const { user } = useAuth()

const [ activeTab , setActiveTab ] = useState('stats')
const [ stats , setStats ] = useState(null)
const [ users , setUsers ] = useState([])
const [ jobs , setJobs ] = useState([])
const [ loading , setLoading ] = useState(false)


// Stats load karo 
useEffect(()=>{
    loadStats()
},[])


 
const loadStats = async ()=>{
    try {
        const data = await api.get('/admin/stats')
        setStats(data.data)
    } catch(err) {
        console.log(err)
    }
}

const loadUsers = async ()=>{
    setLoading(true)
    try {
        const data = await api.get('/admin/users')
        setUsers(data.data.users)
    } catch (err) {
        console.log(err)
    } finally {
        setLoading(false)
    }
}

const loadJobs = async ()=>{
    setLoading(true)
    try {
        const data = await api.get('/admin/jobs')
        setJobs(data.data.jobs)
    } catch (err){
        console.log(err)
    } finally {
        setLoading(false)
    }
}

const handleTabChange = (tab)=>{
    setActiveTab(tab)
    if(tab == 'users') loadUsers()
        if(tab === 'jobs') loadJobs()
}


const handleBanUser = async (userId) =>{
try {
    await api.put(`/admin/users/${userId}/ban`)
    loadUsers()
} catch (err) {
    console.log(err)
}


}

const handleDeleteJob = async (jobId)=>{
    if(!window.confirm('Do you want to remove the Job')) return 
    try {
        await api.delete(`/admin/jobs/${jobId}`)
        loadJobs()
    } catch (err){
        console.log(err)
    }
}

return (
<div className='min-h-screen bg-gray-100 py-8 '>
<div className='max-w-6xl mx-auto px-6 '>

<h1 className='text-3xl font-bold mb-6 '>Admin Dashboard</h1>

{/* Tabs */}
<div className='flex gap-3 mb-6'>
    {['stats' , 'users' , 'jobs'].map((tab)=>(
        <button
        key={tab}
        onClick={()=> handleTabChange(tab)}
        className={`px-4 py-2 rounded capitalize ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
        >
            {tab}
        </button>
    ))}

</div>


{/* Stats Tab */}
{activeTab === 'stats' && stats && (
    <div className='grid grid-cols-2 md:grid-cols-3 gap-4 '>
        <div className='bg-white rounded-lg shadow p-4 text-center'>
            <p className='text-3xl font-bold text-blue-600'>{stats.totalUsers}</p>
            <p className='text-gray-500 '>Total Users</p>

        </div>

        <div className='bg-white rounded-lg shadow p-4 text-center'>
              <p className='text-3xl font-bold text-green-500'>{stats.totalDevelopers}</p>
              <p className='text-gray-500'>Developers</p>
            </div>

            <div className='bg-white rounded-lg shadow p-4 text-center'>
              <p className='text-3xl font-bold text-purple-500'>{stats.totalRecruiters}</p>
              <p className='text-gray-500'>Recruiters</p>
            </div>

       <div className='bg-white rounded-lg shadow p-4 text-center'>
              <p className='text-3xl font-bold text-yellow-500'>{stats.totalJobs}</p>
              <p className='text-gray-500'>Total Jobs</p>
            </div>

            <div className='bg-white rounded-lg shadow p-4 text-center'>
              <p className='text-3xl font-bold text-green-500'>{stats.openJobs}</p>
              <p className='text-gray-500'>Open Jobs</p>
            </div>

            <div className='bg-white rounded-lg shadow p-4 text-center'>
              <p className='text-3xl font-bold text-red-500'>{stats.totalApplications}</p>
              <p className='text-gray-500'>Applications</p>
            </div>
    </div>
)}


{activeTab === 'users' && (
  <div className='bg-white rounded-lg shadow overflow-hidden'>
    <table className='w-full table-fixed'>
      <thead className='bg-gray-50'>
        <tr>
          <th className='text-left p-4 text-gray-600 w-1/5'>Name</th>
          <th className='text-left p-4 text-gray-600 w-1/4'>Email</th>
          <th className='text-left p-4 text-gray-600 w-1/6'>Role</th>
          <th className='text-left p-4 text-gray-600 w-1/6'>Status</th>
          <th className='text-left p-4 text-gray-600 w-1/6'>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u._id} className='border-t'>
            <td className='p-4'>{u.name || 'N/A'}</td>
            <td className='p-4 text-gray-500 truncate'>{u.email}</td>
            <td className='p-4 capitalize'>{u.role}</td>
            <td className='p-4'>
              <span className={`px-2 py-1 rounded text-xs ${
                u.isBanned
                  ? 'bg-red-100 text-red-600'
                  : 'bg-green-100 text-green-600'
              }`}>
                {u.isBanned ? 'Banned' : 'Active'}
              </span>
            </td>
            <td className='p-4'>
              {u.role !== 'admin' && (
                <button
                  onClick={() => handleBanUser(u._id)}
                  className={`px-3 py-1 ml-1 rounded text-sm active:scale-95 text-white ${
                    u.isBanned
                      ? 'bg-green-500 hover:bg-green-600'
                      : 'bg-red-500 hover:bg-red-600'
                  }`}
                >
                  {u.isBanned ? 'Unban' : 'Ban'}
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
                
             


 {/* Jobs Tab */}
        {activeTab === 'jobs' && (
          <div className='bg-white rounded-lg shadow overflow-hidden'>
            <table className='w-full'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='text-left p-4 text-gray-600'>Title</th>
                  <th className='text-left p-4 text-gray-600'>Company</th>
                  <th className='text-left p-4 text-gray-600'>Status</th>
                  <th className='text-left p-4 text-gray-600'>Action</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job._id} className='border-t'>
                    <td className='p-4 font-medium'>{job.title}</td>
                    <td className='p-4 text-gray-500'>{job.recruiter?.name}</td>
                    <td className='p-4'>
                      <span className={`px-2 py-1 rounded text-xs ${
                        job.status === 'open'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {job.status}
                      </span>
                    </td>
                    <td className='p-4'>
                      <button
                        onClick={() => handleDeleteJob(job._id)}
                        className='bg-red-500 text-white px-3 py-1 active:scale-95 rounded text-sm hover:bg-red-600'
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}



</div>
</div>


)
}



export default AdminDashboard