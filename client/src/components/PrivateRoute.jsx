import { useAuth } from "../context/authContext";
import { Navigate } from 'react-router-dom'


const PrivateRoute = ({ children })=>{

    const { user , loading } = useAuth()

    // Auth is checking , please wait 

if(loading){
return (

<div className=" min-h-screen flex justify-center items-center ">
    <p className="text-gray-500 text-lg ">Loading...</p>

</div>

)
}

// User login nhi hua , login page pe redirect kro 

if(!user){
    return <Navigate to="/login"></Navigate>
}

// User logged in hai  - page dikhao
 
return children




}

export default PrivateRoute 