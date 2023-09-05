import React from 'react';
import '../styles/ProductCard.css';

const ProductCard = ({ imageSrc, title, description, date }) => {
  return (
    <div className="card card-skin-card">
      <div className="card__imgframe">
        <img src={imageSrc} alt={title} className='card__imgframe' />
      </div>
      <div className="card__textbox">
        <div className='card__titletext'>{title}</div>
        <div className='card__overviewtext'>{description}</div>
      </div>
      <div className="date">{date}</div>
    </div>
  );
};

export default ProductCard;
