import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import SignUp from './pages/auth/SignUp'
import AdminHome from './pages/admin/AdminHome'
import { States } from './contexts/States'
import AuthLayout from './layouts/AuthLayout'
import AdminLayout from './layouts/AdminLayout'
import StudentLayout from './layouts/StudentLayout'
import TestLayout from './layouts/TestLayout'
import Tests from './pages/student/Tests'
import Test from './pages/student/Test'
function App() {

  return (
    <>
      <BrowserRouter basename='VitalProfileClient' >
        <States>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/admin' element={<AdminLayout />}>
              <Route index element={<AdminHome />} />
              <Route path='dashboard' element={<Home />} />
            </Route>
            <Route path='/student' element={<StudentLayout />}>
              <Route index element={<Home />} />
              <Route path='tests' element={<Tests />} />
            </Route>
            <Route path='/test' element={<TestLayout />}>
              <Route path=':tid' element={<Test />} />
            </Route>
            <Route element={<AuthLayout />}>
              <Route path='/login' element={<Login />} />
              <Route path='/signUp' element={<SignUp />} />
            </Route>
          </Routes>
        </States>
      </BrowserRouter>
    </>
  )
}

export default App
