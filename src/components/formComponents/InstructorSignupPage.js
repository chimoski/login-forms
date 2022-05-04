import React,{useState} from 'react'
import './login.scss'
import {AiFillEyeInvisible} from 'react-icons/ai'
import {AiFillEye} from 'react-icons/ai'
import {FcGoogle} from 'react-icons/fc'
import {GrFacebook} from 'react-icons/gr'
import{Link} from 'react-router-dom'


export default function InstructorSignupPage(props) {
    const [showPassword, setShowPassword] =useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =useState(false);

    
    const togglePassword =(e)=>{
      e.preventDefault();
      setShowPassword(!showPassword);
    }

    const toggleConfirmPassword =(e)=>{
        e.preventDefault();
        setShowConfirmPassword(!showConfirmPassword);
      }

      const toInstructor = (e)=>{
        e.preventDefault();
       props.student()
    }

    const toStudent = (e)=>{
      e.preventDefault();
     props.instructor()
  }
  return (
    
   <>
    <div>
        <div className='login-container'>
    <h1 className='login-header'>Welcome to Paralearn </h1>
    <div className='login-router'>
            <button  className='login-router-inactive' onClick={toInstructor}>Student</button>
            <button  className='login-router-active' onClick={toStudent}>Instructor</button>
        </div>
    <form>
      <div className='password form'>
        <input className='form-input' type={showPassword?'text':'password'} placeholder='8 + characters'/>
        <label className='form-label'>Password</label>
        <button onClick={togglePassword} className='eye'>
         {showPassword ?
        <AiFillEye />:<AiFillEyeInvisible />}
        </button>
      </div>

      <div className='password form'>
        <input className='form-input' type={showConfirmPassword?'text':'password'} placeholder='8 + characters'/>
        <label className='form-label'>Confirm Password</label>
        <button onClick={toggleConfirmPassword} className='eye'>
         {showConfirmPassword ?
        <AiFillEye />:<AiFillEyeInvisible />}
        </button>
      </div>
    <div className='auth'>
    <Link to={'/signup/instructor'} className='login-btn sign-up-btn'>Sign Up</Link>
      <p>or Sign Up with</p>
      <div className='icons'>
        <FcGoogle />
        <GrFacebook style={{color: '#395185'}}/>
      </div>
     <div>
     <p>Already have an account? </p>
     <button className='signup-btn'>Login!!!</button>
     </div>
    </div>
    </form>
</div>
    </div>
   </>
  )
}
