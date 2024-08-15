import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './admin/components/SideBar';
import './admin/css/admin.css';
import './admin/css/reset.css';

import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { getStartDate, getEndDate } from './redux/modules/reduxRevAxios.js';

export default function AdminRoot() {
  const height = window.innerHeight;
  console.log(height);
  const adjust = { height: height };

  const dispatch = useDispatch();
  useEffect(() => {
    const today = dayjs().format('YYYY-MM-DD');
    const dayAfter = dayjs().add(1, 'day').format('YYYY-MM-DD');

    dispatch(getStartDate(today));
    dispatch(getEndDate(dayAfter));
  }, []);
  return (
    <div className="App" style={adjust}>
      <SideBar />
      <Outlet />
    </div>
  );
}
