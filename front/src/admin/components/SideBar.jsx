import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAdmin, removeAdmin } from '../../util/localStorage';
export default function SideBar() {
  const navigate = useNavigate();
  const adminInfo = getAdmin();
  function handleLogout() {
    removeAdmin();
    alert('로그아웃되었습니다.');
    navigate('/admin');
  }
  return (
    <div className="sidebar">
      <Link to="/admin">
        <img className="sidebar-logo" src="/img/logo-white.png" alt="logo" />
      </Link>
      <div className="sidebar-menu">
        <Link
          to={adminInfo ? '/admin/checkinout' : '/admin'}
          className="sidebar-btn"
        >
          입 퇴실 정보
        </Link>
        <Link to={adminInfo ? "/admin/reservation/status" : '/admin'} className="sidebar-btn">
          예약 현황
        </Link>
        <Link
          to={adminInfo ? '/admin/roomblock' : '/admin'}
          className="sidebar-btn"
        >
          객실 관리
        </Link>
        <Link to={adminInfo ? "/admin/roomprice" : '/admin'} className="sidebar-btn">
          요금 설정
        </Link>
        <Link
          to={adminInfo ? '/admin/gallerymanage' : '/admin'}
          className="sidebar-btn"
        >
          갤러리 관리
        </Link>
        <Link
          to={adminInfo ? '/admin/popupmanage' : '/admin'}
          className="sidebar-btn"
        >
          팝업 관리
        </Link>
      </div>
      {adminInfo && <button type="button" className="sidebar-logout" onClick={handleLogout}>로그아웃</button>}
      {(adminInfo && adminInfo.isSuper) ?
        <>
          <Link to={"/admin/manageadmin"}>
            <button type="button" className="sidebar-create-account">관리자 계정 관리</button>
          </Link>
        </>
        : ""}
    </div>
  );
}
