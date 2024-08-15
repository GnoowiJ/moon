import React, { useEffect } from 'react';
import '../css/gallerymanage.css'
import { useState } from 'react';
import '../css/modal.css';
import GalleryImgUp from '../../components/gallery/GalleryImgUp.jsx';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getGalList } from '../../redux/modules/reduxGalListAxios.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { getAdmin } from '../../util/localStorage.js';
import Error404 from '../../components/Error404.jsx';

export default function Gallerymanage() {
  const [imgList, setImgList] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const dispatch = useDispatch();
  const galleryList = useSelector(state => state.gal.galList)
  const adminCheck = getAdmin();

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
  }, [isShow, confirm])




  const deleteImg = (e) => {
    const deleteName = e.currentTarget.name
    const result = window.confirm('해당 사진을 삭제하시겠습니까?')
    if (result) {
      axios({
        method: "post",
        url: "http://127.0.0.1:8080/gallery/deleteImg",
        data: {
          gid: deleteName
        }
      }
      )
        .then(result => {
          if (result.data.cnt) {
            alert('삭제되었습니다.');
            setConfirm(!confirm)
          }
        })
        .catch(error => console.log(error))
    }
  }




  const handleShow = () => {
    setIsShow(!isShow)
  }


  if (adminCheck) {
    return (
      <div className='gallerymanage-box a-outle'>
        {isShow ? <GalleryImgUp handleShow={handleShow} isAdmin={true} /> : null}
        <div className='gallery-img-box'>
          <div className='gallery-img-content'>
            {galleryList.map((list) => (
              <div className='gallery-img-link'>
                <img className='gallery-img' src={`http://localhost:8080/${list.g_img}`} alt="" />
                <div className='a-delete-box'>
                  <div>
                    <p>이름 : {list.g_name}
                      <br />
                      예약번호 : {list.rev_id}
                      <br />
                      등록일자 : {list.gdate}
                    </p>
                  </div>
                  <button onClick={deleteImg} name={list.g_id} className='img-delete-btn' type='button'><FontAwesomeIcon icon={faTrash} /></button>
                </div>
              </div>
            ))
            }
          </div>
          <button onClick={handleShow} className='a-gallery-btn btn-green' type='button'>사진 등록하기</button>
        </div>
      </div>
    );
  }
  else return <Error404 message={"로그인이 필요한 페이지 입니다."} isAdmin={true} />
}