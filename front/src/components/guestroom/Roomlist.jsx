import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { useParams } from "react-router-dom";
import { useIntersectionObserver } from "../modules/useIntersectionObserver";


export default function Roomlist({ roompath, img, room, info1, info2, info3, info4, initpeople, maxpeople, index }) {
  const [roomDetail, setroomDetail] = useState([]);
  const { rid } = useParams();
  // let roomDetailIsRoom1 = '';
  // let roomDetailIsRoom0 = '';

  const listRef = useIntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!entry.target.classList.contains('fade-in')) {
          entry.target.classList.add('fade-in');
        }
      } else {
        entry.target.classList.remove('fade-in')
      }
    })
  }, { threshold: 0.01 })

  useEffect(() => {
    axios.get(`http://127.0.0.1:8080/room/${rid}`)
      .then(response => {
        setroomDetail(response.data);
      })
      .catch(error => console.log(error));
  }, [rid])
  const roomDetailIsRoom1 = roomDetail.filter((detail) => detail.is_room === "1")[0];
  const roomDetailIsRoom0 = roomDetail.filter((detail) => detail.is_room === "0");
  const roomDetail1 = roomDetailIsRoom1 ? roomDetailIsRoom1 : {};

  return (
    <div ref={listRef} className={`room-box animation-${index % 2 === 0 ? 'left-two' : 'right-two'}`}>
      <Link to={roompath}><img src={img} alt={room} /></Link>
      <h3 className="roomlist-h3">{room}</h3>
      <p>{info1} {info2} {info3}</p>
      <p>기준 {initpeople}인 / 최대 {maxpeople}인</p>
    </div>
  );
}
