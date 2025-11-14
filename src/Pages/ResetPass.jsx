import React, { useState } from 'react'
import { useUserAuth } from '../context/Userauthcontext';
import { Alert } from 'react-bootstrap';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';


function ResetPass() {
    const[email,setEmail]=useState();
    const[error,setError]=useState();
    const { resetPassword }=useUserAuth();
   const navigate=useNavigate()
    const handleSubmit= async (e)=>{
        e.preventDefault();
        setError("")
        try {

        await resetPassword(email)  
        alert("Password reset email sent successfully! Please check your inbox.")  
        navigate("/login")
        } catch (error) {
            setError(error.message)
        }

    }
  return (
    <div>

        <div className="d-flex align-items-center justify-content-center mt-5">
            <div className="card w-25">
                <h2 className="text-center mt-5 fw-bolder">Forgot Password</h2>
                <form className='p-5' onSubmit={handleSubmit}>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <input type="text" placeholder='enter email'  className='form-control'
                    value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <div className="d-flex justify-content-center">
                        <button type='submit' className='btn fw-bolder bg-secondary text-light mt-3'>RESET</button>
                    </div>
                    <ToastContainer/>
                </form>

            </div>
        </div>
      
    </div>
  )
}

export default ResetPass
