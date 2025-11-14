import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GoogleButton from 'react-google-button'
import { useUserAuth } from '../context/Userauthcontext';
import log from '../assets/log.png'
import { Alert } from 'react-bootstrap';


function Login() {
        const[email,setEmail]=useState("");
        const[password,setPassword]=useState("");
        const[error,setError]=useState("")
        const { logIn,googleSignIn } =useUserAuth()
        const navigate = useNavigate()

    
        const handleSubmit=async (e)=>{
       e.preventDefault();
       setError("")
       try{
       await logIn(email,password);
       navigate("/home")
       }
       catch (err){
        setError(err.message)
       }
       
        };
        const handleGoogleSignIn =async(e)=>{
            e.preventDefault()
            try {
                await googleSignIn();
                navigate("/home")
            } catch (err) {
                setError(err.message)
            }
        }
       const handleReset=()=>{
        navigate("/forgotpassword")
        
       }
  return (
    <>
       <div className="log" >
       <div className="container">
        <div className="row">
            <div className="col-6 mt-5">
                <h1 className="fw-bolder " 
                style={{fontFamily:'Brush Script MT, Brush Script Std, cursive',fontSize:'30px',marginLeft:'10px'}}
                >Smart habit tracker</h1>
                  <img src={log} height={'650px'} alt="" className='mt-1' />
            </div>
            
            <div className="col-6" style={{marginTop:'180px'}}>
                 <div className="card w-75 d-flex align-items-center justify-content-center ms-5 p-4">
            <h2 className='text-center fw-bold'>Login</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            <form onSubmit={handleSubmit} className='w-75'>
            <input type="text" className='form-control mt-3' 
             onChange={(e)=>setEmail(e.target.value)}
            placeholder='enter your email'/>
            <input type="password" className='form-control mt-3' 
             onChange={(e)=>setPassword(e.target.value)}
            placeholder='enter your password'/>
            <div className='d-flex justify-content-end'  >
                 <button type='button' className=" btn border-0 text-primary" onClick={handleReset}>
                    <small>  Forgot Password?</small>
                   </button>
            </div>
           
            <div className='d-flex justify-content-center'>
           <button className='btn mt-4 fw-bold text-light' style={{backgroundColor:'#355cfaff'}}>
            LogIn
           </button>
           </div>
            </form>
            <p className='mt-3 '>Don't have an account? <Link to={'/register'}>Sign Up</Link></p>
             <div className="mt-3">
                <GoogleButton className="g-btn" type="dark" onClick={handleGoogleSignIn}/>
             </div>
        </div>

            </div>
        </div>
       </div>
       </div>
    </>
  )
}

export default Login
