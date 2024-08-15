import React, { useEffect, useState } from 'react';
import TitleImage from '../components/TitleImage.jsx';
import { Link } from 'react-router-dom'
import GalleryImgUp from '../components/gallery/GalleryImgUp.jsx';
import { useDispatch, useSelector } from "react-redux";
import { getGalList } from '../redux/modules/reduxGalListAxios.js';


export default function Gallery() {
  const [imgList, setImgList] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const dispatch = useDispatch()
  const galleryList = useSelector((state) => state.gal.galList);
  // console.log('gallery', galleryList);



  useEffect(() => {
    dispatch(getGalList())
    // axios({
    //   method: "post",
    //   url: "http://127.0.0.1:8080/gallery/galleryList"
    // })
    // .then((result) => {
    //   setImgList(result.data)
    // })
    // .catch(error => console.log(error))
  }, [isShow, galleryList])
  // console.log('imgList =>', imgList);


  const handleShow = () => {
    setIsShow(!isShow)
  }


  return (
    <div>
      {isShow ? <GalleryImgUp handleShow={handleShow} /> : null}
      <TitleImage img="http://woljeongyeonga.com/uploads/main/slide/18.jpg?v1" title={"갤러리"} />
      <div className='gallery-img-box'>
        <h3 className='gallery-info-text'>여러분의 소중한 추억을 남겨주세요.</h3>
        <div className='gallery-img-content'>
          {
            galleryList.map((list) => (
              <Link className='gallery-img-link' to=""><img className='gallery-img' src={`http://localhost:8080/${list.g_img}`} alt="" /></Link>
            ))
          }
        </div>
        <button onClick={handleShow} className='gallery-btn' type='button'>사진 등록하기</button>
      </div>
    </div>
  );
}