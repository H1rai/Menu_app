import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import products from './data/products';
import './App.css'; // スタイルの読み込み

const App = () => {
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    // データの取得ロジックを追加
    setProductsData(products);
  }, []);

  return (
    <div className="app"> {/* クラス名を追加 */}
      <h1>Product List</h1>
      <ProductList products={productsData} />
    </div>
  );
};

export default App;
