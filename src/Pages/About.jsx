import React from 'react'
import { IoChevronBackOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';


function About() {
  return (
    <>
       
       <div>
        <div className="d-flex justify-content-start mt-2">
            <button className='btn border-0'><Link to={'/home'}><IoChevronBackOutline className="text-dark"style={{fontSize:'25px'}}/></Link></button>
        </div>
        
        <div className="d-flex justify-content-evenly">
            <div><img src="https://i.pinimg.com/1200x/26/a1/91/26a191b3845f95c1cacc5a2efc795de6.jpg"  height={'680px'}
            style={{marginLeft:'10px'}} alt="" /></div>
            <div>

               
                <div className="text-justify w-75 text-center">
 <h1 className='text-center' style={{fontFamily:'cursive',marginTop:'100px'}}>About Us</h1>
                    <p className='mt-5' style={{fontFamily:'cursive'}}>Welcome to Smart Habit Tracker, your personal companion for 
                        building better habits and achieving your goals. 
                    Our platform helps you track daily routines, set reminders,
                    and visualize your progress in an easy and intuitive way.</p>
              <p className='mt-3' style={{fontFamily:'cursive'}}>Whether you’re aiming to exercise regularly, improve productivity, or develop new skills,
                 Smart Habit Tracker empowers you to stay consistent and motivated. 
                With insightful analytics and friendly reminders, building lasting habits has never been this simple.</p>
                <p className='mt-3' style={{fontFamily:'cursive'}}>
        Our mission is to make habit tracking effortless and enjoyable. 
        By breaking down your goals into small, manageable steps, we help you focus on progress, not perfection. 
        Celebrate your achievements and see how small daily actions lead to big results! 🏆
      </p>
                </div>
            </div>
        </div>

       </div>
    </>
  )
}

export default About
