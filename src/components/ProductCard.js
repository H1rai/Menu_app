import React, { useState } from 'react';
import '../styles/ProductCard.css';
import { BsFillPencilFill } from "react-icons/bs";


const ProductCard = ({ imageSrc, title, description, date, time, favorite }) => {
  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = () => {
    setIsEditing(true);
    // ここでAPIへのアクセスを行う
    const requestBody = {
      date: date,
      favorite: 0,
      kinds: "副菜",
      memo: "",
      name: title,
      time: "",
      sheet: "mocha"
    };

    fetch('https://menu-apps-api.vercel.app/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
      .then(response => response.json())
      .then(data => {
        // レスポンスの処理を行う（例: メッセージを表示）
        console.log(data);
      })
      .catch(error => {
        console.error('APIエラー:', error);
      });
  };

  return (
    <div className="card card-skin-card">
      <div className="card__imgframe">
        <img src={imageSrc} alt={title} className='card__imgframe' />
      </div>
      <div className="card__textbox">
        <BsFillPencilFill className='icon' onClick={handleEditClick}/>
        <div className='card__titletext'>{title}</div>
        <div className='card__overviewtext'>{description}</div>
        <div className="date">{date}</div>
        <div className='time'>{time}</div>
        <div className='favorite'>{favorite}</div>
      </div>
    </div>
  );
};

export default ProductCard;
