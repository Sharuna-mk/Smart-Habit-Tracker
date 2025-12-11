import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserAuth } from '../context/Userauthcontext';
import log from '../assets/log.png'
import { Alert } from 'react-bootstrap';


function Signup() {

    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[confirmpassword,setConfirmPassword]=useState("");
    const[error,setError]=useState("")
    const {signUp} =useUserAuth()
    const navigate = useNavigate()

    const handleSubmit=async (e)=>{
   e.preventDefault();
   setError("")
   if(password === confirmpassword){

  try{
   await signUp(email,password);
   navigate("/login")
   }
   catch (err){
    setError(err.message)
   }
   
   }
 
    };
  return (
    <>
      <div className="log">
       <div className="container">
        <div className="row">
            <div className="col-6 mt-5">
             <h1 className="fw-bolder text-start ms-5"
                                style={{ fontFamily: 'Roboto', fontSize: '25px', color: '#2563eb' }}
                            >Smart habit tracker</h1>
                <img src={log} height={'600px'} alt="" className='mt-1' />
            </div>
            <div className="col-6"  style={{marginTop:'200px'}}>
                 <div className="card w-75 d-flex align-items-center p-4 ms-5">
            <h3 className='text-center fw-bolder text-primary'>GET STARTED </h3>
            {error &&   <Alert variant='danger'>{error}</Alert> }
          
          <form action="" className='w-75' onSubmit={handleSubmit}>
              <input type="text" className='form-control mt-4' placeholder='enter your email'
              onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" className='form-control mt-4' placeholder='enter password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}/>
            <input type="password" className='form-control mt-4' placeholder='Confirm Password' value={confirmpassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}/>

            {
             password && confirmpassword && password === confirmpassword &&
             <div>
              <p className='text-success' >✅Password Match </p>
              </div>
              
            }

            {
             password && confirmpassword &&  password !== confirmpassword &&
             <div>
              <p className='text-danger' >❌ Passwords do not match</p>
              </div>
              
            }
              <div className='d-flex align-items-center justify-content-center'>
                <button className='btn mt-4 fw-bold text-light ' style={{backgroundColor:'#355cfaff'}}>
            SignUp
           </button>
            </div>
          </form>
             <p  className='mt-3'>already have an account? <Link to={'/login'}>Log In</Link></p>
          
        </div>
            </div>
        </div>
       </div>
       </div>
    </>
  )
}

export default Signup
