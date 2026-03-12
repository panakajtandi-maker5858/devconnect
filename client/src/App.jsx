import React from 'react'
import { BrowserRouter , Routes , Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'

const App = () => {
  return (
  
  <>
  
  <BrowserRouter>
  <Routes>

<Route path='/' element={<HomePage/>}></Route>
<Route path='/register' element={<RegisterPage/>} ></Route>
<Route path='/login' element={<LoginPage/>}></Route>
<Route path='/dashboard' element={<DashboardPage/>}></Route>

  </Routes>
  </BrowserRouter>
  
  </>
  )
}

export default App
