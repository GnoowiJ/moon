import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Roomlist from '../../components/guestroom/Roomlist';
import Photoinfo from '../../components/guestroom/Photoinfo';
import axios from 'axios';

export default function Guestroomlocation() {

  const [roomList, setRoomList] = useState([])

  useEffect(() => {
    axios.get("http://localhost:8080/guestroomlocation")
      .then(result => setRoomList(result.data))
      .catch(error => console.log(error))
  }, [])

  console.log('roomList', roomList)

  return (
    <div>
      <div className='map-container'>
        <div className='wrap'>
          <img src="http://woljeongyeonga.com/uploads/room/map/map.jpg" useMap="#roommap" alt="map" />
          <map name="roommap">
            <Link to={"/room/A101"}><area shape="rect" coords="880,663,980,760" href="" alt="A101" /></Link>
            <Link to={"/room/A102"}><area shape="rect" coords="1094,660,1186,723" href="" alt="A102" /></Link>
            <Link to={"/room/A201"}><area shape="rect" coords="924,469,1009,531" href="" alt="A201" /></Link>
            <Link to={"/room/A201"}><area shape="rect" coords="1038,468,1129,528" href="" alt="A201" /></Link>
            <Link to={"/room/A201"}><area shape="rect" coords="1159,467,1238,531" href="" alt="A201" /></Link>
            <Link to={"/room/B105"}><area shape="rect" coords="472,219,560,279" href="" alt="B105" /></Link>
            <Link to={'/room/B106'}><area shape="rect" coords="290,222,370,278" href="" alt="B106" /></Link>
            <Link to={"/room/B205"}><area shape="rect" coords="494,84,567,151" href="" alt="B205" /></Link>
            <Link to={"/room/B205"}><area shape="rect" coords="416,83,480,151" href="" alt="B205" /></Link>
            <Link to={"/room/B205"}><area shape="rect" coords="322,88,396,154" href="" alt="B205" /></Link>
            <Link to={"/Cafe"}><area shape="rect" coords="514,502,614,618" href="" alt="Cafe" /></Link>
            {/* Add more area tags for other rooms as needed */}
          </map>
          <div className='title'>
            <h1>객실 위치 안내</h1>
          </div>
          <Photoinfo into={"객실명을 클릭하시면 객실로 연결 됩니다."} />
        </div>
      </div>
      <div className='room-preview'>

        <h2 className='title'>객실 미리보기</h2>
        <div className="room-box-wrap">
          {roomList.map((list, index) => (
            <Roomlist
              key={list.r_id}
              roompath={`/room/${list.r_id}`}
              img={list.r_banner}
              room={list.r_id}
              info1={list.zacuzi && "테라스 자쿠지"}
              info2={list.tub && "테라스 욕조"}
              info3={list.pool && "야외 수영장"}
              initpeople={list.init_people}
              maxpeople={list.max_people}
              index={index} // 인덱스를 전달
            />
          ))}
        </div>
        {/* <div className="room-box-wrap">
          <Roomlist
            roompath={"/b106"}
            img={"http://woljeongyeonga.com/uploads/room/map/b105.jpg"}
            room={"B 106"}
            info={"테라스 자쿠지 & 돌담 마당"}
            people={'기준 2 / 최대 3인'}
            />
        </div> */}
      </div>
    </div>
  );
}
