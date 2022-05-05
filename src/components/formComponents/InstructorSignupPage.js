import React,{useState,useEffect} from 'react'
import './login.scss'
import {AiFillEyeInvisible} from 'react-icons/ai'
import {AiFillEye} from 'react-icons/ai'
import {FcGoogle} from 'react-icons/fc'
import { useAuthState } from "react-firebase-hooks/auth";
import {GrFacebook} from 'react-icons/gr'
import{ useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom'
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase";


export default function InstructorSignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("")
  const [user, loading, error] = useAuthState(auth);
  const history = useNavigate();

  
  const register = (e) => {
    e.preventDefault()
    console.log("hola")
    let formErrors = false
    console.log(formErrors)

    if (!email) {
      alert("Please enter email"); 
      formErrors = true
    }
    console.log(email)
    console.log(formErrors)

    if(confirmPassword!==password) {
      alert("Please make sure that the passwords match");
      formErrors = true
    }

    console.log(formErrors)
    if (!formErrors) {
      console.log(registerWithEmailAndPassword( email, password))
    }
  };

  useEffect(() => {
    if (loading) return;
    if (user) history("/signup/instructor", {replace: true});
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
    <div>
        <div className='login-container'>
    <h1 className='login-header'>Welcome to Paralearn </h1>
    <div className='login-router'>
            <button  className='login-router-inactive' onClick={toInstructor}>Student</button>
            <button  className='login-router-active' onClick={toStudent}>Instructor</button>
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
        <input className='form-input'  onChange={(e)=> setPassword(e.target.value)} type={showPassword?'text':'password'} placeholder='8 + characters'/>
        <label className='form-label'>Password</label>
        <button onClick={togglePassword} className='eye'>
         {showPassword ?
        <AiFillEye />:<AiFillEyeInvisible />}
        </button>
      </div>

      <div className='password form'>
        <input className='form-input'  onChange={(e)=> setConfirmPassword(e.target.value)} type={showConfirmPassword?'text':'password'} placeholder='8 + characters'/>
        <label className='form-label'>Confirm Password</label>
        <button onClick={toggleConfirmPassword} className='eye'>
         {showConfirmPassword ?
        <AiFillEye />:<AiFillEyeInvisible />}
        </button>
      </div>
    <div className='auth'>
    <button type='submit' onClick={register} className='login-btn sign-up-btn'>Sign up</button>
      <p>or Sign Up with</p>
      <div className='icons'>
        <FcGoogle onClick={signInWithGoogle} />
        <GrFacebook style={{color: '#395185'}}/>
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
