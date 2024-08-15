import React, { useState } from 'react';
import PhotoInput from './PhotoInput';
import axios from 'axios';

export default function GalleryImgUp({ handleShow, isAdmin }) {

  const [image, setImage] = useState({});


  /* 파일업로드 파라미터 함수 : getImage */
  const getImage = (e) => {
    console.log(e);
    setImage(e)
  }
  console.log('image-->', image);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    })
    if (isAdmin) {
      formDataObject.gname = '관리자';
      formDataObject.grev = 'admin';
    }

    console.log('formdata==>', formData);

    //if(validateCheck()) {
    // console.log('submit==>>', productData);
    //서버연동
    const url = "http://127.0.0.1:8080/gallery/new";
    axios({
      method: "post",
      url: url,
      data: formDataObject
    })
      .then(res => {
        // const result = res.data;  // {cnt: 1}
        if (res.data.cnt === 1) {
          alert("사진이 등록되었습니다.");
          handleShow()
        } else {
          if (isAdmin) {
            alert("사진을 등록해주세요");
          } else {
            alert("예약자 성함 및 예약번호를 확인하세요");
          }

        }
      })
      .catch(error => console.log(error));
    //}
  }

  return (
    <div className='modal-up-box'>
      <div className='modal-up-content'>
        <form onSubmit={handleSubmit} className='modal-upload-box'>
          {!isAdmin ?
            <>
              <div className='upload'>
                예약자 성함 : <input className='up-name up-input' name='gname' type="text" />
              </div>
              <div className='upload'>
                예약번호 : <input className='up-renum up-input' name='grev' type="text" />
              </div>
            </>
            :
            <>
              <div className='a-upload'></div>
            </>
          }
          <PhotoInput getImage={getImage} />
          <input type="hidden"
            name="uploadImage"
            value={image.uploadImage}
          />
          <input type="hidden"
            name="orgImage"
            value={image.orgImage}
          />
          <div>
            <button className="up-btn" type='submit'>등록하기</button>
            <button className="up-btn" onClick={handleShow} type='button'>닫기</button>
          </div>
        </form>
      </div>
    </div>
  );
}