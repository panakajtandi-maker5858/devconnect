import { useEffect, useState } from "react"
import developerService from '../services/developerService'
import api from '../services/api'

function DeveloperProfilePage() {

  const [formData, setFormData] = useState({
    bio: '',
    skills: '',
    github: '',
    linkedin: '',
    website: ''
  })

  const [experience, setExperience] = useState([])
  const [education, setEducation] = useState([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
const [ profilePicture , setProfilePicture ] = useState('')
const [ imageLoading , setImageLoading] = useState(false)





  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await developerService.getMyProfile()
        const p = data.profile
        setFormData({
          bio: p.bio || '',
          skills: p.skills ? p.skills.join(', ') : '',
          github: p.github || '',
          linkedin: p.linkedin || '',
          website: p.website || ''
        })
        setExperience(p.experience || [])
        setEducation(p.education || [])
        setProfilePicture(p.profilePicture || '')
      } catch (err) {
        // Profile nahi hai — theek hai
      }
    }
    loadProfile()
  }, [])




  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }



  // IMAGE UPLOAD FUNCTION 
 const handleImageUpload = async (e) =>{
  const file = e.target.files[0]
  if(!file) return
  setImageLoading(true)


try {
  const formData = new FormData()
  formData.append('image' , file )

const response = await api.post('/upload/profile-picture' , formData , {
  headers :{
    'Content-Type' : 'multipart/form-data'
  }
})

setProfilePicture(response.data.imageUrl)

} catch(err) {
  setError('Image uploaded failed')
}  finally {
  setImageLoading(false)
}

 }




  const addExperience = () => {
    setExperience([...experience, {
      company: '',
      role: '',
      duration: '',
      description: ''
    }])
  }

  const updateExperience = (index, field, value) => {
    const updated = experience.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    )
    setExperience(updated)
  }

  const removeExperience = (index) => {
    setExperience(experience.filter((_, i) => i !== index))
  }

  const addEducation = () => {
    setEducation([...education, {
      school: '',
      degree: '',
      year: ''
    }])
  }

  const updateEducation = (index, field, value) => {
    const updated = education.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    )
    setEducation(updated)
  }

  const removeEducation = (index) => {
    setEducation(education.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      await developerService.updateProfile({
        ...formData,
        experience,
        education
      })
      setSuccess('Profile updated successfully!')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gray-100 py-8'>
      <div className='max-w-3xl mx-auto px-6'>

        <h1 className='text-3xl font-bold mb-6'>My Profile</h1>

        {success && (
          <div className='bg-green-100 text-green-600 p-3 rounded mb-4'>
            {success}
          </div>
        )}

        {error && (
          <div className='bg-red-100 text-red-600 p-3 rounded mb-4'>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

        {/* Profile Picture */}
        <div className="bg-white rounded-lg shadow p-6 mb-6 ">
          <h2 className="text-xl font-semibold mb-4 ">Profile Picture</h2>

        <div className="flex items-center gap-6">

       {/* Image preview */}
       <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
        {profilePicture ? (
          <img
          src={profilePicture}
          alt="Profile"
          className="w-full h-full object-cover"
          ></img>
        ) : (
          <span className="text-gray-400 text-4xl ">👤</span>
        )}

       </div>

       {/* upload button */}
       <div >
        <label className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700" >
          {imageLoading ? 'Uploading...' : 'Choose Photo'}
          <input
           type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          />
        </label>
        <p className="text-gray-400 text-sm mt-2 ">
          JPF , JPEG , PNG allowed
        </p>
       </div>

        </div>

        </div>





          {/* Basic Info */}
          <div className='bg-white rounded-lg shadow p-6 mb-6'>
            <h2 className='text-xl font-semibold mb-4'>Basic Info</h2>

            <div className='mb-4'>
              <label className='block text-gray-700 mb-2'>Bio</label>
              <textarea
                name='bio'
                value={formData.bio}
                onChange={handleChange}
                className='w-full border rounded p-2'
                rows={3}
                placeholder='Apne baare mein likho...'
              />
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 mb-2'>Skills (comma separated)</label>
              <input
                type='text'
                name='skills'
                value={formData.skills}
                onChange={handleChange}
                className='w-full border rounded p-2'
                placeholder='JavaScript, React, Node.js'
              />
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 mb-2'>GitHub</label>
              <input
                type='text'
                name='github'
                value={formData.github}
                onChange={handleChange}
                className='w-full border rounded p-2'
                placeholder='https://github.com/username'
              />
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 mb-2'>LinkedIn</label>
              <input
                type='text'
                name='linkedin'
                value={formData.linkedin}
                onChange={handleChange}
                className='w-full border rounded p-2'
                placeholder='https://linkedin.com/in/username'
              />
            </div>

          </div>

          {/* Experience */}
          <div className='bg-white rounded-lg shadow p-6 mb-6'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-semibold'>Experience</h2>
              <button
                type='button'
                onClick={addExperience}
                className='bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700'
              >
                + Add
              </button>
            </div>

            {experience.map((exp, index) => (
              <div key={index} className='border rounded p-4 mb-4'>
                <div className='grid grid-cols-2 gap-4 mb-3'>
                  <input
                    type='text'
                    placeholder='Company'
                    value={exp.company}
                    onChange={(e) => updateExperience(index, 'company', e.target.value)}
                    className='border rounded p-2'
                  />
                  <input
                    type='text'
                    placeholder='Role'
                    value={exp.role}
                    onChange={(e) => updateExperience(index, 'role', e.target.value)}
                    className='border rounded p-2'
                  />
                </div>
                <input
                  type='text'
                  placeholder='Duration (e.g. 2 years)'
                  value={exp.duration}
                  onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                  className='w-full border rounded p-2 mb-3'
                />
                <textarea
                  placeholder='Description'
                  value={exp.description}
                  onChange={(e) => updateExperience(index, 'description', e.target.value)}
                  className='w-full border rounded p-2 mb-3'
                  rows={2}
                />
                <button
                  type='button'
                  onClick={() => removeExperience(index)}
                  className='text-red-500 hover:underline text-sm'
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className='bg-white rounded-lg shadow p-6 mb-6'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-semibold'>Education</h2>
              <button
                type='button'
                onClick={addEducation}
                className='bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700'
              >
                + Add
              </button>
            </div>

            {education.map((edu, index) => (
              <div key={index} className='border rounded p-4 mb-4'>
                <div className='grid grid-cols-2 gap-4 mb-3'>
                  <input
                    type='text'
                    placeholder='School/College'
                    value={edu.school}
                    onChange={(e) => updateEducation(index, 'school', e.target.value)}
                    className='border rounded p-2'
                  />
                  <input
                    type='text'
                    placeholder='Degree'
                    value={edu.degree}
                    onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                    className='border rounded p-2'
                  />
                </div>
                <input
                  type='text'
                  placeholder='Year (e.g. 2020-2024)'
                  value={edu.year}
                  onChange={(e) => updateEducation(index, 'year', e.target.value)}
                  className='w-full border rounded p-2 mb-3'
                />
                <button
                  type='button'
                  onClick={() => removeEducation(index)}
                  className='text-red-500 hover:underline text-sm'
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50'
          >
            {loading ? 'Saving...' : 'Save Profile'}
          </button>

        </form>
      </div>
    </div>
  )
}

export default DeveloperProfilePage