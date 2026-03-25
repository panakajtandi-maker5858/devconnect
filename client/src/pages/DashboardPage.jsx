import { useAuth } from '../context/authContext'
import DeveloperDashboard from './DeveloperDashboard'
import RecruiterDashboard from './RecruiterDashboard'

const DashboardPage = () => {
  const { user } = useAuth()

  if (user?.role === 'developer') {
    return <DeveloperDashboard />
  }

  if (user?.role === 'recruiter') {
    return <RecruiterDashboard />
  }

  return null
}

export default DashboardPage
