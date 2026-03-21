import { useState } from "react";
import { useNavigate } from "react-router-dom";
import jobService from '../services/jobService'


function PostJobPage () {
const navigate = useNavigate()

const [formData , setformData ] = useState({
    title: '' ,
    description : '' ,
    location : '' ,
    jobType : 'onsite' ,
    salaryMin : '' ,
    salaryMax : '' ,
    skillsRequired :'',
    experienceLevel : 'fresher' ,
    deadline: ''

})

const [ loading , setLoading ] = useState(false)
const [error , setError] = useState('')

const handleChange = (e)=>{
    setformData({ ...formData , [e.target.name] : e.target.value})
}

const handleSubmit = async (e)=>{
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
        await jobService.createJob(formData)
        navigate('/dashboard')
    } catch(err) {
        setError(err.response?.data?.message || 'Something went wrong ') 
    } finally {
        setLoading(false)
    }
}


return (
    <div className="min-h-screen bg-gray-100 py-8 ">
        <div className="max-w-3xl mx-auto px-6 ">

<h1 className="text-3xl font-bold mb-6 "> Post a job </h1>


{error && (
    <div className="bg-red-100 text-red-600 p-3 rounded mb-4 ">
        {error}
    </div>
)}

<form onSubmit={handleSubmit}>
    <div className="bg-white rounded-lg shadow p-6 mb-6 ">


        <div className="mb-4 ">
            <label className="block text-gray-700 mb-2 ">Job Title </label>
            <input type="text"
             name="title"
             value={formData.title}
             onChange={handleChange}
             className="w-full border rounded p-2 "
             placeholder="e.g. Frontend Developer"
             required
            />

        </div>

      <div className='mb-4'>
              <label className='block text-gray-700 mb-2'>Description *</label>
              <textarea
                name='description'
                value={formData.description}
                onChange={handleChange}
                className='w-full border rounded p-2'
                rows={4}
                placeholder='Enter your Job description...'
                required
              />
            </div>

          <div className='grid grid-cols-2 gap-4 mb-4'>
              <div>
                <label className='block text-gray-700 mb-2'>Location</label>
                <input
                  type='text'
                  name='location'
                  value={formData.location}
                  onChange={handleChange}
                  className='w-full border rounded p-2'
                  placeholder='e.g. Bangalore'
                />
              </div>

              <div>
                <label className='block text-gray-700 mb-2'>Job Type</label>
                <select
                  name='jobType'
                  value={formData.jobType}
                  onChange={handleChange}
                  className='w-full border rounded p-2'
                >
                  <option value='onsite'>Onsite</option>
                  <option value='remote'>Remote</option>
                  <option value='hybrid'>Hybrid</option>
                </select>
              </div>
              </div>


              <div className='grid grid-cols-2 gap-4 mb-4'>
              <div>
                <label className='block text-gray-700 mb-2'>Min Salary</label>
                <input
                  type='number'
                  name='salaryMin'
                  value={formData.salaryMin}
                  onChange={handleChange}
                  className='w-full border rounded p-2'
                  placeholder='e.g. 50000'
                />
              </div>

              <div>
                <label className='block text-gray-700 mb-2'>Max Salary</label>
                <input
                  type='number'
                  name='salaryMax'
                  value={formData.salaryMax}
                  onChange={handleChange}
                  className='w-full border rounded p-2'
                  placeholder='e.g. 80000'
                />
              </div>
            </div>


              <div className='mb-4'>
              <label className='block text-gray-700 mb-2'>
                Skills Required (comma separated)
              </label>
              <input
                type='text'
                name='skillsRequired'
                value={formData.skillsRequired}
                onChange={handleChange}
                className='w-full border rounded p-2'
                placeholder='JavaScript, React, Node.js'
              />
            </div>

            <div className='grid grid-cols-2 gap-4 mb-4'>
              <div>
                <label className='block text-gray-700 mb-2'>Experience Level</label>
                <select
                  name='experienceLevel'
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  className='w-full border rounded p-2'
                >
                  <option value='fresher'>Fresher</option>
                  <option value='junior'>Junior</option>
                  <option value='senior'>Senior</option>
                </select>
              </div>

              <div>
                <label className='block text-gray-700 mb-2'>Deadline</label>
                <input
                  type='date'
                  name='deadline'
                  value={formData.deadline}
                  onChange={handleChange}
                  className='w-full border rounded p-2'
                />
              </div>
            </div>


    </div>

<button
            type='submit'
            disabled={loading}
            className='w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50'
          >
            {loading ? 'Posting...' : 'Post Job'}
          </button>

</form>


        </div>
    </div>
)

}



export default PostJobPage