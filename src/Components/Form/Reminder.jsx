import React, { useEffect, useState, useRef } from 'react';
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Reminder({ details, reminder, setReminder }) {
  const [toggled, setToggled] = useState(false);
  const [time, setTime] = useState(reminder || "08:00");
  const firedRef = useRef(false);

  const showToastMessage = (time) => {
    toast.success(`Reminder set at ${time}!`,
      { position: "top-center" });
    setReminder(time);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const [remHour, remMin] = time.split(":").map(Number);

      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      if (currentHour === remHour && currentMinute === remMin && !firedRef.current) {
        toast.info(`Get started !You have to complete `, { position: "top-center" });
        firedRef.current = true;
      } else if (currentHour !== remHour || currentMinute !== remMin) {
        firedRef.current = false; // reset for next day
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);


  return (
    <>
      <div className='d-flex justify-content-between ms-5 me-5 mt-5'>
        <p className='fw-bold'>Reminder</p>
        <button
          type='button'
          className={`toggle-btn ${toggled ? "toggled" : ""}`}
          onClick={() => setToggled(!toggled)}
        >
          <div className="thumb"></div>
        </button>
      </div>

      {toggled &&
        <div className="d-flex justify-content-between ms-5 me-5 mt-3 align-items-center">
          <p className='fw-bold'>Time</p>
          <div className="d-flex">
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="border-0 text-center rounded-2 fw-bold"
              style={{ width: "120px" }}
            />
            <button
              type='button'
              className='btn rounded-pill ms-2'
              style={{ backgroundColor: details.colorname, width: '55px' }}
              onClick={() => showToastMessage(time)}
            >
              <FaPlus className='text-light' />
            </button>
          </div>
        </div>
      }

    </>
  );
}


export default Reminder;






