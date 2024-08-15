import React from 'react';
import RevComp from '../../components/reservations/RevComp';
import { getAdmin } from '../../util/localStorage';
import Error404 from '../../components/Error404';

export default function RoomBlock() {
  const adminInfo = getAdmin();
  if (adminInfo) {
    return (
      <div className="a-outlet ">
        <RevComp isAdmin={true}></RevComp>
      </div>
    );
  } else {
    return (
      <Error404
        message={'로그인이 필요한 페이지 입니다.'}
        isAdmin={true}
      ></Error404>
    );
  }
}
