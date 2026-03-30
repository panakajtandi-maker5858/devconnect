import { useAuth } from '../context/authContext'
import DeveloperDashboard from './DeveloperDashboard'
import RecruiterDashboard from './RecruiterDashboard'
import AdminDashboard from './AdminDashboard'




const DashboardPage = () => {
  const { user } = useAuth()

  if (user?.role === 'developer') {
    return <DeveloperDashboard />
  }

  if (user?.role === 'recruiter') {
    return <RecruiterDashboard />
  }

 if(user?.role === 'admin') {
  return <AdminDashboard></AdminDashboard>
 }

  return null
}

export default DashboardPage
