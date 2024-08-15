import React, { useEffect } from 'react';

const KakaoMap = ({id}) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=fe62784ca927492c9d2b136164773a4d`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');

        const options = {
          center: new window.kakao.maps.LatLng(33.5534145689938, 126.795123723707),
          level: 2
        };

        const map = new window.kakao.maps.Map(container, options);


        // 마커를 표시할 위치입니다
        const markerPosition  = new window.kakao.maps.LatLng(33.5534145689938, 126.795123723707); 


        // 마커를 생성합니다
        const marker = new window.kakao.maps.Marker({
            position: markerPosition
        });


        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);

      });
    };
  }, []);

  return (
      <div id={id} style={{ width: '1540px', height: '600px' }}></div>
  );
};

export default KakaoMap;



