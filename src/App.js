import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ProductCard from './components/ProductCard';
import Modal from './components/Modal'; // Modalコンポーネントをインポート

function App() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onUpdateData = (newData) => {
    setProducts(newData);
    // モーダルを閉じる
    setIsModalOpen(false);
  };


 

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };



  return (
    <div className="App">
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} onUpdateData={onUpdateData} />}
      {products.map((product, index) => (
        <ProductCard
          id={`productCard_${index}`}
          key={index}
          imageSrc={product.link}
          title={product.name}
          description={product.memo}
          date={product.date}
          time={product.time}
          // favorite={product.favorite}
          index={index}
        />
      ))}
      <button className="add-button" onClick={openModal}>
        +
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default App;
