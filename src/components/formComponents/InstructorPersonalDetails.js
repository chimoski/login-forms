import React,{useState} from 'react'
import './login.scss'



export default function InstructorDetails() {
    
    return (
      <div className='login-container'>
          <h1 className='login-header'>We would love to know more about you</h1>
          <form>
            <div className='username form'>
              <input className='form-input' type="text" placeholder='eg .john'/>
              <label className='form-label'>First Name</label>
            </div>
            <div className='username form'>
              <input className='form-input' type="text" placeholder='eg .Doe'/>
              <label className='form-label'>Last Name</label>
            </div>
            <div className='username form'>
              <input className='form-input' type="text" placeholder='University of'/>
              <label className='form-label'>University</label>
            </div>
            <div className='username form'>
              <input className='form-input' type="text" placeholder='eg.Civil Engr'/>
              <label className='form-label'>Course of study</label>
            </div>
            <div className='username form'>
              <input className='form-input' type="text" placeholder='080xxxx'/>
              <label className='form-label'>Phone Number</label>
            </div>
            <button className='sign-up-btn'>Done</button>
          </form>
      </div>
    )
  }