import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";

const RoleRoute = ({ children , role })=>{

    const { user , loading } = useAuth()


if(loading){
    return (
        <div className="min-h-screen flex items-center justify-center ">
            <p className="text-gray-500 text-lg "> Loading...</p>
        </div>
    )
}

// User logged in nahi 
if(!user){
    return <Navigate to='/login'></Navigate>
}

// Role match nhi karta 
if(user.role !== role ){
    return <Navigate to='/dashboard'></Navigate>
}

return children 


}

export default RoleRoute