import React, { useEffect, useState } from 'react'
import './Taskcalendar.css'
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase'; 
import { useUserAuth } from '../context/Userauthcontext';
import { RxCross2 } from "react-icons/rx";
import { Link } from 'react-router-dom';
import { IoChevronBackOutline } from "react-icons/io5";
import { LuDownload } from "react-icons/lu";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';



function Taskcalendar() {

  const today=new Date();
  //index start from 0 so we have to add 1
  const [month,setMonth]=useState(today.getMonth()+1);
  const[year,setYear]=useState(today.getFullYear());
  const[tasks,setTasks]=useState([])
 
  const days=new Date(year,month,0).getDate();
  const daysnum=Array.from({length:days},(_,i)=>i+1)
  console.log(daysnum);
  
    const { user }=useUserAuth();
  
   useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "tasks"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const taskList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(taskList);
    });
  
    return () => unsubscribe(); 
  }, [user]);

  const getCompletedDay = (completedAt) => {
  if (!completedAt) return null; 
  return new Date(completedAt).getDate(); // string or number
};
const currentMonthName = new Date().toLocaleString('en-US', { month: 'long' });
console.log(currentMonthName); 


//pdf
const downloadRecord=async()=>{
const input=document.getElementById('result');
const canvas=await html2canvas(input,{scale:2})
const imgUrl=canvas.toDataURL('image/png')

const pdf=new jsPDF('p', 'mm', 'a4')
const pdfWidth=pdf.internal.pageSize.getWidth();
const pdfHeight=canvas.height * pdfWidth /canvas.width;
pdf.addImage(imgUrl,'PNG',0,0,pdfWidth,pdfHeight)
pdf.save('monthly_record.pdf')
}
  return (
    <>
   <div className="d-flex justify-content-between mt-2">
     <button className='btn'  
    ><Link to={'/home'} className='text-dark fw-bolder'><IoChevronBackOutline  style={{fontSize:'30px'}}/></Link></button>
      <button className='btn' onClick={downloadRecord}><LuDownload  style={{fontSize:'30px'}}/></button>
   </div>
  
    <div className="table-container" id='result'>
    <div className="d-flex justify-content-between">
        <h3 className=' ms-5 mt-3 fst-italic fw-bolder'
      style={{fontFamily:'Brush Script MT, Brush Script Std, cursive',fontSize:'30px'}}>{currentMonthName}</h3>
      <h3 className=' me-5 mt-3 fst-italic fw-bolder'
      style={{fontFamily:'Brush Script MT, Brush Script Std, cursive',fontSize:'30px'}}>{year}</h3>
    </div>
      <table className="pinterest">
      
        <thead>
          <tr>
            <th><span  className='fst-italic fw-bolder' style={{fontFamily:'Brush Script MT, Brush Script Std, cursive',fontSize:'25px'}}> Habit name</span></th>
            {
            daysnum.map((day)=>(<th key={day}><span className='fw-bolder'>{day}</span></th>))}
          </tr>
        </thead>
    <tbody>
  {tasks.length === 0 ? (
    <tr>
      <td colSpan={daysnum.length + 1} style={{ textAlign: 'center', padding: '20px' }}>
        Please add task
      </td>
    </tr>
  ) : (
   tasks.map((task) => (
  (() => {
    const completedDay = getCompletedDay(task.completedAt);
    return (
      <tr key={task.id}>
        <td className='fw-bolder'>{task.emoji} <span  style={{fontFamily:'Brush Script MT, Brush Script Std, cursive',fontSize:'20px'}}> {task.name}</span></td>
        {daysnum.map((day) => (
          <td
            key={day}
            style={day === completedDay ? { backgroundColor: task.colorname } : {}}
          >
            {day !== completedDay && <RxCross2 className='text-danger' />}
          </td>
        ))}
      </tr>
    );
  })()
))

  )}
</tbody>

      </table>
      
</div>
      
    </>
  )
}

export default Taskcalendar
