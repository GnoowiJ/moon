import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { getStartDate, getEndDate } from './redux/modules/reduxRevAxios.js';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default function Root() {
  const dispatch = useDispatch();
  useEffect(() => {
    const today = dayjs().format('YYYY-MM-DD');
    const dayAfter = dayjs().add(1, 'day').format('YYYY-MM-DD');

    dispatch(getStartDate(today));
    dispatch(getEndDate(dayAfter));
  }, []);
  return (
    <div className="Root">
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
