import React, { useState } from 'react'
import {  useNavigate } from 'react-router'
import Background from '../../images/Background.jpg'
import NavBar from '../NavBar/NavBar'
function Login() {
    const [email, setemail] = useState('')
    const[password,setpassword]=useState('')
   const Navigate=useNavigate()
   var handlesubmit=async(e)=>{
       e.preventDefault()
    //   const user=await signInWithEmailAndPassword(auth,email,password).then(()=>{
    //       alert('successfully login')
    //       Navigate('/')
    //   })
   }
    return (
        <div>
        <div className="signup-page" style={{backgroundImage:`url(${Background})`}} >
            <NavBar/>
            <div className="signup-container"  >
                <div className="signup">
                    <form action="" onSubmit={handlesubmit}>
                        <h1 className='signup-tittle'>Sign In</h1>
                        <input type="email"
                            id='email'
                            name='email'
                            value={email}
                            onChange={(e)=>setemail(e.target.value)}
                            placeholder='Email'
                            required
                        />
                        <input type="password"
                            id='password'
                            name='password'
                            value={password}
                            onChange={(e)=>setpassword(e.target.value)}
                            placeholder='Password'
                            required

                        />
                        <input style={{marginLeft:'15%'}} className='signup-btn' type="submit" value='SignIn ' />
                        <p style={{marginLeft:'11%'}}>New to Netflix? <span 
                        onClick={()=>Navigate('/signup')} className='Login-now'>Signup Now</span></p>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Login
