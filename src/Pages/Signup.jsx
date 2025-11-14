import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserAuth } from '../context/Userauthcontext';
import Alert from '@mui/material/Alert'
import log from '../assets/log.png'

function Signup() {

    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[error,setError]=useState("")
    const {signUp} =useUserAuth()
    const navigate = useNavigate()

    const handleSubmit=async (e)=>{
   e.preventDefault();
   setError("")
   try{
   await signUp(email,password);
   navigate("/login")
   }
   catch (err){
    setError(err.message)
   }
   
    };
  return (
    <>
      <div className="log">
       <div className="container">
        <div className="row">
            <div className="col-6 mt-5">
              <h1 className="fw-bolder " 
                style={{fontFamily:'Brush Script MT, Brush Script Std, cursive',fontSize:'30px',marginLeft:'10px'}}
                >Smart habit tracker</h1>
                <img src={log} height={'650px'} alt="" className='mt-1' />
            </div>
            <div className="col-6"  style={{marginTop:'200px'}}>
                 <div className="card w-75 d-flex align-items-center p-4 ms-5">
            <h2 className='text-center fw-bold'>GET STARTED </h2>
            {error &&   <Alert variant='danger'>{error}</Alert> }
          
          <form action="" className='w-75' onSubmit={handleSubmit}>
              <input type="text" className='form-control mt-3' placeholder='enter your email'
              onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" className='form-control mt-3' placeholder='enter your password'
            onChange={(e)=>setPassword(e.target.value)}/>
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
