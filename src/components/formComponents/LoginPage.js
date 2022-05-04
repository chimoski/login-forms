import React,{useState,useEffect} from 'react'
import './login.scss'
import {AiFillEyeInvisible} from 'react-icons/ai'
import {AiFillEye} from 'react-icons/ai'
import {BsCheckLg} from 'react-icons/bs'
import {FcGoogle} from 'react-icons/fc'
import {GrFacebook} from 'react-icons/gr'
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if(email || password === '') alert('please Enter your details')
    if (user) navigate("/");
  }, [user, loading]);


  const [showPassword, setShowPassword] =useState(false);
  const[check, setCheck] = useState(false)
  const togglePassword =(e)=>{
    e.preventDefault();
    setShowPassword(!showPassword);
  }
  const checked = (e)=>{
    e.preventDefault();
    setCheck(!check)
  }
  return (
    <div className='login-container'>
        <h1 className='login-header'>Welcome Back</h1>
        <form>
          <div className='username form'>
            <input className='form-input'
             type="text" value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='eg .john'/>
            <label className='form-label'>Email Address</label>
          </div>

          <div className='password form'>
            <input className='form-input'
             type={showPassword?'text':'password'}
              value={password}
          onChange={(e) => setPassword(e.target.value)} 
          placeholder='8 + characters'/>
            <label className='form-label'>Password</label>
            <button onClick={togglePassword} className='eye'>
             {showPassword ?
            <AiFillEye />:<AiFillEyeInvisible />}
            </button>
          </div>

          <div className='form-check'>
            <div>
              <input onClick={checked} className='checkbox' type="checkbox" />
              {check?< BsCheckLg onClick={checked} className='checked' /> : ''}
               <span onClick={checked}>remember me</span>
              </div>
            <p>Forget Password?</p>
          </div>

        <div className='auth'>
        <button className='login-btn'
        onClick={() => logInWithEmailAndPassword(email, password)}
        >Login</button>
          <p>or log in with</p>
          <div className='icons'>
            <FcGoogle style={{cursor:'pointer'}} onClick={signInWithGoogle} />
            <GrFacebook  style={{color: '#395185',cursor:'pointer'}}/>
          </div>
         <div>
         <p>Don't you have an account? </p>
         <Link to={'/signup'} className='signup-btn'>Sign Up!!!</Link>
         </div>
        </div>
        </form>
    </div>
  )
}
