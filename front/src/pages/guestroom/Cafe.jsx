import React from 'react';
import TitleImage from '../../components/TitleImage.jsx';
import MoonDetail from '../../components/guestroom/MoonDetail.jsx';
import Photoinfo from '../../components/guestroom/Photoinfo.jsx';

export default function Cafe() {
  return (
    <div>
      <TitleImage
        img={"http://woljeongyeonga.com/uploads/room/cafe/top/1.jpg"}
        title={"CAFE"}
      />
      <div className='room-container'>
        <MoonDetail
          title={"CAFE"}
          info={"객실 건물 바로 옆 카페(공용 주방)에서는 월정 연가 숙박 고객님들의 소통과 편의를 위하여 간단한 주류와 커피를 이용할 수 있도록 준비하였습니다."}
          people={"카페(공용 주방)는 09:00~23:00까지 이용 가능하며 와인, 샴페인, 양주 등 주류와 간단한 안주 이용 가능합니다."}
          img1={"http://woljeongyeonga.com/uploads/room/cafe/slide/1.jpg"}
          img2={"http://woljeongyeonga.com/uploads/room/cafe/slide/2.jpg"}
          img3={"http://woljeongyeonga.com/uploads/room/cafe/slide/3.jpg"}
          img4={"http://woljeongyeonga.com/uploads/room/cafe/slide/4.jpg"}
          img5={"http://woljeongyeonga.com/uploads/room/cafe/slide/5.jpg"}
        />
        <Photoinfo into={"사진을 클릭하시면 크게 보실 수 있습니다."} />
      </div>

    </div>
  );
}