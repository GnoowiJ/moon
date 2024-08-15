import React, { useEffect, useState } from "react";
import TitleImage from "../../components/TitleImage.jsx";
import MoonDetail from "../../components/guestroom/MoonDetail.jsx";
import Roominfo from "../../components/guestroom/Roominfo.jsx";
import Roomweek from "../../components/guestroom/Roomweek.jsx";
import Photoinfo from "../../components/guestroom/Photoinfo.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Room() {
  const [roomDetail, setroomDetail] = useState([]);
  const { rid } = useParams();
  // let roomDetailIsRoom1 = '';
  // let roomDetailIsRoom0 = '';

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
  // const videoSrc = roomDetail1.video ? roomDetail1.video : "";

  return (
    <div>
      <TitleImage
        img={roomDetail1.r_banner}
        title={roomDetail1.r_id}
      />
      <div className="room-container">
        <MoonDetail
          title={roomDetail1.r_id}
          info={roomDetail1.rd_info}
          initpeople={roomDetail1.init_people}
          maxpeople={roomDetail1.max_people}
          img1={roomDetail1.img1}
          img2={roomDetail1.img2}
          img3={roomDetail1.img3}
          img4={roomDetail1.img4}
          img5={roomDetail1.img5}
          rdsize={roomDetail1.rdsize}
        />
        <Photoinfo into={"사진을 클릭하시면 크게 보실 수 있습니다."} />
      </div>

      <div className="room-container">
        <Roomweek room={roomDetail1.r_id} />
        <Roominfo
          livingroominfo={roomDetail1.livingroom}
          bedroominfo={roomDetail1.bedroom}
          kitcheninfo={roomDetail1.kitchen}
          bathroominfo={roomDetail1.bathroom}
          zacuziinfo={roomDetail1.zacuzi}
          tubinfo={roomDetail1.tub}
          poolinfo={roomDetail1.pool}
        />
      </div>

      {roomDetail1.video && <div className="room-video">
        <video controls autoPlay loop muted key={roomDetail1.video}>
          <source
            src={roomDetail1.video}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>}

      {roomDetailIsRoom0.map((arr) => (
        <div className="room-container">
          <MoonDetail
            title={arr.rd_name}
            info={arr.rd_info}
            img1={arr.img1}
            img2={arr.img2}
            img3={arr.img3}
            img4={arr.img4}
            img5={arr.img5}
            rdsize={arr.rdsize}
          />
          <Photoinfo into={"사진을 클릭하시면 크게 보실 수 있습니다."} />
        </div>
      )
      )
      }

      {/* <div className="room-container">
        <MoonDetail
          title={"개별 정원"}
          info={
            "제주스러운 돌담을 쌓은 정원에서 불멍과 바비큐를 즐기실 수 있습니다."
          }
          img1={"http://woljeongyeonga.com/uploads/room/a101/garden/1.jpg"}
          img2={"http://woljeongyeonga.com/uploads/room/a101/garden/2.jpg"}
          img3={"http://woljeongyeonga.com/uploads/room/a101/garden/3.jpg"}
          img4={"http://woljeongyeonga.com/uploads/room/a101/garden/4.jpg"}
          size={""}
        />
        <Photoinfo into={"사진을 클릭하시면 크게 보실 수 있습니다."} />
      </div> */}
    </div>
  );
}
