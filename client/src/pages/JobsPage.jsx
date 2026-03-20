import { useState , useEffect } from "react";
import { Link  } from 'react-router-dom'
import jobService from "../services/jobService";


function JobPage () {

const [ jobs ,setJobs ] = useState([])
const [ loading , setLoading] = useState(false)
const [  error , setError ] = useState('')

// FILTER STATES 
const [ keyword , setKeyword] = useState('')
const [ location , setLocation] = useState('')
const [ jobType , setJobType ] = useState('')
const [ experienceLevel , setExperienceLevel] = useState('')

// Pagination status
const [ page , setPage ] = useState(1)
const [ totalPages , setTotalPages ] = useState(1)
const [ total , setTotal ] = useState(0)


// JOBS FETCH KARNA 

const fetchJobs = async ()=>{
setLoading(true)
setError('')


try {
    const params = { page , limit : 10 }


if(keyword) params.keyword = keyword
if(location) params.location= location 
if(jobType) params.jobType = jobType
if(experienceLevel) params.experienceLevel = experienceLevel

const data = await jobService.getAllJobs(params)
setJobs(data.jobs)
setTotalPages(data.totalPages)
setTotal(data.total)


} catch(err) {
    setError('Jobs loading is failed ')
} finally {
    setLoading(false)
}   

}


// FILTER ya page change hone par fetch karo
useEffect(() =>{
    fetchJobs()
} , [page , jobType , experienceLevel])


// SEARCH SUBMIT 
const handleSearch = (e) =>{
e.preventDefault()
setPage(1)
fetchJobs()

}

// Filter reset 
const handleReset = ()=>{
    setKeyword('')
    setLocation('')
    setJobType('')
    setExperienceLevel('')
    setPage(1)
}



return (

<div className="min-h-screen bg-gray-100 py-8 ">
    <div className="max-w-6xl mx-auto px-6 ">

<h1 className="text-3xl font-bold mb-6 ">Browse Jobs</h1>

{/* Search aur Filter Bar  */}
<form  onSubmit={handleSearch}>
<div className="bg-white rounded-lg shadow p-4 mb-6 ">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 ">

        <input type="text"
        placeholder="Search by title..."
        value={keyword}
        onChange={(e)=>{
             setKeyword(e.target.value)}}
             className="border rounded p-2 "
        />

    <input type="text"
    placeholder="Location..."
    value={location}
    onChange={(e)=> setLocation(e.target.value)}
    className="border rounded p-2 "
    />

    <select  
    value={jobType}
    onChange={(e)=> setJobType(e.target.value)}
    className="border rounded p-2 "
    >

 <option value="">All Job Types</option>
 <option value="remote">Remote</option>
 <option value="onsite">Onsite</option>
 <option value="hybrid">Hybrid</option>

    </select>

    <select 
    value={experienceLevel}
    onChange={(e)=> setExperienceLevel(e.target.value)}
    className="border rounded p-2"
    >
        <option value="">All Levels</option>
        <option value="fresher">Fresher</option>
        <option value="junior">Junior</option>
        <option value="senior">Senior</option>

    </select>

    </div>

<div className="flex gap-3 ">
    <button
    type="submit"
    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
    >
        Search
    </button>
    <button 
    type="button"
    onClick={handleReset}
    className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300"
    >
        Reset
    </button>
</div>

</div>
</form>


{/* Total Results  */}
<p className="text-gray-600 mb-4">
    {total} job found
</p>

{/* Loading */}
{loading && (
    <div className="text-center py-10">
        <p className="text-gray-500 ">Loading jobs...</p>
    </div>
)}

{/* Error  */}
{error && (
    <div className="bg-red-100 text-red-600 p-3 rounded mb-4 ">
    {error}
    </div>
)}


{/* Jobs List */}
{!loading && jobs.length === 0 && (
    <div className="text-center py-10 ">
        <p className="text-gray-500 ">No job available</p>
    </div>
)}



<div className="grid gap-4 ">
    
{jobs.map((job)=>(
    <div key={job._id} className="bg-white rounded-lg shadow p-6 ">

<div className="flex justify-between items-start mb-3 ">
<div>
    <h2 className="text-xl font-semibold ">{job.title}</h2>
    <p className="text-gray-500">
        {job.recruiter?.name}
    </p>
</div>
<span className={`px-3 py-1 rounded-full text-sm font-medium capitalize
                  ${job.jobType === 'remote' ? 'bg-green-100 text-green-600' :
                    job.jobType === 'hybrid' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-blue-100 text-blue-600'}`}>
    {job.jobType}
</span>
</div>

<div className="flex gap-4 text-gray-500 text-sm mb-3 ">
    {job.location && (
        <span>📍 {job.location}</span>
    )}

{job.salaryMin && job.salaryMax && (
    <span>💰 ₹{job.salaryMin} - ₹{job.salaryMax}</span>
)}  

<span>🎯 {job.experienceLevel}</span>

</div>

{/* Skills */}
{job.skillsRequired?.length > 0 && (
    <div className="flex flex-wrap gap-2 mb-4">
        {job.skillsRequired.map((skill , index )=>(
            <span
            key={index}
            className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm "
            >
                {skill}
            </span>
        ))}
    </div>
)}

<div className="flex justify-between items-center">
    <span className="text-gray-400 text-sm ">
      {job.createdAt ? new Date(job.createdAt).toLocaleDateString('en-IN') : ''}  
    </span>
    <Link
    to={`/jobs/${job._id}`}
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
    View Details 
    </Link>
</div>

    </div>
))}
    
</div>


{/* Pagination  */}
{totalPages > 1 && (
    <div className="flex justify-center gap-3 mt-8 ">
        <button
        onClick={()=> setPage(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 bg-white rounded shadow disabled:opacity-50 hover:bg-gray-50"
        >
            Previous 
        </button>

<span className="px-4 py-2 bg-blue-600 text-white rounded">
    {page} / {totalPages}
</span>

<button
onClick={()=> setPage(page + 1 )}
disabled={page === totalPages}
className="px-4 py-2 bg-white rounded shadow disabled:opacity-50 hover:bg-gray-50"
>
    Next
</button>
    </div>
)}


    </div>
</div>


)
}


export default JobPage