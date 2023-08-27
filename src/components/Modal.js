import React, { useState } from 'react';
import '../styles/Modal.css';

const Modal = ({ isOpen, onClose }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedMenuName, setSelectedMenuName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [isFavorite, setIsFavorite] = useState(false);
    const [memo, setMemo] = useState('');
  
    const handleImageUpload = (event) => {
      if (event.target.files && event.target.files[0]) {
        setSelectedImage(event.target.files[0]);
      }
    };
  
    const handleAddItem = async () => {
      let imageUrl = '';
  
      // 画像をアップロード
      if (selectedImage) {
        const formData = new FormData();
        formData.append('image', selectedImage);
  
        try {
          const response = await fetch('https://menu-image-api.vercel.app/upload', {
            method: 'POST',
            body: formData,
          });
  
          if (response.ok) {
            const responseData = await response.json();
            imageUrl = responseData.url; // アップロードした画像のURLを取得
          } else {
            console.error('画像のアップロードに失敗しました');
            return;
          }
        } catch (error) {
          console.error('ネットワークエラー', error);
          return;
        }
      }
  
      // メニューのデータを構築
      const menuData = [
        {
          kinds: selectedCategory,
          name: selectedMenuName,
          memo: memo,
          link: imageUrl, // ここでアップロードした画像のURLを指定
        },
      ];
  
      // APIに送信するデータを構築
      const requestData = {
        date: selectedDate,
        menu: menuData,
        time: selectedTime,
        favorite: isFavorite ? 1 : 0,
        sheet: 'mocha',
      };
  
      // APIにデータを送信
      try {
        const response = await fetch('https://menu-apps-api.vercel.app/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });
  
        if (response.ok) {
          console.log('アイテムが追加されました');
        } else {
          console.error('アイテムの追加に失敗しました');
        }
      } catch (error) {
        console.error('ネットワークエラー', error);
      }
  
      // モーダルを閉じる
      handleClose();
    };
  
    const handleClose = () => {
      setSelectedImage(null);
      setSelectedDate('');
      setSelectedMenuName('');
      setSelectedCategory('');
      setSelectedTime('');
      setIsFavorite(false);
      setMemo('');
      onClose();
    };
  
    if (!isOpen) {
      return null;
    }
  
    return (
      <div className="modal-overlay">
        <div className="modal">
          <h2>新しいアイテムを追加</h2>
  
          <div className="modal-content">
            <div className="modal-item">
              <label>日付</label>
              <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
            </div>
            <div className="modal-item">
              <label>メニュー名</label>
              <input type="text" value={selectedMenuName} onChange={(e) => setSelectedMenuName(e.target.value)} />
            </div>
            <div className="modal-item">
              <label>種別</label>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                <option>主菜</option>
                <option>副菜</option>
                <option>その他</option>
              </select>
            </div>
            <div className="modal-item">
              <label>時刻</label>
              <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
                <option>朝</option>
                <option>昼</option>
                <option>夜</option>
              </select>
            </div>
            <div className="modal-item">
              <label>お気に入り</label>
              <input type="checkbox" checked={isFavorite} onChange={() => setIsFavorite(!isFavorite)} />
            </div>
            <div className="modal-item">
              <label>画像アップロード</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {selectedImage && (
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="選択した画像のプレビュー"
                  className="image-preview"
                />
              )}
            </div>
            <div className="modal-item">
              <label>メモ</label>
              <textarea value={memo} onChange={(e) => setMemo(e.target.value)} />
            </div>
          </div>
  
          <button onClick={handleClose}>閉じる</button>
          <button onClick={handleAddItem} className="add-modal-button">追加</button>
        </div>
      </div>
    );
  };
  
  export default Modal;