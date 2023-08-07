import React from 'react';
import './App.css';
import EventCalendar from './Event'; // 新しいコンポーネントをインポート

const App = () => {
  return (
    <div className="App">
      <EventCalendar /> {/* EventCalendar コンポーネントを表示 */}
    </div>
  );
};

export default App;
