import React, { useState } from 'react';
import '../styles/Header.css';

const Header = ({formattedDate,onDateChange }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date()); // 現在の月をステートで管理

  const handlePreviousMonth = () => {
    // 現在の月から1か月前の月を計算
    const previousMonth = new Date(currentMonth);
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    
    // 1月の場合、前年の12月に移動
    if (previousMonth.getMonth() === 0) {
      previousMonth.setFullYear(previousMonth.getFullYear() - 1);
      previousMonth.setMonth(11); // 12月
    }
    
    setCurrentMonth(previousMonth);

    const year = previousMonth.getFullYear();
    const month = (previousMonth.getMonth() + 1).toString().padStart(2, '0');
    const formattedDate = `${year}-${month}`;
    console.log(formattedDate)

    // 親コンポーネントに日付情報を送信
    onDateChange(formattedDate);
  };

  const handleNextMonth = () => {
    // 現在の月から1か月後の月を計算
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    
    // 年が変わる場合
    if (nextMonth.getMonth() === 0) {
      nextMonth.setFullYear(nextMonth.getFullYear() + 1);
      console.log("test")
    }

    setCurrentMonth(nextMonth);

    const year = nextMonth.getFullYear();
    const month = (nextMonth.getMonth() + 1).toString().padStart(2, '0');
    const formattedDate = `${year}-${month}`;
    console.log(formattedDate)
    // 親コンポーネントに日付情報を送信
    onDateChange(formattedDate);

  };

  const formattedCurrentMonth = `${(currentMonth.getMonth() + 1).toString().padStart(2, '0')}月の`;

  return (
    <div className="header">
      <h1>{formattedCurrentMonth}メニュー</h1>
      <button className='month' id='previous' onClick={handlePreviousMonth}>＜</button>
      <button className='month' id='next' onClick={handleNextMonth}>＞</button>
    </div>
  );
};

export default Header;