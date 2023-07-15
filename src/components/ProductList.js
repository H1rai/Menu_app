import '../styles/ProductList.css';
import React, { useState, useEffect } from 'react';


const calculateColumnCount = () => {
  const screenWidth = window.innerWidth;
  if (screenWidth >= 1200) {
    return 5;
  } else if (screenWidth >= 992) {
    return 4;
  } else if (screenWidth >= 768) {
    return 3;
  } else if (screenWidth >= 400) {
    return 2;
  }else{
    return 1;
  }
};

const ProductList = ({ products }) => {
  const columnCount = calculateColumnCount();
  const [minHeight, setMinHeight] = useState(0);

  useEffect(() => {
    const updateMinHeight = () => {
      const elements = document.getElementsByClassName('product-item');
      let minHeight = 0;
      for (let i = 0; i < elements.length; i++) {
        const elementHeight = elements[i].clientHeight;
        if (elementHeight > minHeight) {
          minHeight = elementHeight;
        }
      }
      setMinHeight(minHeight);
    };

    window.addEventListener('resize', updateMinHeight);
    updateMinHeight();

    return () => {
      window.removeEventListener('resize', updateMinHeight);
    };
  }, []);

  return (
    <div className="product-list" style={{ gridTemplateColumns: `repeat(${columnCount}, 1fr)` ,gridAutoRows: `minmax(${minHeight}px, auto)`}}>
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
