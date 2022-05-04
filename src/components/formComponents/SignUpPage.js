

import React, { Component } from 'react'
import StudentSignupPage from './StudentSignupPage'
import InstructorSignupPage from './InstructorSignupPage'

export default class SignUpPage extends Component {
    state = {
        step:1
    }

    student =()=>{
        this.setState({step:1})
    }
    instructor =()=>{
        this.setState({step:2})
    }

    
  render() {
      const {step} = this.state

      switch (step) {
         case 1:
              return(
                  <StudentSignupPage
                  student={this.student}
                  instructor={this.instructor} />
              )
         case 2:
                return(
                    <InstructorSignupPage
                    student={this.student}
                    instructor={this.instructor} />
                )
                
      }
  }
}

