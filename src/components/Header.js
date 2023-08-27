import React, { useState } from 'react';
import '../styles/Header.css';
import Modal from './Modal';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="header">
      <h1>商品アプリ</h1>
      <button className="add-button" onClick={openModal}>
        +
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Header;
