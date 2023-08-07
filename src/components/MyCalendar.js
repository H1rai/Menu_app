import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div>
      <h1>My Meal Planner</h1>
      <Calendar onChange={handleDateChange} value={date} />
    </div>
  );
};

export default MyCalendar;
