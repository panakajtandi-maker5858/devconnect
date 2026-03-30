import { useState , useEffect  } from "react";
import { Link } from 'react-router-dom'
import { useAuth } from "../context/authContext"
import jobService from '../services/jobService'
import applicationService  from "../services/applicationService";




function RecruiterDashboard () {

const { user } = useAuth()

const [jobs , setJobs ] = useState([])
const [ selectedJob , setSelectedJob ] = useState(null)
const [ applications , setApplications ] = useState([])
const [ loading , setLoading ] = useState(true)
const [ appLoading , setAppLoading ] = useState(false)
const [updatingId, setUpdatingId] = useState(null)





// Recruiter ki jobs load karo 
useEffect(()=>{
    const loadJobs = async ()=>{
        try {
            const data = await jobService.getMyJobs()
            setJobs(data.jobs)
        } catch( err ) {
            console.log(err)
        }  finally {
            setLoading(false)
        }
    }
    loadJobs()
}, [])


// Job select karno par applications load karo 
const handleJobSelect = async (job) =>{
    setSelectedJob(job)
    setAppLoading(true)

try {
    const data = await applicationService.getJobApplications(job._id)
    setApplications(data.applications)
} catch (err) {
    console.log(err)
} finally {
    setAppLoading(false)
}

}


// Application status update karo 
const handleStatusUpdatte = async (applicationId , status ) =>{
    
setUpdatingId(applicationId)  // <-  updtaing start

    try {
        await applicationService.updateApplicationStatus(applicationId , status)

     // ui update karo 
       // Dobara fetch karo — database se fresh data aayega
    const data = await applicationService.getJobApplications(selectedJob._id)
    setApplications(data.applications)
    

    } catch (err) {
        console.log(err)
     }  finally {
       setUpdatingId(null) // <-  updating end
     }
}


// Status badge color 
const getStatusColor = (status) =>{
    if(status === 'shortlisted') return 'bg-green-100 text-green-600'
    if(status === 'rejected') return 'bg-red-100 text-red-600'
    return 'bg-yellow-100 text-yellow-600'
}

if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center ">
            <p className="text-gray-500 ">Loading...</p>
        </div>
    )
}

return  (

 <div className="min-h-screen bg-gray-100 py-8 ">
    <div className="max-w-6xl mx-auto px-6 ">

<div className="flex justify-between items-center mb-6">
    <h1 className="text-3xl font-bold ">Recruiter Dashboard </h1>
    <Link
    to='/post-job'
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
        + Post New Job
    </Link>
</div>


<div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">

{/* left - My Jobs  */}
<div>
    <h2 className="text-xl font-semibold mb-4  ">
        My Jobs ({jobs.length})
    </h2>

{jobs.length === 0 ? (
    <div className="bg-white rounded-lg shadow p-6 text-center ">
        <p className="text-gray-500 ">There is no post available </p>
        <Link
        to='/post-job'
        className="text-blue-600 hover:underline mt-2 inline-block">
        Post kro abhi 
        </Link>
    </div>
) : (
    jobs.map((job) => (
        <div
        key={job._id}
        onClick={()=> handleJobSelect(job)}
         className={`bg-white rounded-lg shadow p-4 mb-3 cursor-pointer hover:shadow-md transition
                    ${selectedJob?._id === job._id ? 'border-2 border-blue-600' : ''}`}
                
        >
            <h3 className="font-semibold ">{job.title}</h3>
            <p className="text-gray-500 text-sm ">{job.location}</p>
            <div className="flex gap-2 mt-2 ">
                <span className="bg-blue-100 text-blue-60 px-2 py-1 rounded text-xs">
                    {job.jobType }
                </span>
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                    {job.status}
                </span>
            </div>

        </div>
    ))
)}

</div>


{/* Right - Applications */}
<div>
    <h2 className="text-xl font-semibold mb-4 ">
{selectedJob ? `Applications - ${selectedJob.title}` : 'Select the Job '}
    </h2>

{!selectedJob && (
    <div className="bg-white rounded-lg shadow p-6 text-center">

  <p className="text-gray-500">
   Please select the specific job from the left . 
  </p>

    </div>
)}

{appLoading && (
    <div className="text-center py-4 ">
        <p className="text-gray-500">Loading applications...</p>
    </div>
)}


{selectedJob && !appLoading && applications.length === 0 && (
    <div className="bg-white rounded-lg shadow p-6 text-center ">
        <p className="text-gray-500 ">No Job application for it !</p>
    </div>
)}


{applications.map((app) =>(
    <div
    key={app._id} className="bg-white rounded-lg shadow p-4 mb-3 "
    >
        <div className="flex justify-between items-start mb-2 ">
            <div>
        <Link
        to={`/profile/${app.developer?._id}`}
        className="font-semibold text-blue-600 hover:underline">
        {app.developer?.name}
        </Link>
        <p className="text-gray-500">{app.developer?.email}</p>
            </div>
            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(app.status)}`}>
  {updatingId === app._id ? 'Updating...' : app.status}
</span>
        </div>

        {app.coverLetter && (
            <p className="text-gray-600 text-sm mb-3 border-l-4 border-gray-200 pl-3 ">
                {app.coverLetter}
            </p>
        )}

        <p className="text-gray-400 text-xs mb-3 ">
            Applied : {new Date(app.createdAt).toLocaleDateString('en-IN')}
        </p>

    {/* Status Update */}
    <div className="flex gap-2 ">
        <button
        onClick={()=> handleStatusUpdatte(app._id , 'shortlisted')}
        disabled={app.status === 'shortlisted'}
        className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 disabled:opacity-50 "
        >
            Shortlist 
        </button>
        <button
        onClick={()=> handleStatusUpdatte(app._id , 'rejected')}
        disabled={app.status === 'rejected'}
        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 disabled:opacity-50"
        >
            Reject 
        </button>
        <button 
        onClick={()=> handleStatusUpdatte(app._id , 'pending')}
        disabled={app.status === 'pending'}
        className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 disabled:opacity-50"
        >
            Pending 
        </button>
    </div>

    </div>
))}

</div>


</div>
    </div>
 </div>

)

}


export default RecruiterDashboard