// EventCalendar.js
import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";

import axios from 'axios';
import CustomModal from './Modal'; 

const EventCalendar = () => {
  const [events, setEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);


  useEffect(() => {
    // APIからデータを取得する関数
    const fetchData = async () => {
      try {
        const response = await axios.post('https://menu-apps-api.vercel.app/get_data', {
          sheet: 'mocha',
        });
        // APIから取得したデータをイベントデータに整形する
        const formattedEvents = response.data.data.map((item) => ({
          title: `${item.kinds} - ${item.name}`,
          start: new Date(item.date),
          allDay: true,
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error('APIからデータの取得に失敗しました。', error);
      }
    };

    fetchData();
  }, []);


  const handleDateClick = (arg) => {
    const clickedDate = arg.date;
    const dateEvents = events.filter(
      (event) =>
        event.start.getFullYear() === clickedDate.getFullYear() &&
        event.start.getMonth() === clickedDate.getMonth() &&
        event.start.getDate() === clickedDate.getDate()
    );
    setSelectedDate({ date: clickedDate, events: dateEvents });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return  <div style={{ height: '100%' }}>
    <FullCalendar plugins={[dayGridPlugin,interactionPlugin]} initialView="dayGridMonth" events={events} dateClick={handleDateClick}/> 
   {modalIsOpen && (<CustomModal isOpen={modalIsOpen} closeModal={closeModal} selectedDate={selectedDate} />)}
  </div>;
};

export default EventCalendar;
