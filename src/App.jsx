import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import SignUp from './pages/auth/SignUp'
import { States } from './contexts/States'
function App() {

  return (
    <>
      <BrowserRouter basename='VitalProfileClient'>
        <States>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Home />} />
            <Route path='/signUp' element={<SignUp />} />
          </Routes>
        </States>
      </BrowserRouter>
    </>
  )
}

export default App
