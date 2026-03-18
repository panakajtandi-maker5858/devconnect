import { useState , useEffect } from "react";
import recruiterService from "../services/recruiterService";


function RecruiterProfilePage (){

const [ formData , setformData] = useState({

    companyName : '',
    companyDescription : '',
    industry : '', 
    website : '',
    location : '' ,
    companySize : '1-10'
})


const [ loading , setLoading ] = useState(false)
const [ success , setSuccess] = useState('')
const [ error , setError ] = useState('')

useEffect(()=>{

const loadProfile = async ()=>{
    try{
        const data = await recruiterService.getMyProfile()
        const p = data.profile 
        setformData({
            companyName : p.companyName || '',
            companyDescription : p.companyDescription || '',
            industry : p.industry || '' ,
            website : p.website || '',
            location : p.location || '',
            companySize :p.companySize || '1-10'
        })
    } catch(err){
        // THERE IS NO PROFILE OK
    }
}

loadProfile()

},[])

const handleChange = (e) =>{
    setformData({ ...formData , [e.target.name]: e.target.value })
}


const handleSubmit = async (e) =>{
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

try {
    await recruiterService.updateProfile(formData)
    setSuccess('Company profile updated successfully !')
} catch(err){
    setError(err.response?.data?.message || "Something went wrong !")
} finally {
    setLoading(false)
}

}
return (

<div className="min-h-screen bg-gray-100 py-8">
    <div className="max-w-3xl mx-auto px-6 ">

<h1 className="text-3xl font-bold mb-6 ">Company Profile</h1>
    
    {success && (
        <div className="bg-green-100 text-green-600 p-3 rounded mb-4">
  {success}
        </div>
    )}

  {error && (
    <div className="bg-red-100 text-red-600 p-3 rounded mb-4 ">
        {error}
    </div>
  )}

  <form onSubmit={handleSubmit}>
<div className="bg-white rounded-lg shadow p-6 mb-6 ">
    <h2 className="text-xl font-semibold mb-4 "> Company Info</h2>

    <div className="mb-4">
        <label className="block text-gray-700 mb-2 ">Company Name *</label>
        <input type="text"
        name="companyName"
        value={formData.companyName}
        onChange={handleChange}
      className="w-full border rounded p-2 "
      placeholder="Enter company name"
     required
        />

    </div>

    <div className="mb-4">
        <label className="block text-gray-700 mb-2 ">Description </label>
        <textarea 
        name="companyDescription" 
        value={formData.companyDescription}
        onChange={handleChange}
        className="w-full border rounded p-2 "
        rows={3}
        placeholder="About your company "
        >
        </textarea>
    </div>

<div className="mb-4 ">
    <label className="block text-gray-700 mb-2">Industry </label>
    <input type="text"
    name="industry"
    value={formData.industry}
    onChange={handleChange}
    className="w-full border rounded p-2"
    placeholder="e.g. Information Technology "
    />
</div>

<div className="mb-4">
    <label className="block text-gray-700 mb-2">Website </label>
    <input type="text"
    name="website"
    value={formData.website}
    onChange={handleChange}
    className="w-full border rounded p-2 "
    placeholder="https://company.com"
    />
</div>

<div className="mb-4 ">
    <label className="block text-gray-700 mb-2 ">Location </label>
    <input type="text"
    name="location"
    value={formData.location}
    onChange={handleChange}
    className="w-full border rounded p-2 "
    placeholder="Enter the location of company "
    />
</div>


<div className="mb-4">
    <label  className="block text-gray-700 mb-2">Company Size</label>
    <select
     name="companySize" 
    value={formData.companySize}
    onChange={handleChange}
    className="w-full border rounded p-2 "
    >

<option value="1-10">1-10</option>
<option value="11-50">11-50</option>
<option value="51-200">51-200</option>
<option value="201-500">201-500</option>
<option value="500+">500+</option>

    </select>
</div>

</div>

<button
type="submit"
disabled={loading}
className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 active:scale-95"
>
{loading? "Saving..." : "Save Profile"}
</button>

  </form>

    </div>
</div>

)
}

export default RecruiterProfilePage