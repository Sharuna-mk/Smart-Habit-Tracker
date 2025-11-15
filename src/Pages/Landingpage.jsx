import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase'; 
import updateIcon from '../assets/update.png';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/Userauthcontext';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRef } from "react";


function Landingpage() {
  const [tasks, setTasks] = useState([]);
  const navigate=useNavigate();

  const { user }=useUserAuth();
    const firedRef = useRef({});

    useEffect(() => {
    if (tasks.length === 0) return;

    const interval = setInterval(() => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      tasks.forEach((task, idx) => {
        if (!task.remider) return; // skip if no reminder

        const [remHour, remMin] = task.remider.split(":").map(Number);

        if (
          currentHour === remHour &&
          currentMinute === remMin &&
          !firedRef.current[idx]
        ) {
          toast.info(
            `🔥 ${task.name} – You have to complete ${task.goalValue} ${task.goalUnit}! Keep going!`,
            { position: "top-center" }
          );
          firedRef.current[idx] = true;
        } else if (currentHour !== remHour || currentMinute !== remMin) {
          firedRef.current[idx] = false; 
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [tasks]);

 useEffect(() => {
  if (!user) return;
  const q = query(collection(db, "tasks"), where("userId", "==", user.uid));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const taskList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTasks(taskList);
  });

  return () => unsubscribe(); 
}, [user]);


  const handleUpdateTask=(id)=>{
 navigate(`/home/${id}/edit`)
  }

  return (
    <>
      <Header />
       <ToastContainer />
      {tasks.length === 0 ? (
        <div className="text-center mt-5">
          <h1 className='text-primary'>
            Hey User! You haven’t added any tasks yet &#128547;
          </h1>
          <img
            className='mt-5'
            src="https://c.tenor.com/BOQWM_JK_agAAAAj/curiouspiyuesh-piyueshmodi.gif"
            alt=""
          />
        </div>
      ) : (
        tasks.map((task) => (
          <div className="d-flex justify-content-center mt-3" key={task.id}>
            <div className="card w-50 shadow border-0" style={{backgroundColor:task.colorname}}>
              <div className="d-flex justify-content-between ms-3 me-3 rounded-pill p-3">
                <div>
                  <h3 className='fw-bold fs-4'>{task.emoji} {task.name}</h3>
                  <h6 className='fst-italic mt-2'>{task.updatedValue} / {task.goalValue} {task.goalUnit}</h6>
                </div>
                <div className="d-flex me-4">
                  <p className='fw-bold'>{task.streak >0 && task.updatedValue==task.goalValue ? <span  style={{ fontSize: '30px' }}>🔥</span> : null}</p>
                  <button className='btn border-0'><img src={updateIcon} height={'40px'} width={'40px'}
                  alt="update" onClick={()=> handleUpdateTask(task.id)} /></button>
              
                 
                </div>
              </div>
            </div>
          </div>
        ))
      )}
     
    </>
  );
}

export default Landingpage;
