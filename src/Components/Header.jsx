import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { FaCalendarAlt } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import './Header.css'
import { Link } from 'react-router-dom';
import { useUserAuth } from '../context/Userauthcontext';
import Dropdown from 'react-bootstrap/Dropdown';
import { FaRegCircleUser } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { useState } from 'react';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { deleteUser } from "firebase/auth";
import { auth } from "../firebase";
import swal from 'sweetalert';


function Header() {

  const { user, logOut } = useUserAuth();
  console.log(user);
  const handleLogout = async () => {
    try {
      await logOut();
    } catch (err) {
      console.log(err.message);

    }
  }
  const handleDeleteUser = async (uid) => {

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover account!",
      buttons: true,
      dangerMode: true,
    }).
      then(async (willDelete) => {
        if (willDelete) {
          try {
            const q = await getDocs(collection(db, "tasks"));
            q.forEach(async (docSnap) => {
              if (docSnap.data().userId === uid) {
                await deleteDoc(doc(db, "tasks", docSnap.id));
              }
            });

            if (auth.currentUser) {
              await deleteUser(auth.currentUser);
            }

          } catch (error) {
            console.log(error.message);
          }
          swal("Your Account has been deleted!", {
            icon: "success",
          })
          navigate("/login");

        }
        else {
          swal("Account not deleted!");
        }
      });


  };

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
              <span className='fw-bolder text-primary'
                style={{ fontSize: '20px' }}>Smart habit Tracker</span>

            </div>

          </Navbar.Brand>
          <div className="d-flex align-items-center justify-content-between">
            <Link to={'/form'} className='navtext btn fs-4 ms-2 me-3'
            ><IoAddCircle /></Link>
            <Link to={'/task-calendar'} className='ms-2 fs-3 me-3'><FaCalendarAlt /></Link>

            <Link to={'/notification'} className="text-decoration-none ms-3 me-2 fs-3 ">🔔</Link>
            <Link to={'/about'} className="text-decoration-none fw-bolder text-primary ms-3 me-3">
              about</Link>


            <Dropdown>
              <Dropdown.Toggle className='btn border-0 text-primary ms-2' style={{ backgroundColor: 'rgb(206, 214, 248)' }} id="dropdown-basic">
                <FaRegCircleUser className='fs-5' />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item className='bg-light '><button className='btn border-0  text-dark fw-bold'
                  onClick={handleLogout}><MdOutlineLogout /> Logout </button></Dropdown.Item>
                <Dropdown.Item className='bg-light '><button className='btn text-danger border-0 fw-bold '
                  onClick={() => handleDeleteUser(user.uid)}><FaRegUser /> Delete User</button></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header
