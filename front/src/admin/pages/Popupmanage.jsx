import React, { useEffect, useState } from "react";
import "../css/popup.css";
import PopupImgUp from "../components/popup/PopupImgUp";
import axios from 'axios';
import { getAdmin } from "../../util/localStorage";
import Error404 from "../../components/Error404";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function Popupmanage() {
  const [isShow, setIsShow] = useState(false);
  const [imgList, setImgList] = useState([]);
  const [confirm, setConfirm] = useState(false);
  const adminCheck = getAdmin();

  useEffect(() => {
    axios({
      method: "post",
      url: "http://127.0.0.1:8080/popup/popupList"
    })
      .then((result) => {
        setImgList(result.data)
      })
      .catch(error => console.log(error))
  }, [isShow, confirm])



  const deletePopup = (e) => {
    const deleteName = e.currentTarget.name
    const deleteBtn = parseInt(e.currentTarget.id) + 1
    console.log('deleteBtn', deleteBtn)
    const result = window.confirm('해당 사진을 삭제하시겠습니까?')
    if (result) {
      axios({
        method: "post",
        url: "http://127.0.0.1:8080/popup/popupdelete",
        data: {
          pid: deleteName
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
      localStorage.removeItem(`homeVisited_is${deleteBtn}`)
  }

  const handleShow = () => {
    setIsShow(!isShow);
  };
  if (adminCheck) {
    return (
      <div className="a-outlet flex-col">
        {isShow ? <PopupImgUp handleShow={handleShow} /> : null}
        <div className="pop-regi">
          <h2>팝업 목록</h2>
          <button onClick={handleShow} className="btn-green pop-btn" type="button">
            이미지 등록
          </button>
        </div>
        <div className="pop-grid">
          {
            imgList.map((list, index) => (
              <div className="grid-box">
                <img
                  className="pop-grid-img"
                  src={`http://localhost:8080/${list.p_img}`}
                  alt=""
                />
                <div className="pop-delete-box" >
                  <button onClick={deletePopup} id={index} name={list.p_id} className="pop-dbtn" type="button">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    );
  } else return <Error404 message={'로그인이 필요한 페이지 입니다.'} isAdmin={true} />
}
