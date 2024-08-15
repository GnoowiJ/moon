import React, { useState } from 'react';
import axios from 'axios';
import '../../../css/gallery.css'

export default function PopupInput ({getImage}) {
  const [imgFile, setImgFile] = useState([]);
  const [previewUrl, setPreviewUrl] = useState();

  const showImg = e => {
    const formData = new FormData();
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setImgFile(file);
      setPreviewUrl(reader.result)
    }
    if(file){
      reader.readAsDataURL(file);
    }
    formData.append("file", e.target.files[0])
    for(const key of formData) console.log(`key---->>> ${JSON.stringify(key)}`);

    
    axios.post('http://127.0.0.1:8080/upload/popup', formData)
      .then((result) => {
        getImage(result.data);
    });
  
  }




  return (
      <label className='last-input' htmlFor='up-img'>
        {previewUrl 
        ? <img className='p-input-img' src={previewUrl} alt="" /> 
        : <p>*해당 박스를 클릭하여 사진을 등록해 주세요</p>}
        <input 
        className='up-img up-input' 
        type="file" 
        accept='image/*'
        onChange={showImg}
        id='up-img'/>
      </label>
  );
}