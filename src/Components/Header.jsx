import { lightGreen } from '@mui/material/colors';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { FaCalendarAlt } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import './Header.css'
import { Link } from 'react-router-dom';
import { useUserAuth } from '../context/Userauthcontext';


function Header() {

    const {user,logOut} =useUserAuth();
    console.log(user);
    const handleLogout=async ()=>{
        try {
            await logOut();
        } catch (err) {
            console.log(err.message);
            
        }
    }
    

    return (
        <div>
            <Navbar className='nav'>
                <Container>
                    <Navbar.Brand href="#home" className='mt-3'>
                        <div>
                            <img
                                alt=""
                                src="https://cdn-icons-png.flaticon.com/512/9741/9741111.png"
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            />{' '}
                            <span className='navtext fw-bolder'
                             style={{fontFamily:'Brush Script MT, Brush Script Std, cursive',fontSize:'25px'}}>Smart habit Tracker</span>

                        </div>

                    </Navbar.Brand>
                    <div className="d-flex align-items-center justify-content-between">
                         <Link to={'/form'} className='navtext btn fs-4 ms-2'
                        ><IoAddCircle /></Link>
                    <button className='navtext btn fs-3  ms-2'><Link to={'/task-calendar'}><FaCalendarAlt /></Link></button>
    
                        <button className=' btn fs-4 ms-2' ><Link to={'/notification'} className="text-decoration-none">🔔</Link></button>
                        <button className=' navtext btn fw-bold ms-2'><Link to={'/about'} className="text-decoration-none fw-bolder"
                        style={{color:'blue'}}>
                        about</Link></button>
                        <button className='btn bg-primary text-light fw-bold ms-5'
                        onClick={handleLogout}>Logout</button>
                    </div>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header
