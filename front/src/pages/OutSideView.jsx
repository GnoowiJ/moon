import React from 'react';
import MoonDetail from '../components/guestroom/MoonDetail.jsx';
import TitleImage from '../components/TitleImage.jsx';
import Photoinfo from '../components/guestroom/Photoinfo.jsx';
import '../css/outsideview.css';

export default function OutSideView() {

  return (
    <div>
      <TitleImage img={"http://woljeongyeonga.com/uploads/landscape/top/1.jpg"} title={"외부전경"} />
      <div className='outsideview-container' >
        <MoonDetail
          title={"외부전경"}
          info={
            "월정연가는 건축가인 대표가 제주스러움을 최대한 표현하기 위해 자재와 소품 하나하나 직접 고르고, 정성을 들여 리모델링한 제주도를 온전히 느낄 수 있는 완벽한 감성 숙소입니다. 월정리 펜션 월정 연가를 방문하시는 다양한 고객님들을 만족시켜 드리기 위해 스토리 있는 테마별로 객실을 구성하였습니다"
          }
          img1={"http://woljeongyeonga.com/uploads/landscape/slide/1.jpg"}
          img2={"http://woljeongyeonga.com/uploads/landscape/slide/2.jpg"}
          img3={"http://woljeongyeonga.com/uploads/landscape/slide/3.jpg"}
          img4={"http://woljeongyeonga.com/uploads/landscape/slide/4.jpg"}
          img5={null}
        />
        <Photoinfo into={"사진을 클릭하시면 크게 보실 수 있습니다."} />
      </div>
      <div className='outsideview-video' >
        <video controls autoPlay loop muted>
          <source
            src="http://woljeongyeonga.com/uploads/mov/landscape.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
