import React, { useState } from 'react';
import PopupInput from './PopupInput.jsx';
import axios from 'axios'

export default function PopupImgUp ({handleShow}) {

  const [image, setImage] = useState({});


  /* 파일업로드 파라미터 함수 : getImage */
  const getImage = (e) => {
    setImage(e)
  }

  const handleSubmit = (e) => {
    console.log(e.target);
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObject = {};
    if(!formData){
      alert("사진을 등록해주세요")
    }else{
      formData.forEach((value, key) => {
        formDataObject[key] = value;
      })
    }

    //if(validateCheck()) {
      // console.log('submit==>>', productData);
      //서버연동
      const url = "http://127.0.0.1:8080/popup";
      axios({
        method: "post",
        url: url,
        data: formDataObject
      })
        .then(res => {
          // const result = res.data;  // {cnt: 1}
          if(res.data.cnt === 1) {
            alert("사진이 등록되었습니다.");
            handleShow()
          }else{
            alert("사진을 등록해 주세요")
          }
        })
        .catch(error => console.log(error));
    //}
  }


  return (
      <div className='popup-box'>
        <div className='popup-content'>
          <form onSubmit={handleSubmit} className='pop-upload-box'>
            <div className='upload'>
              <div className='popup-input'>
                <h2>팝업 사진 등록</h2>
                <PopupInput getImage={getImage} />
                <input type="hidden" 
                      name="uploadImage"
                      value={image.uploadImage}
                      />
                <input type="hidden" 
                      name="orgImage"
                      value={image.orgImage}
                      />
              </div>            
            </div>
            <div>
              <button className="up-btn" type='submit'>등록하기</button>
              <button className="up-btn" onClick={handleShow} type='button'>닫기</button>
            </div>
          </form>
        </div>
      </div>
  );
}