import React from 'react';
import './App.css';
import ProductCard from './components/ProductCard';
import products from './data'; // 追加

function App() {
  return (
    <div className="App">
      {products.map(product => (
        <ProductCard
          key={product.id}
          imageSrc={product.imageSrc}
          title={product.title}
          description={product.description}
          date={product.date}
        />
      ))}
    </div>
  );
}

export default App;
