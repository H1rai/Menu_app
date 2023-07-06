import React, { useState } from 'react';
import '../styles/ProductList.css'; // スタイルの読み込み

const ProductList = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="product-list">
      {products.map((product) => (
        <div
          key={product.id}
          className="product-item"
          onClick={() => openModal(product)}
        >
          <div className="product-item-border">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
          </div>
        </div>
      ))}

      {/* モーダル */}
      {selectedProduct && (
        <div className="modal">
          <div className="modal-content">
            <h3>{selectedProduct.name}</h3>
            <p>{selectedProduct.description}</p>
            <p>${selectedProduct.price}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
    