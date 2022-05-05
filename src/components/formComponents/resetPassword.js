import { sendPasswordReset } from "../../firebase"
import { useState } from "react"
import { useNavigate } from "react-router-dom";


const ResetPassword = () => {
    let history = useNavigate()
    const [email, setEmail] = useState("");
    const handlePasswordReset = (e) => {
        e.preventDefault()
        setEmail("")
        if (email === "") {
            alert("please enter an email")
        } else {
            sendPasswordReset(email).then((response) => {
                console.log(response.status)
                if (response.status === "error") {
                    alert(response.message)
                } else {
                    alert("Password reset email sent!")
                    history("/login")
                }
            })
            //
        }
    }

    return (
        <div className='login-container'>
        <h1 className='login-header'>Reset Password</h1>
        <form onSubmit={(e) => handlePasswordReset(e)}>
          <div className='username form'>
            <input className='form-input'
             type="text"
          placeholder='eg .jhn@gmail.com' value={email} onChange={(e) => setEmail(e.currentTarget.value)}/>
            <label className='form-label'>Email Address</label>
          </div>
          <button className='sign-up-btn'>Reset</button>
        </form>
        </div>
    )
}

export default ResetPassword