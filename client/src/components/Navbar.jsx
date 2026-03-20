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

        {/* Logo */}
    <Link to='/' className='text-xl font-bold '>
    Devconnect 
    </Link>

    {/* Links  */}
  <div className='flex items-center gap-14 '>
    {user? (
     <>
     <span className='text-sm capitalize'>
      Hey , {user.name}!
     </span>

     {/* Jobs Link — dono ke liye */}
     <Link to='/jobs' className='hover:underline'>
       Jobs
     </Link>

     <Link to='/dashboard' className='hover:underline'>
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
        <>
        {/* Jobs Link — logged out ke liye bhi */}
        <Link to='/jobs' className='hover:underline'>
          Jobs
        </Link>
        
        <Link to="/login" className='hover:underline'>
        Login
        </Link>

        <Link to="/register" 
        className='bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100'>
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