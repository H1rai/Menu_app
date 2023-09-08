import React, { useState } from 'react';
import '../styles/Modal.css';
import axios from 'axios';


const Modal = ({ isOpen, onClose }) => {
    const currentDate = new Date(); // 現在の日付を取得
    const year = currentDate.getFullYear(); // 年を取得
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // 月を取得し、2桁のゼロパディング
    const day = currentDate.getDate().toString().padStart(2, '0'); // 日を取得し、2桁のゼロパディング
    const formattedDate = `${year}-${month}-${day}`; // フォーマットされた日付
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedDate, setSelectedDate] = useState(formattedDate); // 今日の日付を初期値とする
    const [selectedCategory, setSelectedCategory] = useState('主菜');
    const [selectedTime, setSelectedTime] = useState('朝');
    const [selectedMenuName, setSelectedMenuName] = useState('');
    const [isFavorite, setIsFavorite] = useState(false);
    const [memo, setMemo] = useState('');
    const [isLoading, setIsLoading] = useState(false); // ローディングステート
    

  
    const handleImageUpload = (event) => {
      if (event.target.files && event.target.files[0]) {
        setSelectedImage(event.target.files[0]);
      }
    };
  
    const handleAddItem = async () => {
      let imageUrl = '';
      setIsLoading(true);

      
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
          setIsLoading(false);
          const getDataResponse = await axios.post('https://menu-apps-api.vercel.app/get_data', {
            sheet: 'mocha',
          });
          const newDataJson = getDataResponse.data.data;
          console.log(newDataJson)




        } else {
          console.error('アイテムの追加に失敗しました');
        }
      } catch (error) {
        console.error('ネットワークエラー', error);
      }finally{
        handleClose();
        // ローディング要素を非表示にする
        setIsLoading(false);
      }
      
      
    };
  
    const handleClose = () => {
      setSelectedImage(null);
      setSelectedDate(new Date().toLocaleDateString());
      setSelectedCategory('');
      setSelectedTime('');
      setIsLoading(false);
      setMemo('');
      onClose();
    };
  
    if (!isOpen) {
      return null;
    }
  
    return (
      <div>
      {isLoading && <div className="loading">登録中です...</div>}

      <div className="modal-overlay">
        <div className="modal">  
          <div className="modal-content">
          <div className='close' onClick={handleClose}>キャンセル</div>
            <div className="modal-item">
              <input type="date" placeholder='日付を選択してね！' value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
            </div>
            <div className="modal-item">
              <input type="text" placeholder='メニュー名を入力してね！' value={selectedMenuName} onChange={(e) => setSelectedMenuName(e.target.value)} />
            </div>
            <div className="modal-item">
            <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                <option>主菜</option>
                <option>副菜</option>
                <option>その他</option>
              </select>
            </div>
            <div className="modal-item">
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
              <textarea placeholder='メモがあれば入力してね！' value={memo} onChange={(e) => setMemo(e.target.value)} />
            </div>
          </div>
  
          
          <button onClick={handleAddItem} className="add-modal-button">追加</button>
        </div>
      </div>
      </div>
    );
  };
  
  export default Modal;