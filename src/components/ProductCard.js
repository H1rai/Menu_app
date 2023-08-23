import React from 'react';
import '../styles/ProductCard.css';

const ProductCard = ({ imageSrc, title, description, date }) => {
  return (
    <div className="product-card">
      <div className="image">
        <img src={imageSrc} alt={title} />
      </div>
      <div className="info">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="date">{date}</div>
    </div>
  );
};

export default ProductCard;
