import React, { useEffect, useRef, useState } from 'react';
import TitleImage from '../../components/TitleImage.jsx';


export default function Infonearby() {
  const [slideBox, setSlideBox] = useState({
    isShow: false,
    isShow2: false,
    isShow3: false
  })
  const ref = useRef(false)

  useEffect(() => {
    const handleAnimation = () => {
      if (100 < window.scrollY && window.scrollY < 600) {
        setSlideBox({
          isShow: true,
          isShow2: false,
          isShow3: false
        })
      }
      else if (600 < window.scrollY && window.scrollY < 1200) {
        setSlideBox({
          isShow: true,
          isShow2: true,
          isShow3: false
        })
      } else if (1200 < window.scrollY) {
        setSlideBox({
          isShow: true,
          isShow2: true,
          isShow3: true
        })
      }
    }
    window.addEventListener("scroll", handleAnimation)
    return () => {
      window.removeEventListener("scroll", handleAnimation)
    }
  }, [])


  return (
    <div>
      <TitleImage img="http://woljeongyeonga.com/uploads/main/slide/27.jpg?v1" title="주변 여행지" />
      <div className="nearby-contain">
        <h2>주변 여행지</h2>
        <div className='travel-box'>
          {slideBox.isShow &&
            <>
              <div className='travel-left left'>
                <div className='travel-img'>
                  <img src="http://woljeongyeonga.com/uploads/travel/1.jpg" alt="" />
                </div>
                <h3 className='travel-title'>월정리해변</h3>
                <p className='travel-desc'>
                  제주도의 동쪽에 위치하고 있는 마을인 "월정리"는 "달이 머무는 곳"이라는 뜻의 이름을 가진 서정적인 풍경의 마을입니다.
                  아름다운 에메랄드빛 바다가 한 폭의 그림처럼 펼쳐져 있고, 그 위에는 밝은 달이 비친다.
                  풍경화처럼 아름다운 월정리 해변을 방문한 여행객들은 저마다 다양한 방법으로 해변의 경치를 즐깁니다.
                  특히 수심이 얕은 편이기 때문에 아이를 동반한 가족들이 물놀이를 즐기기 좋습니다
                </p>
              </div>
              <div className='travel-right right'>
                <div className='travel-img'>
                  <img src="http://woljeongyeonga.com/uploads/travel/2.jpg" alt="" />
                </div>
                <h3 className='travel-title'>월정리투명카약</h3>
                <p className='travel-desc'>
                  제주 밭담 테마공원 앞에 위치한 "월정리 투명카약"은 카약 체험장으로서,
                  연인과 함께 아름다운 제주의 바다를 카약을 타며 즐길 수 있는 이색 체험 시설입니다.
                  투명한 바닥의 카약을 이용하여 맑은 바다를 감상할 수 있으며,
                  깊지 않은 수심과 바위에 둘러싸인 환경에서 파도의 위험이 적고 안전한 카약 체험을 할 수 있습니다.
                  구명조끼 등 안전 장비가 구비되어 있어 누구나 즐길 수 있는 체험입니다.
                  <br />
                  [출처:대한민국구석구석]
                </p>
              </div>
            </>
          }
          {slideBox.isShow2 &&
            <>
              <div className='travel-left left'>
                <div className='travel-img'>
                  <img src="http://woljeongyeonga.com/uploads/travel/3.jpg" alt="" />
                </div>
                <h3 className='travel-title'>김녕성세기해변</h3>
                <p className='travel-desc'>
                  김녕해수욕장은 하늘에서 바라본 모습이 한문 평(平) 자를 이룬 모양을 하고 있어 김녕이라고 불리는 해수욕장입니다.
                  거대한 너럭바위 용암 위에 모래가 쌓여 만들어졌으며,
                  성세기는 외세의 침략을 막기 위한 작은 성이라는 뜻이 담겨 있습니다.
                  하얀 모래에 부서지는 파도들이 시원한 소리를 내며,
                  코발트빛 바다 풍경이 제주 자연의 아름다움을 새삼 느끼게 합니다.
                </p>
              </div>
              <div className='travel-right right'>
                <div className='travel-img'>
                  <img src="http://woljeongyeonga.com/uploads/travel/4.jpg" alt="" />
                </div>
                <h3 className='travel-title'>비자림</h3>
                <p className='travel-desc'>
                  천연기념물로 지정보호되고 있는 비자림은 면적 448,165㎡에 500∼800년생 비자나무 2,800여 그루가 밀집하여 자생하는 곳입니다.
                  이 곳에는 높이가 7∼14m, 직경이 50∼110㎝에 이르는 거목들이 수관폭 10∼15m에 걸쳐 군집하고 있는 세계적으로 특별한 비자나무 숲이 형성되어 있습니다.
                </p>
              </div>
            </>
          }
          {slideBox.isShow3 &&
            <>
              <div className='travel-left left'>
                <div className='travel-img'>
                  <img src="http://woljeongyeonga.com/uploads/travel/5.jpg" alt="" />
                </div>
                <h3 className='travel-title'>김녕미로공원</h3>
                <p className='travel-desc'>
                  제주도 제주시의 유명한 관광지인 만장굴과 김녕사굴 사이에는 제주김녕미로가 위치해 있습니다.
                  이 미로는 키 큰 나무 사이로 샛길이 만들어져 한 번 들어가면 방향 감각을 잃게 되어 어디로 나와야 할지 헷갈리게 만드는 특별한 미로입니다.
                  이 미로는 제주대학교에서 퇴직한 미국인 교수인 더스틴(F.H. Dustin) 교수님이
                  1983년부터 손수 땅을 파고, 흙을 날려서 붓고, 나무를 심어 가꾼 것으로, 우리나라 최초의 미로 공원으로 알려져 있습니다.
                  또한 세계적으로 유명한 영국의 미로 디자이너인 에드린 피셔(Adrian Flsher Minotaur Maze Designs)의 작품으로서도 손꼽힙니다.
                  <br />
                  [출처:대한민국구석구석]
                </p>
              </div>
              <div className='travel-right right'>
                <div className='travel-img'>
                  <img src="http://woljeongyeonga.com/uploads/travel/2.jpg" alt="" />
                </div>
                <h3 className='travel-title'>김녕만장굴</h3>
                <p className='travel-desc'>
                  김녕사굴은 제주시 구좌읍 김녕리에 위치한 용암동굴입니다.
                  1962년 12월 7일 천연기념물로 지정되었으며, 만장굴 바로 옆에 있습니다.
                  그러나 문화재보호법에 의해 공개제한구역으로 지정되어 있어 일반인의 출입이 금지되어 있습니다.
                  단, 관리 및 학술 연구 목적으로는 문화재청장의 허가를 받아 출입할 수 있습니다.
                  <br />
                  [출처:대한민국구석구석]
                </p>
              </div>
            </>
          }
        </div>
      </div>
    </div>
  );
}