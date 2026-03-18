import { Link , useNavigate} from 'react-router-dom'
import { useAuth } from '../context/authContext'

const Navbar = ()=>{

const { user , logout } = useAuth()
const navigate = useNavigate()

const handlelogout = ()=>{

logout()
navigate('/login')
}


return(

<nav className='bg-blue-600 text-white px-6 py-4 '>
    <div className='max-w-6xl mx-auto flex justify-between items-center'>

        {/* LoGo */}

    <Link to='/' className='text-xl font-bold '>
    Devconnect 
    </Link>


    {/* Links  */}

  <div className='flex items-center gap-14 '>
    {user? (
        // Logged in hone par 

     <>

     <span className='text-sm  capitalize'>
      Hey , {user.name}!
     </span>

     <Link to='/dashboard'
     className='hover:underline'>
     Dashboard
     </Link>

    {/* Role ke hisaab se profile link */}
    
    {user.role === 'developer' && (
      <Link to='/developer/profile' className='hover:underline'>
        My Profile
      </Link>
    )}

    {user.role === 'recruiter' && (
      <Link to='/recruiter/profile' className='hover:underline'>
        Company Profile
      </Link>
    )}


    <button
    onClick={handlelogout}
    className='bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100'
    >
        Logout 
    </button>

     </>

    ):(

        // Logout hone par 
        <>
        
        <Link
        to="/login"
        className='hover:underline'>
        Login
        </Link>

        <Link to="/register" 
        className='bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100'  >
        Register 
        </Link>
        </>


    )}
  </div>


    </div>
</nav>


)

}

export default Navbar