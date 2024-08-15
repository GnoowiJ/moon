import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from "swiper/modules";
import 'swiper/css';
import ImageModal from '../components/ImageModal';
import axios from 'axios';

export default function Home() {
  const [isShow, setIsShow] = useState(false);
  const [isAni, setIsAni] = useState(false);
  const [upAni, setUpAni] = useState(false);
  const [popImg, setPopImg] = useState([]);
  const [isClose, setIsClose] = useState({});
  // const [pop, setPop] = useState(false);

  const linkModal = () => {
    setIsShow(!isShow);
  };

  const num = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  useEffect(() => {
    const handleAni = () => {
      if (window.scrollY > 300) {
        setIsAni(true);
      } else if (window.scrollY < 600) {
        setIsAni(false);
      }

      if (window.scrollY > 1800) {
        setUpAni(true);
      } else if (window.scrollY < 2200) {
        setUpAni(false);
      }
    };
    window.addEventListener("scroll", handleAni);
    return () => {
      window.removeEventListener("scroll", handleAni);
    };
  }, []);

  const closeTodayPop = (e) => {
    const id = e.target.name;
    const now = new Date();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
    localStorage.setItem(`homeVisited_${id}`, endOfDay.toString());
    setIsClose({ ...isClose, [id]: true });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:8080/home");
        setPopImg(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const today = new Date();
    const initialCloseState = popImg.reduce((acc, _, index) => {
      const id = `is${index + 1}`;
      const homeVisited = localStorage.getItem(`homeVisited_${id}`);
      const hideDate = homeVisited ? new Date(homeVisited) : null;

      acc[id] = homeVisited && today < hideDate;
      return acc;
    }, {});

    setIsClose(initialCloseState);
  }, [popImg]);

  const popupClose = (e) => {
    const id = e.target.name;
    setIsClose({ ...isClose, [id]: true });
  };
  return (
    <div>
      {isShow ? <ImageModal linkModal={linkModal} /> : null}
      <div className='main-img-box'>
        <div className='main-popup'>
          {
            popImg ? 
            popImg.map((popList, index)=>(
              <div key={index} style={{display: isClose[`is${index+1}`] ? 'none' : 'block'}}>
                <img className='main-popimg' src={`http://localhost:8080/${popList.p_img}`} alt="" />
                <div className='popup-btnbox'>
                  <button onClick={closeTodayPop} name={`is${index+1}`} className='popup-today' type='button'>오늘 하루 그만보기</button>
                  <button onClick={popupClose} name={`is${index+1}`} className='popup-close' type='button'>닫기</button>
                </div>
              </div>
            ))
              :
              null
          }
        </div>
        <Swiper
        className='home-swiper'
              modules={[Pagination, Autoplay]}
              slidesPerView={1}
              loop={true}
              autoplay={{delay: 2500,
                disableOnInteraction: false,}}
              pagination={{ clickable: true }}>
        <SwiperSlide>       
        <div>
          <img className='main-img' src="http://woljeongyeonga.com/uploads/main/slide/1.jpg?v1" alt="" />
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div>
          <img className='main-img' src="http://woljeongyeonga.com/uploads/main/slide/2.jpg?v1" alt="" />
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div>
          <img className='main-img' src="http://woljeongyeonga.com/uploads/main/slide/3.jpg?v1" alt="" />
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div>
          <img className='main-img' src="http://woljeongyeonga.com/uploads/main/slide/4.jpg?v1" alt="" />
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div>
          <img className='main-img' src="http://woljeongyeonga.com/uploads/main/slide/5.jpg?v1" alt="" />
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div>
          <img className='main-img' src="http://woljeongyeonga.com/uploads/main/slide/6.jpg?v1" alt="" />
        </div>
        </SwiperSlide>
        </Swiper>
      </div>
      <div>
        { isAni &&
        <div className='home-mini-imgbox'>
          <div className='home-mini-left left'>
            <img className='home-mini-img' src="http://woljeongyeonga.com/uploads/main/introduction/a/about/left.jpg" alt="" />
          </div>
          <div className='home-mini-right right'>
            <img className='home-mini-img' src="http://woljeongyeonga.com/uploads/main/introduction/a/about/right.jpg" alt="" />
            <div className='right-box'>
              <div className='right-box-title'>
                <img src="http://woljeongyeonga.com/uploads/main/introduction/a/about/title.svg" alt="" />
              </div>
              <div className='right-box-text'>
                달이 머무는 제주도 월정리 감성 Stay 월정연가입니다.
                <br />
                달이 머무는 아름다운 바다 제주도 동쪽 월정리 해변에 위치한
                <br />
                제주도 감성 펜션 월정 연가에 오신 것을 환영합니다.
                <br />
                월정 연가는 건축가인 대표가 제주스러움을 최대한 표현하기 위해
                <br />
                자재와 소품 하나하나 직접 고르고, 정성을 들여 리모델링 한
                <br />
                제주도를 온전히 느낄 수 있는 완벽한 감성 숙소입니다.
                <br />
                바쁘고 지친 일상에서 벗어나 잠시 여유와 휴식을 즐기며
                <br />
                제주도에서 잊지 못할 가장 아름다운 추억을 만들 수 있도록
                <br />
                최선을 다하겠습니다.
              </div>
            </div>
          </div>
        </div>
        }
      </div>
      <div className='home-fix'>
        <div className='home-fix-box'>
          <div className='fix-layer'></div>
          <img className='home-fix-img' src="http://woljeongyeonga.com/uploads/main/introduction/model.jpg" alt="" />
        </div>
        <div className='fix-wrap'>
          <div></div>
        </div>
      </div>
      <div className='home-about-box'>
        { upAni &&
        <div className='up'>
          <h2 className='home-about-title'>달이 머무는 감성 STAY, 월정연가</h2>
          <p className='home-about-text'>
            월정리 펜션 월정연가를 방문하시는 다양한 고객님들을 만족시켜 드리기 위해 스토리 있는 테마별로 객실을 구성하였습니다.
            <br />
            1층 객실은 2~6인의 가족 또는 친구 모임 고객님들이 이용하기 좋은 풀빌라 펜션으로 사계절 이용 가능한 단독 야외 온수풀 수영장과 테라스, 자쿠지욕조
            <br />
            그리고 가장 제주스러운 돌담 마당에서 바비큐와 불멍을 이용할 수 있도록 준비하였습니다.
            <br />
            2층 객실은 조용하게 휴식과 힐링을 원하는 커플과 신혼부부 그리고 2~4인의 private한 공간을 원하는 고객님들이 편히 쉴 수 있도록 전 객실을 복층형으로 구성하였고
            <br />
            120인치 대형스크린과 빔프로젝터를 설치하여 마치 소극장에서 영화를 감상하는듯한 분위기를 연출하였으며, 2층 일부 객실 테라스에는 테라스 욕조를
            <br />
            그리고 다른 일부 객실에서는 테라스 바비큐를 이용하도록 하였습니다.
            <br />
            객실 건물 바로 옆 공용 주방(식당) 에서는 월정 연가 숙박 고객님들의 소통과 편의를 위하여 간단한 주류와 커피를 이용할 수 있도록 준비하였습니다.
          </p>
        </div>
        }
      </div>
      <div>
        <div className='home-img-box'>
          <p className='img-info-text'>사진을 클릭하시면 크게 보실 수 있습니다.</p>
          <div className='home-img-list'>
            { 
              num.map((x, index) => (
                <div onClick={linkModal} className="img-link" data-src={index}>
                  <img className='home-img' src={`http://woljeongyeonga.com/uploads/main/introduction/a/sero/${x}.jpg`} alt="" />
                </div>
            )) }
          </div>
        </div>
      </div>
    </div>
  );
}