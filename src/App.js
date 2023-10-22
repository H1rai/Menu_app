import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ProductCard from './components/ProductCard';
import Modal from './components/Modal'; // Modalコンポーネントをインポート
import Header from './components/Header'

function App() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");


  const onUpdateData = (newData) => {
    setProducts(newData);
    // モーダルを閉じる
    setIsModalOpen(false);
  };

  const fetchData = async (date) => {
    try {
      const response = await axios.post('https://menu-apps-api.vercel.app/get_data', { sheet: 'mocha', month: date });
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const date = `${year}-${month}`;
    setFormattedDate(date); // formattedDate の初期値を設定
    

    fetchData(date);
  }, []);

  

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDateChange = (newDate) => {
    // 日付変更時に新しいデータを取得
    setFormattedDate(newDate);
    fetchData(newDate);
  };

  return (
    <div className="App">
      <Header onDateChange={handleDateChange} />
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} onUpdateData={onUpdateData} />}
      {products.map((product, index) => (
        <ProductCard
          id={`productCard_${index}`}
          key={index}
          imageSrc={product.link}
          title={product.name}
          description={product.memo}
          // date={product.date}
          // time={product.time}
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
