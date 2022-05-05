import React from 'react'
import LoginPage from './LoginPage'
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import SignUpPage from './SignUpPage';
import Home from '../Home';
import StudentDetails from './StudentPersonalDetails';
import InstructorDetails from './InstructorPersonalDetails';
import ResetPassword from './resetPassword';
export default function FormPages() {
  return (
      <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/signup' element={<SignUpPage/>} />
          <Route path='/signup/student' element={<StudentDetails/>} />
          <Route path='/signup/instructor' element={<InstructorDetails/>} />
          <Route path="/reset-password" element={<ResetPassword/> } />
        </Routes>
      </Router>
      </>
  )
}
