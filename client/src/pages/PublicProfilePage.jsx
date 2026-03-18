import { useState , useEffect  } from "react";
import { href, useParams } from 'react-router-dom'
import developerService from '../services/developerService'

function PublicProfilePage(){
    const { userId} = useParams()
const [ profile , setProfile ] = useState(null)
const [ loading , setLoading ] = useState(true)
const [ error , setError] = useState('')


useEffect(()=>{
    const loadProfile = async ()=>{
try{
    const data = await developerService.getProfilebyId(userId)
    setProfile(data.profile)
} catch ( err){
    setError('Profile not found')
}  finally{
    setLoading(false)
}

    }
    loadProfile()
},[userId])

if(loading){
    return(
        <div className="min-h-screen flex items-center justify-center " >
            <p className="text-gray-500">Loading...</p>
        </div>
    )
}

if(error) {
    return (
        <div className="min-h-screen flex items-center justify-center ">
            <p className="text-red-500 ">{error}</p>
        </div>
    )
}


return (
    <div className="min-h-screen bg-gray-100 py-8 ">
        <div className="max-w-3xl mx-auto px-6">


     {/* basic Info */}
     <div className="bg-white rounded-lg shadow p-6 mb-6 ">
        <h1 className="text-3xl font-bold mb-2 ">
            {profile?.user?.name}
        </h1>
        <p className="text-gray-500 mb-4 capitalize">
            {profile?.user?.role}
        </p>

     {profile?.bio && (
        <p className="text-gray-700 mb-4 ">{profile.bio}</p>
     )}


    {/* Skills  */}
    {profile?.skills?.length > 0 && (
        <div className="mb-4">
            <h3 className="font-semibold mb-2 ">Skills </h3>
                <div className="flex flex-wrap gap-2 ">
                {profile.skills.map((skills , index)=>(
                    <span
                    key={index}
                    className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text"
                    >
                        {skills}
                    </span>
                ))}
                </div>
        </div>
    )}


  {/* links */}
  <div className="flex gap-4 ">
    {profile?.github && (

        <a href={profile.github}
          target="_blank"
          className="text-blue-600 hover:underline"
        >
         GitHub
        </a>
    )}

  {profile?.linkedin && (

  <a className="text-blue-600 hover:underline " 
       href={profile.linkedin}
       target="_blank"
  >
    LinkedIn
  </a>

  )}
   
  </div>
     </div>


     {/*Experience */}
     {profile?.experience?.lenght > 0 && (
        <div className="bg-white rounded-lg shadow p-6 mb-6 ">
            <h2 className="text-xl font-semibold mb-4 ">Experince</h2>

{profile.experience.map((exp , index )=>(
    <div key={index} className="border-l-4 border-blue-600 pl-4 mb-4 ">
        <h3 className="font-semibold">{exp.role}</h3>
        <p className="text-gray-600 ">{exp.company}</p>
        <p className="text-gray-400 text-sm ">{exp.duration}</p>
        {exp.description && (
            <p className="text-gray-700 mt-1 ">{exp.description}</p>
        )}
    </div>
))}

        </div>
     )}


     {/* Education  */}
     {profile?.education?.lenght > 0 && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 ">Education</h2>
            {profile.education.map((edu , index)=>{
                <div key={index} className="border-l-4 border-green-500 pl-4 mb-4 ">
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p className="text-gray-600 ">{edu.school}</p>
                    <p className="text-gray-400 text-sm">{edu.year}</p>
                </div>
            })}
        </div>
     )}


        </div>
    </div>
)

}


export default PublicProfilePage 