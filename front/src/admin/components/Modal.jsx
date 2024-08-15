import React from 'react';
import '../css/modal.css'

export default function Modal () {
  return (
    <div>
      <div className='a-modal-content-box'>
        <h2>삭제</h2>
        <p>해당 사진을 삭제 하시겠습니까</p>
        <button className='a-modal-btn' type='button'>삭제하기</button>
      </div>
    </div>
  );
}