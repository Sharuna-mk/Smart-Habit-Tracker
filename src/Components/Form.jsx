import React, { useState } from 'react'
import Addemoji from './Form/Addemoji'
import TextField from '@mui/material/TextField';
import "./Form.css"
import Datepick from './Form/Datepick';
import Reminder from './Form/Reminder';
import { db } from '../firebase'
import { collection, addDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/Userauthcontext';
import { IoChevronBackOutline } from "react-icons/io5";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Form() {

  const [activeBtn, setActiveBtn] = useState('first')
  const [showPicker, setShowPicker] = useState(false)

  const [colorBox, setColorBox] = useState("#FFFFFF")
  const [goal, setGoal] = useState(false)

  const [details, setDetails] = useState(
    {
      name: "",
      description: "",
      emoji: "🚶",
      colorname: "#8d9de243",
      goalPeriod: "daily",
      goalValue: "",
      goalUnit: "times",
      reminderTime: "",
      startDate: new Date(),
      endDate: new Date(),
      updatedValue: 0,
      completedAt: null,
      streak: 0,
      lastUpdatedDate: new Date().toISOString().split("T")[0],
      completedDates: []
    }
  )
  const navigate = useNavigate();

  const handleGoalUnit = (e) => {
    const value = e.target.value;
    if (value === "other") {
      setGoal(true);
      setDetails({ ...details, goalUnit: "" });
    } else {
      setGoal(false);
      setDetails({ ...details, goalUnit: value });
    }
  };
  //inorder to seperate l task for each user
  const { user } = useUserAuth()
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(details);
    try {
      const result = await addDoc(collection(db, "tasks"), {
        ...details,
        userId: user?.uid,
        userEmail: user?.email,
        completedDates: details.completedDates || []
      });
      console.log(result);

      await addDoc(collection(db, "notifications"), {
        message: `🆕 Task "${details.name}" created successfully!`,
        type: "success",
        userId: user?.uid,
        createdAt: new Date(),
      });
      navigate('/home')

    }
    catch (error) {
      console.log(error.message);

    }

  }




  return (
    <>

      <form>

        <div className='smartbg'>

          <div className='d-flex  p-5 text-center justify-content-center'>
            <div className="card shadow"
              style={{
                backgroundColor: "rgba(173, 216, 245, 0.2)",
                border: "2px solid rgba(255, 255, 255, 0.89)",
                backdropFilter: "blur(5px)",
                width: '500px'
              }}>
              <div className="d-flex justify-content-start mt-2">
                <Link to={'/home'} className='text-dark'><IoChevronBackOutline className='fw-bolder' style={{ fontSize: '25px' }} /></Link>
              </div>
              <h3 className='text-center mt-3 fw-bold'>{details.emoji}
                {details.name}
              </h3>
              <div className=" d-flex ">
                <span className='mt-4'>
                  <Addemoji chosenEmoji={details.emoji}
                    setChosenEmoji={(emoji) => setDetails({ ...details, emoji })}
                    showPicker={showPicker} setShowPicker={setShowPicker} /></span>
                <div className='w-100'>
                  <TextField name='name' value={details.name} onChange={(e) => setDetails({ ...details, name: e.target.value })}
                    id="standard-basic" label="Name" className='mt-4 w-75' variant="standard" />
                  <TextField name='description' value={details.description}
                    onChange={(e) => setDetails({ ...details, description: e.target.value })}
                    id="standard-basic" label="Description" className='mt-2 w-75' variant="standard" />
                </div>
              </div>
              {/* color */}
              <div className=" d-flex justify-content-between mt-5 ms-5 me-5">
                <span className='fw-bold'>color</span>
                <div className="color-picker-container">
                  <div className="color-display">
                    <input name='colorname' type="color" onChange={(e) => {
                      setColorBox(e.target.value);
                      setDetails({ ...details, colorname: e.target.value })
                    }} value={colorBox} />

                  </div>
                </div>
              </div>


              {/* type */}

              <div className='mt-2 text-start ms-5 fw-bold' >
                Habit Type
                <div className='d-flex justify-content-evenly mt-3'>


                  <div className="jelly" >
                    <button type='button'
                      onClick={() => setActiveBtn('first')} >
                      <span>Build</span>
                    </button>
                    <button type='button'
                      onClick={() => setActiveBtn('second')}>
                      <span>Quit</span>
                    </button>
                  </div>
                </div>
              </div>

              {
                activeBtn == 'first' &&
                <div>
                  <div className='mt-5 text-start ms-5 fw-bold d-flex justify-content-between me-5'>
                    <p>Goal period?</p>
                    <select
                      name="goalPeriod"
                      className="goal-select"
                      value={details.goalPeriod}
                      onChange={(e) => setDetails({ ...details, goalPeriod: e.target.value })}
                    >
                      <option value="Daily">🌞 Daily</option>
                      <option value="Weekly">📆 Weekly</option>
                      <option value="Monthly">🌙 Monthly</option>
                    </select>
                  </div>
                  <div className='mt-4 text-start ms-5 fw-bold d-flex justify-content-between me-5'>
                    <p>Goal Value</p>
                    <div className='d-flex'>
                      <input type="text" style={{ width: '50px' }} className='border-0 rounded-2 h-100 me-2 text-center'
                        placeholder='value' name='goalValue'
                        value={details.goalValue} onChange={(e) => setDetails({ ...details, goalValue: e.target.value })} />
                      <select className="goal-select"
                        name='goalUnit' value={goal ? "other" : details.goalUnit}
                        onChange={handleGoalUnit}
                      >
                        <option value="kg">⚖️ kg</option>
                        <option value="cm">📏 cm</option>
                        <option value="mmHg">💨 mmHg</option>
                        <option value="bpm">❤️ bpm</option>
                        <option value="ml">🥤 ml</option>
                        <option value="steps">👣 steps</option>
                        <option value="%">📊 %</option>
                        <option value="hr">⏰ hr</option>
                        <option value="min">⏱️ min</option>
                        <option value="sec">⏲️ sec</option>
                        <option value="other">➕ Other...</option>
                      </select>
                      {goal &&
                        <div>
                          <input type="text" placeholder='Units' value={details.goalUnit} onChange={(e) => setDetails({ ...details, goalUnit: e.target.value })} style={{ width: '50px' }} className='border-0 rounded-2 h-100 me-2 text-center ms-2' />
                        </div>
                      }

                    </div>
                  </div>
                </div>

              }

              {
                activeBtn == 'second' &&
                <div>
                  <div className='mt-5 text-start ms-5 fw-bold d-flex justify-content-between me-5'>
                    <p>Goal period?</p>
                    <select
                      name="goalPeriod"
                      className="goal-select"
                      value={details.goalPeriod}
                      onChange={(e) => setDetails({ ...details, goalPeriod: e.target.value })}
                    >
                      <option value="Daily">🌞 Daily</option>
                      <option value="Weekly">📆 Weekly</option>
                      <option value="Monthly">🌙 Monthly</option>
                    </select>
                  </div>
                  <div className='mt-4 text-start ms-5 fw-bold d-flex justify-content-between me-5'>
                    <p>Goal Value</p>
                    <div className='d-flex'>
                      <input type="text" style={{ width: '50px' }} className='border-0 rounded-2 h-100 me-2 text-center'
                        placeholder='value' name='goalValue'
                        value={details.goalValue} onChange={(e) => setDetails({ ...details, goalValue: e.target.value })} />
                      <select className="goal-select"
                        name='goalUnit' value={goal ? "other" : details.goalUnit}
                        onChange={handleGoalUnit}
                      >
                        <option value="kg">⚖️ kg</option>
                        <option value="cm">📏 cm</option>
                        <option value="mmHg">💨 mmHg</option>
                        <option value="bpm">❤️ bpm</option>
                        <option value="ml">🥤 ml</option>
                        <option value="steps">👣 steps</option>
                        <option value="%">📊 %</option>
                        <option value="hr">⏰ hr</option>
                        <option value="min">⏱️ min</option>
                        <option value="sec">⏲️ sec</option>
                        <option value="other">➕ Other...</option>
                      </select>
                      {goal &&
                        <div>
                          <input type="text" placeholder='Units' value={details.goalUnit} onChange={(e) => setDetails({ ...details, goalUnit: e.target.value })} style={{ width: '50px' }} className='border-0 rounded-2 h-100 me-2 text-center ms-2' />
                        </div>
                      }

                    </div>

                  </div>
                  <p className='text-end text-danger me-5 mt-2'>*min one count per day</p>
                </div>

              }
              <div>
                <Reminder details={details} reminder={details.reminderTime}
                  setReminder={(time) => setDetails({ ...details, remider: time })} />
              </div>


              {/* habit term */}
              <div className="d-flex justify-content-between">

                <Datepick
                  startDate={details.startDate}
                  setStartDate={(date) => setDetails({ ...details, startDate: date })}
                  endDate={details.endDate}
                  setEndDate={(date) => setDetails({ ...details, endDate: date })}

                />

              </div>


              <div className='text-center'>
                <button type='submit'
                  className='btn fw-bolder text-light mt-4 mb-3'
                  onClick={handleSubmit}
                  style={{ backgroundColor: '#4b93f8ff', width: '80px' }}>Save</button>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer/>
      </form>

    </>
  )
}

export default Form
