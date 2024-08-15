import React from 'react';
import TitleImage from '../../components/TitleImage.jsx';
import KakaoMap from '../../components/KakaoMap.jsx';

export default function Infolocation() {
  return (
    <div>
      <TitleImage img="http://woljeongyeonga.com/uploads/traffic/top.jpg" title='오시는 길' />
      <div className='location-info-box'>
        <div className='location-info-left'>
          <h2>오시는 길</h2>
          <p>· 주소 : 제주시 구좌읍 월정5길 33</p>
          <br />
          <p>1. 자가용 이용 시 (택시 포함)</p>
          <p>- 내비게이션 주소 : 제주시 구좌읍 월정리 243번지.</p>
          <p>- 도로명 주소 : 제주시 구좌읍 월정 5길 33</p>
          <p>- 택시 이용 시 약 40분 소요 (요금 3만 원 예상)</p>
          <br />
          <p>2.대중교통 이용 시</p>
          <br />
          <p>A. 제주공항에서 오실 때</p>
          <p>- 공항 2번 게이트 앞 승차장에서 급행 101번 승차</p>
          <p>(공항 첫차 06:35AM, 막차 20:20PM, 30분~50분 배차)</p>
          <p>60분 정도 이동 후 월정리 정류장 하차하여 도보 8분</p>
          <br />
          <p>B. 제주 시외버스터미널에서 오실 때</p>
          <p>- 간선버스 201번 버스 승차</p>
          <p>(첫차 05:35AM, 막차 18:30PM, 30분~120분 배차)</p>
          <p>70분 정도 이동 후 월정리 정류장 하차하여 도보 8분</p>
          <br />
          <p>오시는 길 아래 블로그 링크 참조하세요.</p>
          <p><a href="https://blog.naver.com/tip944/220814853328">https://blog.naver.com/tip944/220814853328</a></p>
        </div>
        <div className='location-info-right'>
          <h2>주차 상세 안내</h2>
          <p>· 숙소 내 주차장 이용(객실별 1대 주차 가능)</p>
          <p>· 숙소 내 주차장 만차 또는 차량 2대일 경우 추가 1대는 주차장 맞은편 일렬 평행 주차 가능</p>
          <br />
          <p>※ 운전석 앞 유리에 연락처 꼭 남겨주시고 셀프체크인 안내 문자 드릴 때 차량번호 문자로 알려주시기 바랍니다.</p>
        </div>
      </div>
      <div className='location-map-box'>
        <KakaoMap id="map" />
      </div>
    </div>
  );
}