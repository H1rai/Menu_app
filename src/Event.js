// EventCalendar.js
import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';

const EventCalendar = () => {
  const [events, setEvents] = useState([]);

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

  return <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" events={events} />;
};

export default EventCalendar;
