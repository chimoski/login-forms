import React,{useState,useEffect} from 'react'
import './login.scss'
import {AiFillEyeInvisible} from 'react-icons/ai'
import {AiFillEye} from 'react-icons/ai'
import {FcGoogle} from 'react-icons/fc'
import {GrFacebook} from 'react-icons/gr'
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase";


export default function StudentSignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("")
  const [user, loading, error] = useAuthState(auth);
  const history = useNavigate();

  const register = () => {
    if (!email) alert("Please enter email");
    if(confirmPassword!==password) alert("Please enter email")
    registerWithEmailAndPassword( email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) history.replace("/login");
  }, [user, loading]);


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
     <div >
     <div className='login-container'>
        <h1 className='login-header'>Welcome to Paralearn</h1>
        <div className='login-router'>
            <button className='login-router-active' onClick={toInstructor}>Student</button>
            <button className='login-router-inactive' onClick={toStudent}>Instructor</button>
        </div>
        <form>
          <div className='username form'>
            <input className='form-input'
             type="text" placeholder='eg .john'
             value={email}
             onChange={(e)=> setEmail(e.target.value)}
             />
            <label className='form-label'>Email Address</label>
          </div>
          <div className='password form'>
            <input className='form-input' type={showPassword?'text':'password'}
             placeholder='8 + characters'
             value={password}
             onChange={(e)=> setPassword(e.target.value)}
             />
            <label className='form-label'>Password</label>
            <button onClick={togglePassword} className='eye'>
             {showPassword ?
            <AiFillEye />:<AiFillEyeInvisible />}
            </button>
          </div>

          <div className='password form'>
            <input className='form-input' type={showConfirmPassword?'text':'password'}
             placeholder='8 + characters'
             value={confirmPassword}
             onChange={(e)=> setConfirmPassword(e.target.value)}
             />
            <label className='form-label'>Confirm Password</label>
            <button onClick={toggleConfirmPassword} className='eye'>
             {showConfirmPassword ?
            <AiFillEye />:<AiFillEyeInvisible />}
            </button>
          </div>
        <div className='auth'>
        <Link onClick={register} to={'/signup/student'} className='login-btn sign-up-btn'>Sign Up</Link>
          <p>or Sign Up with</p>
          <div className='icons'>
            <FcGoogle onClick={signInWithGoogle} style={{cursor:'pointer'}} />
            <GrFacebook style={{color: '#395185',cursor:'pointer'}}/>
          </div>
         <div>
         <p>Already have an account? </p>
         <Link to={'/login'} className='signup-btn'>Login!!!</Link>
         </div>
        </div>
        </form>
    </div>
     </div>
   
      
   </>
  )
}
