// Modal.js
import React from 'react';
import Modal from 'react-modal';

// スタイルオブジェクトを定義
const customStyles = {
  overlay: {
    position: 'unset', // Overlayのpositionをunsetに設定
  },
  height:'50%'
  // 他のスタイルもここで定義可能
};

Modal.setAppElement('#root');

const CustomModal = ({ isOpen, closeModal, selectedDate }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="選択された日付の詳細"
      style={customStyles} // カスタムスタイルを適用
    >
      {selectedDate && (
        <div>
          <h2>{selectedDate.date.toLocaleDateString()}</h2>
          <ul>
            {selectedDate.events.map((event, index) => (
              <li key={index}>{event.title}</li>
            ))}
          </ul>
          <button onClick={closeModal}>閉じる</button>
        </div>
      )}
    </Modal>
  );
};

export default CustomModal;
