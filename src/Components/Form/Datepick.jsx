import React from 'react';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

function Datepick({ startDate, setStartDate, endDate, setEndDate }) {
  const today = new Date();

  return (
    <div className='ms-4'>
      <div className='flex justify-content-between align-items-center mt-5'>
        <div>
          <label className='fw-bold '>Start Date: </label>
          <DatePicker
            onChange={setStartDate}
            value={startDate}
            minDate={today}
          />
          <label className='fw-bold ms-2 me-2'>End Date: </label>
          <DatePicker
            onChange={setEndDate}
            value={endDate}
            minDate={today}
          />
        </div>
      </div>
    </div>
  );
}

export default Datepick;
