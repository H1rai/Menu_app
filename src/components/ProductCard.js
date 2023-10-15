import React, { useState } from 'react';
import '../styles/ProductCard.css';
import { AiOutlineCopy } from "react-icons/ai";

const ProductCard = ({ imageSrc, title, description, date, time, favorite, index }) => {
  const handleClick = (event) => {
    console.log(1)
    // クリックされた要素のIDを取得
    var elementId = event.target.id;
    var respId = elementId.replace('copy','')
    var menu_name = document.getElementById(`menu_name_`+respId)
    try{console.log('クリックされた要素のID:', menu_name.innerText);
    navigator.clipboard.writeText(menu_name.innerText);
  }
    catch(e){console.log( e.message );    }
      
  };

  return (
    <div className="card card-skin-card">
      <div className="card__imgframe">
        <img src={imageSrc} alt={title} className='card__imgframe' />
      </div>
      <div className="card__textbox">
        <AiOutlineCopy className='icon' id={`copy${index}`} onClick={handleClick}/>
        <div className={`card__titletext`} id={`menu_name_${index}`} >
          {title}
        </div>
        <div className='card__overviewtext'>{description}</div>
        <div className="date">{date}</div>
        <div className='time'>{time}</div>
        {/* <div className='favorite'>{favorite}</div> */}
      </div>
    </div>
  );
};

export default ProductCard;
