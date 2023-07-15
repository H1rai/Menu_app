import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import products from './data/products';
import './App.css'; // スタイルの読み込み

const App = () => {
  const [productsData, setProductsData] = useState([]);
  const [currentMonth, setCurrentMonth] = useState('');



  useEffect(() => {
    // データの取得ロジックを追加
    const currentDate = new Date();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    setCurrentMonth(month);
    setProductsData(products);
  }, []);
  
  return (
    <div className="app">
    <div className="navigation">
      <button className="prev-button">前へ</button>
      <h1>{currentMonth}のメニュー</h1>
      <button className="next-button">次へ</button>
    </div>
      <ProductList products={productsData} />
    </div>
  );
};

export default App;
