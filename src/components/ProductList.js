import React from 'react';
import '../styles/ProductList.css';

const calculateColumnCount = () => {
  const screenWidth = window.innerWidth;
  if (screenWidth >= 1200) {
    return 5;
  } else if (screenWidth >= 992) {
    return 4;
  } else if (screenWidth >= 768) {
    return 3;
  } else {
    return 2;
  }
};

const ProductList = ({ products }) => {
  const columnCount = calculateColumnCount();

  return (
    <div className="product-list" style={{ gridTemplateColumns: `repeat(${columnCount}, 1fr)` }}>
      {products.map((product) => (
        <div key={product.id} className="product-item">
          <div className="product-item-border">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
