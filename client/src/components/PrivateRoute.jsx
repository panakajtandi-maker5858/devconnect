import { useAuth } from "../context/authContext";
import { Navigate } from 'react-router-dom'
import Spinner from './Spinner'


const PrivateRoute = ({ children })=>{

    const { user , loading } = useAuth()

    // Auth is checking , please wait 

if(loading){
return (
    
    <Spinner></Spinner>

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