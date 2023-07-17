import React from 'react';

const Modal = ({ date, closeModal }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{date.toDateString()}</h2>
        <p>This is the modal content.</p>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
