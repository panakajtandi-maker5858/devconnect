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



const App = () => {
  return (
  
  <>
  
  <AuthProvider>
  <BrowserRouter>
  <Navbar/>
  <Routes>

<Route path='/' element={<HomePage/>}></Route>
<Route path='/register' element={<RegisterPage/>} ></Route>
<Route path='/login' element={<LoginPage/>}></Route>

{/* Private Route — sirf logged in users */}

<Route path='/dashboard' element={
  <PrivateRoute>
  <DashboardPage></DashboardPage>
  </PrivateRoute>
  }></Route>

  </Routes>
  </BrowserRouter>
  </AuthProvider>
  
  </>
  )
}

export default App
