import React,{useState} from 'react'
import './login.scss'
import {checkUser} from "../../firebase"
import { useNavigate } from 'react-router-dom';


export default function StudentDetails() {
  let redirect = useNavigate();
  const [firstName , setFirstName] = useState('');
  const [lastName , setLastName] = useState('');
  const [university , setUniversity] = useState('');
  const [course, setCourse] = useState('');
  const [number, setNumber] = useState('')
  const handleclick =(e)=>{
    e.preventDefault();
    if(firstName===''||lastName===''||university===''||course===''||number==='' ){
    return alert('please complete form')
  
    }
    else{
       redirect('/login');
    }

  }

  console.log(checkUser())
    
    return (
      <div className='login-container'>
          <h1 className='login-header'>We would love to know more about you</h1>
          <form>
            <div className='username form'>
              <input className='form-input' onChange={e=>setFirstName(e.target.value)} type="text" placeholder='eg .john'/>
              <label className='form-label'>First Name</label>
            </div>
            <div className='username form'>
              <input className='form-input' type="text" onChange={e=>setLastName(e.target.value)}  placeholder='eg .Doe'/>
              <label className='form-label'>Last Name</label>
            </div>
            <div className='username form'>
              <input className='form-input' type="text" onChange={e=>setUniversity(e.target.value)} placeholder='University of'/>
              <label className='form-label'>University</label>
            </div>
            <div className='username form'>
              <input className='form-input' type="text" onChange={e=>setCourse(e.target.value)} placeholder='eg .Civil Engr'/>
              <label className='form-label'>Course of study</label>
            </div>
            <div className='username form'>
              <input className='form-input' onChange={e=>setNumber(e.target.value)} type="text" placeholder='eg .080xxx'/>
              <label className='form-label'>Phone Number</label>
            </div>

            <button onClick={handleclick} className='sign-up-btn'>Done</button>
          </form>
      </div>
    )
  }