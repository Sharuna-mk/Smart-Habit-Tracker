import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GoogleButton from 'react-google-button'
import { useUserAuth } from '../context/Userauthcontext';
import log from '../assets/log.png'
import { Alert } from 'react-bootstrap';


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")
    const { logIn, googleSignIn } = useUserAuth()
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("")
        try {
            await logIn(email, password);
            navigate("/home")
        }
        catch (err) {
            setError(err.message)
        }

    };
    const handleGoogleSignIn = async (e) => {
        e.preventDefault()
        try {
            await googleSignIn();
            navigate("/home")
        } catch (err) {
            setError(err.message)
        }
    }
    const handleReset = () => {
        navigate("/forgotpassword")

    }
    return (
        <>
            <div className="log" >
                <div className="container">
                    <div className="row">
                        <div className="col-6 mt-5">
                            <h1 className="fw-bolder text-start ms-5"
                                style={{ fontFamily: 'Roboto', fontSize: '25px', color: '#2563eb' }}
                            >Smart habit tracker</h1>
                            <img src={log} height={'600px'} alt="" className='mt-1' />
                        </div>


                        <div className="col-6" style={{ marginTop: '150px' }}>
                            <div className="card w-75 d-flex align-items-center justify-content-center ms-5 p-4">
                                <h3 className='text-center fw-bolder text-primary'>Login</h3>
                                {error && <Alert variant='danger'>{error}</Alert>}
                                <form onSubmit={handleSubmit} className='w-75'>
                                    <input type="text" className='form-control mt-4'
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder='enter your email' />
                                    <input type="password" className='form-control mt-4'
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder='enter your password' />
                                    <div className='d-flex justify-content-end'  >
                                        <button type='button' className=" btn border-0 text-primary" onClick={handleReset}>
                                            <small>  Forgot Password?</small>
                                        </button>
                                    </div>

                                    <div className='d-flex justify-content-center'>
                                        <button className='btn mt-4 fw-bold text-light' style={{ backgroundColor: '#355cfaff' }}>
                                            LogIn
                                        </button>
                                    </div>
                                </form>
                                <p className='mt-3 '>Don't have an account? <Link to={'/register'}>Sign Up</Link></p>
                                <div className='d-flex align-items-center mt-2'>
                                    <hr style={{ width: '150px' }} />
                                    <span>OR</span>
                                    <hr style={{ width: '150px' }} />
                                </div>

                                <div className="mt-2">
                                    <GoogleButton className="g-btn" type="dark" onClick={handleGoogleSignIn} style={{ width: '200px',height:'50px',borderRadius:'1px' }} />
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
