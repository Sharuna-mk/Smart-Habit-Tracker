import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import TaskCard from "./update/TaskCard";

function UpdatedTask() {
  const { id } = useParams(); 
const [task, setTask] = useState(null); // use null for initial state
const today = new Date().toISOString().split("T")[0];

useEffect(() => {
  const taskRef = doc(db, "tasks", id);

  const unsubscribe = onSnapshot(taskRef, async (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      setTask(docSnap.data());
    }
  });

  return () => unsubscribe(); // cleanup listener
}, [id, today]);


  if (!task) return <p>Loading task...</p>;

  return (
    <div>
     <div style={{background:`linear-gradient(321deg, rgba(255,255,255,0.25), ${task.colorname}90)`,backdropFilter:"blur(10px)",
        height:"auto",}}>
        <marquee behavior="" direction="" scrollamount='8' style={{backgroundColor:task.colorname}}
        className="fst-italic fw-bolder">💪 Stay consistent — your habits define your future! 🕒</marquee>
         <h4 className="text-center fw-bolder mt-3 fst-italic" style={{color:task.colorname}}>📋 My Task</h4>
      <TaskCard taskId={id} />

     </div>
      
    </div>
  );
}

export default UpdatedTask;
