import { useAuth } from "../context/authContext"; 
import { Navigate } from "react-router-dom";
import Spinner from './Spinner'

const PublicRoute = ({ children })=>{

    const { user , loading } = useAuth()

if(loading){
    return <Spinner/>
}

if(user){
    return <Navigate to='/dashboard' />
}

return children


}


export default PublicRoute