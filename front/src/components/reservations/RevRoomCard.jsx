import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function RevRoomCard({ r_id, goNext }) {
  const [roomInfo, setRoomInfo] = useState({});
  const [roomDetailsInfo, setRoomDetailsInfo] = useState([]);
  useEffect(() => {
    const url = 'http://127.0.0.1:8080/rev/get/roominfo';
    const url1 = 'http://127.0.0.1:8080/rev/get/roomdetailsinfo';
    const data = r_id;
    try {
      axios({
        method: 'post',
        url: url,
        data: data,
      }).then((res) => {
        setRoomInfo(res.data[0]);
      });
    } catch (error) {
      console.log(error);
    }
    try {
      axios({
        method: 'post',
        url: url1,
        data: data,
      }).then((res) => {
        setRoomDetailsInfo(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div
      className="rev-card"
      onClick={() => goNext(roomInfo.r_id)}
      key={roomInfo.r_id}
    >
      <div className="rev-card-imgbox">
        <p className="rev-hover">
          실시간
          <br />
          예약하기
        </p>
        <img src={roomInfo.r_banner} alt="room img" />
      </div>
      <h3>{roomInfo.r_id}</h3>
      <p>
        기준 {roomInfo.ini_people}명 ~ 최대 {roomInfo.max_people}명
        <br />
        {roomInfo.ini_people === roomInfo.max_people ? '◦ 초과인원불가' : ''}
      </p>
      {roomDetailsInfo.map((rd_name) => (
        <p>◦ {rd_name.rd_name}</p>
      ))}
    </div>
  );
}
