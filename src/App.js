import React, { useState, useRef} from 'react';
import './App.css'; // スタイルの読み込み
import './styles/Calendar.css'


import Modal from './components/Modal';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja';


const App = () => {

  const calendarRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleDateClick = (arg) => {
    setSelectedDate(arg.date);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };


return (
  <div>
    <h1>React Calendar</h1>
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      dateClick={handleDateClick}
      events={[
        // イベントを追加する場合はここに指定
      ]}
      ref={calendarRef}
      locales={[jaLocale]}
      locale="ja"
      classNames={{
        calendar: 'fc',
        button: 'fc-button',
        dayCell: 'fc-daygrid-day',
      }}
    />
    {showModal && <Modal date={selectedDate} closeModal={closeModal} />}
  </div>
);
};

export default App;
