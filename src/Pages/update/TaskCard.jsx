import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { doc, updateDoc, deleteDoc, arrayUnion, arrayRemove, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { RiResetLeftFill } from "react-icons/ri";
import { CiPause1 } from "react-icons/ci";
import { BsFillSkipStartFill } from "react-icons/bs";



function TaskCard({ taskId }) {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const [task, setTask] = useState(null);
  const [currentValue, setCurrentValue] = useState(0);
  const [completedAt, setCompletedAt] = useState(null);
  const [streak, setStreak] = useState(0);

 const [countDown, setCountDown] = useState(null); 
const [isRunning, setIsRunning] = useState(false);
const [timeLeft, setTimeLeft] = useState(null);
const [initialTime, setInitialTime] = useState(null);

  const formatTime = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hrs > 0) return `${hrs}h ${mins}m ${secs}s`;
  if (mins > 0) return `${mins}m ${secs}s`;
  return `${secs}s`;
};

  useEffect(() => {
  const taskRef = doc(db, "tasks", taskId);
  const unsubscribe = onSnapshot(taskRef, (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      setTask(data);
      setCurrentValue(data.updatedValue || 0);
      setCompletedAt(data.completedAt || null);
      setStreak(data.streak || 0);

      if (["sec", "min", "hr"].includes(data.goalUnit)) {
        let convertedTime = data.goalValue;

        if (data.goalUnit === "min") convertedTime = data.goalValue * 60;
        if (data.goalUnit === "hr") convertedTime = data.goalValue * 3600;

        setCountDown(convertedTime);
        setTimeLeft(convertedTime);
        setInitialTime(convertedTime);
      }
    }
  });

  return () => unsubscribe();
}, [taskId]);

useEffect(() => {
  let timer;

  if (isRunning && timeLeft > 0) {
    timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
  } 
  else if (timeLeft === 0 && isRunning) {
    setIsRunning(false);
    handleUpdate(task.goalValue); // ✅ Auto-mark as completed
  }

  return () => clearInterval(timer);
}, [isRunning, timeLeft]);


const handleStart = () => {
  if (timeLeft > 0) setIsRunning(true);
};

const handlePause = () => {
  setIsRunning(false);
};

const handleReset = async () => {
  setIsRunning(false);
  setTimeLeft(initialTime);

  const taskRef = doc(db, "tasks", taskId);
  await updateDoc(taskRef, {
    completedAt: null,
    completedDates: arrayRemove(today),
    updatedValue: 0, // optional if you track progress
  });

  setCompletedAt(null);
};



  if (!task) return <p>Loading...</p>;

  const percentage = Math.min((currentValue / task.goalValue) * 100, 100);

  const handleUpdate = async (newValue) => {
    const taskRef = doc(db, "tasks", taskId);
    const now = new Date().toISOString();
    const updateData = {
      updatedValue: newValue,
      lastUpdatedDate: today,
    };

    if (newValue >= task.goalValue && !completedAt) {
      let newStreak = 1;
      if (task.completedAt) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split("T")[0];
        if (task.completedAt.startsWith(yesterdayStr)) newStreak = streak + 1;
      }
      updateData.completedAt = now;
      updateData.streak = newStreak;
      updateData.completedDates = arrayUnion(today);
    }

    if (newValue < task.goalValue && completedAt) {
      updateData.completedAt = null;
      updateData.completedDates = arrayRemove(today);
    }

    await updateDoc(taskRef, updateData);
  };

  const handleManualChange = (e) => {
    let newValue = Number(e.target.value) || 0;
    newValue = Math.max(0, Math.min(newValue, task.goalValue));
    setCurrentValue(newValue); // immediate UI update
  };

  const handleSave = () => handleUpdate(currentValue);

  const handleDelete = async () => {
    await deleteDoc(doc(db, 'tasks', taskId));
    navigate("/home");
  };


  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="card shadow mt-2 p-5">
        <h3 className='text-center fw-bold' style={{ color: task.colorname }}>{task.emoji}{task.name}</h3>
        <p className='text-center fst-italic'>{task.description}</p>
        {
          (task.goalUnit=='hr' || task.goalUnit=='min' || task.goalUnit=='sec' ) ?
         
          <div>
            
           <CircularProgressbar
          value={(timeLeft / initialTime) * 100}
    text={formatTime(timeLeft)} 
          styles={buildStyles({
            pathColor: task.colorname || "#76a0f9ff",
            textColor: task.colorname,
            trailColor: "#eee",
          })}
        />
<div className="d-flex justify-content-between  ms-5 me-5 mt-3">
  <button
    className='btn bg-success fw-bold text-light'
    onClick={handleStart}
    disabled={isRunning}
  >
    <BsFillSkipStartFill />
  </button>
  <button
    className='btn bg-danger fw-bold text-light'
    onClick={handlePause}
    disabled={!isRunning}
  >
   <CiPause1 />
  </button>
  <button className='btn bg-secondary fw-bold text-light' onClick={handleReset}>
   <RiResetLeftFill />
  </button>
</div>

          </div>  :
            <div>
          <CircularProgressbar
          value={percentage}
          text={`${Math.round(percentage)}%`}
          styles={buildStyles({
            pathColor: task.colorname || "#76a0f9ff",
            textColor: task.colorname,
            trailColor: "#eee",
          })}
        />
         <div className="progress-controls d-flex justify-content-between mt-4 ms-5 me-5">
          <button className='btn' style={{ backgroundColor: task.colorname }} onClick={() => setCurrentValue(Math.max(currentValue - 1, 0))}><FaMinus /></button>
          <input
            className='form-control ms-2 me-2'
            type="number"
            value={currentValue}
            onChange={handleManualChange}
            min="0"
            max={task.goalValue}
          />
          <button className='btn' style={{ backgroundColor: task.colorname }} onClick={() => setCurrentValue(Math.min(currentValue + 1, task.goalValue))}><FaPlus /></button>
        </div>
        </div>
         
        }
        

       

        <div className="d-flex justify-content-center ms-5 me-5 align-items-center mt-3">
          <button onClick={handleSave} className='btn rounded-2 text-light fw-bolder' style={{ backgroundColor: task.colorname }}>Save</button>
        </div>

        <p className='fst-italic mt-3 text-start fw-bold'>{currentValue} / {task.goalValue} completed</p>
        {completedAt ? (
          <p className="completed-date">✅ Completed on {new Date(completedAt).toLocaleDateString()}</p>
        ) : (
          <p className="not-completed">In progress...</p>
        )}

        <p className="fw-bold">🔥 <span className='fst-italic'>Streak: {streak} days</span></p>

        <div className="d-flex justify-content-center">
          <button className='btn bg-danger' onClick={handleDelete}><FaTrash className='text-light' /></button>
          <button className='btn bg-info ms-3' onClick={() => navigate(`/home/${taskId}/update`)}><MdEditDocument className='text-light fs-5' /></button>
          <button className="btn btn-secondary ms-3" onClick={() => navigate('/home')}><IoMdArrowRoundBack /></button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
