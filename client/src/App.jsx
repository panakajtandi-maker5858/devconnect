import React from 'react'
import { BrowserRouter , Routes , Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import { AuthProvider } from './context/authContext'
import PrivateRoute from './components/PrivateRoute'
import RoleRoute from './components/RoleRoute'
import Navbar from './components/Navbar'
import PublicRoute from './components/PublicRoute'
import DeveloperProfilePage from './pages/DeveloperProfilePage'
import RecruiterProfilePage from './pages/RecruiterProfilePage'
import PublicProfilePage from './pages/PublicProfilePage'







const App = () => {
  return (
  
  <>
  
  <AuthProvider>
  <BrowserRouter>
  <Navbar/>
  <Routes>

<Route path='/' element={<HomePage/>}></Route>
<Route path='/register' element={
  <PublicRoute>
  <RegisterPage/>
  </PublicRoute>
  } ></Route>
<Route path='/login' element={
  <PublicRoute>
  <LoginPage/>
  </PublicRoute>
  }></Route>

{/* Private Route — sirf logged in users */}

<Route path='/dashboard' element={
  <PrivateRoute>
  <DashboardPage></DashboardPage>
  </PrivateRoute>
  }></Route>
  
  {/* Route for developer */}
  <Route path='/developer/profile' element={
    <PrivateRoute>
      <DeveloperProfilePage/>
    </PrivateRoute>
  }/>

  {/* route for recruiter */}
<Route path='/recruiter/profile' element={
  <PrivateRoute>
    <RecruiterProfilePage/>
  </PrivateRoute> }>
</Route>

<Route path='/profile/:userId' element={<PublicProfilePage/>}></Route>


  </Routes>
  </BrowserRouter>
  </AuthProvider>
  
  </>
  )
}

export default App
