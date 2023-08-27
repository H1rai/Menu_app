import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ProductCard from './components/ProductCard';
import Header from './components/Header'; // 追加

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('https://menu-apps-api.vercel.app/get_data', { sheet: 'mocha' });
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <Header />
      {products.map((product, index) => (
        <ProductCard
          key={index}
          imageSrc={product.link}
          title={product.name}
          description={product.memo}
          date={product.date}
        />
      ))}
    </div>
  );
}

export default App;
