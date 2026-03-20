import { useState , useEffect } from 'react'
import { useParams , useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import jobService from '../services/jobService'
import api from '../services/api'


function JobDetailPage() {
    const { id } = useParams()
    const { user } = useAuth()
    const navigate = useNavigate()


const [ job , setJob ] = useState(null)
const [loading , setLoading ] = useState(true)
const [ error , setError ] = useState("")


// Apply states
const [showApplyForm , setShowApplyForm ] = useState(false)
const [ coverLetter , setCoverLetter ] = useState('')
const [applying , setApplying ] = useState(false)
const [ applied , setApplied ] = useState(false)
const [ applySuccess , setApplySuccess ] = useState('')
const [applyError , setApplyError] = useState('')


useEffect(()=>{
    const loadJob = async ()=>{
        try {
            const data = await jobService.getJobById(id)
            setJob(data.job)
        } catch(error) {
            setError("Job not found ")
        } finally {
            setLoading(false)
        }
    }
    loadJob()

}, [id])


const handleApply = async (e)=>{
    e.preventDefault()
    setApplying(true)
    setApplyError('')


try {
await api.post(`/applications/apply/${id}` , {coverLetter})
setApplySuccess('Application submitted successfully !')
setApplied(true)
setShowApplyForm(false)

}catch(err) {
    setApplyError(err.response?.data?.message || 'Something went wrong ')
} finally {
    setApplying(false)
}

}

if(loading) {
    return (
        <div className='min-h-screen flex items-center justify-center '>
            <p className='text-gray-500'>Loaodng...</p>
        </div>
    )
}


if(error) {
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <p className='text-red-500'>{error}</p>
        </div>
    )
}





return (
    <div className='min-h-screen bg-gray-100 py-8 '>
        <div className='max-w-4xl mx-auto px-6 '>

    {/* Job Header */}
    <div className='bg-white rounded-lg shadow p-6 mb-6 '>
        <div className='flex justify-between items-start mb-4 '>
         <div>
            <h1 className='text-3xl font-bold mb-2 '>{job.title}</h1>
            <p className='text-gray-500'>{job.recruiter?.name}</p>
         </div>

<span   
 className={`px-3 py-1 rounded-full text-sm font-medium
              ${job.jobType === 'remote' ? 'bg-green-100 text-green-600' :
                job.jobType === 'hybrid' ? 'bg-yellow-100 text-yellow-600' :
                'bg-blue-100 text-blue-600'}`}
>
    {job.jobType}
</span>

        </div>

   {/* Job Meta */}
   <div className='flex flex-wrap gap-4 text-gray-500 mb-4 '>
    {job.location && <span>📍 {job.location}</span>}
    {job.salaryMin &&job.salaryMax && (
        <span>💰 ₹{job.salaryMin} - ₹{job.salaryMax}</span>
    )}
    <span>🎯 {job.experienceLevel}</span>
    {job.deadline && (
              <span>📅 Deadline: {new Date(job.deadline).toLocaleDateString('en-IN')}</span>
            )}
   </div>


   {/* Skills */}

   {job.skillsRequired?.length > 0 && (
    <div className='mb-4 '>
        <h3 className='font-semibold mb-2 '>Skills Required:</h3>
        <div className='flex flex-wrap gap-2 '>
{job.skillsRequired.map((skill , index)=>(
    <span 
    key={index}
    className='bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm'>
        {skill}
    </span>
))}
        </div>
    </div>
   )}

   {/* Apply Button - sirf developer ke liye  */}
   {user && user.role === 'developer' && (
    <div className='mt-4 '>
        {applySuccess && (
            <div className='bg-green-100 text-green-600 p-3 rounded mb-3 '>
                {applySuccess}
            </div>
        )}

{!applied && !showApplyForm && (
    <button 
    onClick={()=> setShowApplyForm(true)}
    className='bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 '>
        Apply Now 
    </button>
)}


  {/* Apply Form  */}
  {showApplyForm && (
    <form onSubmit={handleApply} className='mt-4 '>
        <label className='block text-gray-700 mb-2 ' >
            Cover Letter
        </label>
        <textarea  
        value={coverLetter}
        onChange={(e)=> setCoverLetter(e.target.value)}
        className='w-full rounded p-2 mb-3 '
        rows={4}
        placeholder='Enter about yourself...'
        />

{applyError && (
    <div className='bg-red-100 text-red-600 p-3 rounded mb-3 '>
        {applyError}
    </div>
)}

<div className='flex gap-3'>
    <button
    type='submit'
    disabled={applying}
    className='bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50'
    >
    {applying ? 'Submitting...' : 'Submit Application '}
    </button>
    <button
    type='submit'
    onClick={()=> setShowApplyForm(false)}
    className='bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300'
    >
        Cancel
    </button>
</div>

    </form>
  )}


    </div>
   )}

{/* Login prompt */}
{!user && (
    <p className='text-gray-500 mt-4'>
        To apply for job   {''}
        <span
        onClick={()=> navigate('/login')}
        className='text-blue-600 font-medium cursor-pointer hover:underline px-1'>
            
            Login
        </span>
    </p>
)}

    </div>

    {/* job Description  */}
    <div className='bg-white rounded-lg shadow p-6 '>
        <h2 className='text-xl font-semibold mb-4 '>Job Description </h2>
        <p className='text-gray-700 whitespace-pre-line'>
            {job.description}
        </p>
    </div>


        </div>
    </div>
)

}

export default JobDetailPage