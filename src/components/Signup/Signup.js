import { createUserWithEmailAndPassword,updateProfile } from '@firebase/auth'
import { doc, setDoc } from '@firebase/firestore'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { auth, db } from '../../Firebase/Config'
import backround from '../../images/Background.jpg'
import NavBar from '../NavBar/NavBar'
import './Signup.css'
function Signup() {
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [mobile, setmobile] = useState('')
    const [password, setpassword] = useState('')
    const [conformpassword, setconformpassword] = useState('')
   const Navigate=useNavigate()    
   var handlesubmit=async(e)=>{
       e.preventDefault()
       if(password===conformpassword){
          const user=await createUserWithEmailAndPassword(auth,email,password)
          updateProfile(auth.currentUser,{displayName:name})
          setDoc(doc(db,'users',`${user.user.uid}`),{uid:user.user.uid,name,email,mobile})
          console.log(user)
          alert('succesfully login')
          Navigate('/login')
       }else{
           alert('invalid password')
       }
   }
    return (
        <div>
            <div className="signup-page" style={{ backgroundImage: `url(${backround})` }}>
            <NavBar/>
                <div className="signup-container">
                    <div className="signup">
                        <form onSubmit={handlesubmit}>
                            <h1 className='signup-tittle'>Sign Up</h1>
                            <input type="text"
                                id='name'
                                name='name'
                                value={name}
                                onChange={(e)=>setname(e.target.value)}
                                placeholder='Name'
                                required

                            />
                           
                            <input type="email"
                                id='email'
                                name='email'
                                value={email}
                                onChange={(e)=>setemail(e.target.value)}
                                placeholder='Email'
                                required
                            />
                          
                            <input type="number"
                                id='mobile'
                                name='mobile'
                                value={mobile}
                                onChange={(e)=>setmobile(e.target.value)}
                                placeholder='Mobile Number'
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
                     
                            <input type="password"
                                id='conformpassword'
                                name='conformtpassword'
                                value={conformpassword}
                                onChange={(e)=>setconformpassword(e.target.value)}
                                placeholder='Conform Password'
                                required
                            />
                            <input style={{marginLeft:'15%'}} className='signup-btn' type="submit" value='SignUp' />
                            <p style={{marginLeft:'11%'}}>Already have an account? <span 
                            onClick={()=>Navigate('/login')} className='Login-now'>Login Now</span></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
