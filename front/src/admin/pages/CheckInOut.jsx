import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import '../css/checkinout.css';
import { useNavigate } from 'react-router-dom';
import { getAdmin } from '../../util/localStorage';
import Error404 from '../../components/Error404';

export default function CheckInOut() {
  const navigate = useNavigate();
  const [checkinData, setCheckinData] = useState([]);
  const [checkoutData, setCheckoutData] = useState([]);
  const [presentData, setPresentData] = useState([]);
  const [day, setDay] = useState(dayjs().format('YYYY-MM-DD'));
  const getCheckinData = () => {
    const url = 'http://127.0.0.1:8080/rev/get/checkindata';
    try {
      axios({
        method: 'post',
        url: url,
        data: { day: day },
      }).then((res) => {
        console.log(res.data);
        setCheckinData(res.data);
      });
    } catch (error) {}
  };
  const getCheckoutData = () => {
    const url = 'http://127.0.0.1:8080/rev/get/checkoutdata';
    try {
      axios({
        method: 'post',
        url: url,
        data: { day: day },
      }).then((res) => {
        setCheckoutData(res.data);
      });
    } catch (error) {}
  };
  const getPresentData = () => {
    const url = 'http://127.0.0.1:8080/rev/get/presentdata';
    try {
      axios({
        method: 'post',
        url: url,
        data: { day: day },
      }).then((res) => {
        console.log('present', res.data);
        setPresentData(res.data);
      });
    } catch (error) {}
  };
  useEffect(() => {
    getCheckinData();
    getCheckoutData();
    getPresentData();
  }, [day]);
  const handleDay = (amount) => {
    setDay(dayjs(day).add(amount, 'day').format('YYYY-MM-DD'));
  };

  const handleRevState = (state, rev_id) => {
    const url = 'http://127.0.0.1:8080/rev/update/revstate';
    try {
      axios({
        method: 'post',
        url: url,
        data: { new_state: state, rev_id: rev_id },
      }).then((res) => {
        if (res.data.cnt) {
          getCheckinData();
          getCheckoutData();
          getPresentData();
        }
      });
    } catch (error) {}
  };
  const handleEndData = (rev_id) => {
    const url = 'http://127.0.0.1:8080/rev/move/enddata';
    try {
      axios({
        method: 'post',
        url: url,
        data: {
          rev_id: rev_id,
        },
      }).then((res) => {
        console.log(res);
        if (res.data.cnt) {
          getCheckinData();
          getCheckoutData();
          getPresentData();
        }
      });
    } catch (error) {}
  };
  const adminInfo = getAdmin();
  if (adminInfo) {
    return (
      <div className="a-outlet inout">
        <div className="inout-row inout-date">
          <MdArrowBackIos onClick={() => handleDay(-1)} />
          {day}
          <MdArrowForwardIos onClick={() => handleDay(1)} />
        </div>
        <div className="inout-row">
          <div className="inout">
            <div className="inout-box">
              <h2>입실 정보</h2>
              <div className="inout-grid">
                <div className="inout-grid-head">
                  <p className="inout-short-grid">객실</p>
                  <p className="inout-long-grid">예약자 정보</p>
                  <p className="inout-long-grid">준비사항</p>
                  <p className="inout-short-grid"> 입실체크</p>
                </div>
                {checkinData &&
                  checkinData.map((rev) => (
                    <div className=" inout-grid-row">
                      <p className="inout-short-grid">{rev.r_id}</p>
                      <div className="inout-long-grid">
                        <p>{rev.rev_id} </p>
                        <p>예약자: {rev.c_name}</p>
                        <p>연락처: {rev.c_phone}</p>
                      </div>
                      <div className="inout-long-grid">
                        <p>{rev.c_message}</p>
                        {rev.s_more_p && <p>추가인원 : {rev.s_more_p} 명</p>}
                        {rev.s_bbq && <p>고기세트 : {rev.s_bbq} 개</p>}
                        {rev.s_meat && <p>고기만 : {rev.s_meat} 개</p>}
                        {rev.s_grill && <p>그릴만 : {rev.s_grill} 개</p>}
                        {rev.s_hotpool && <p>온수풀 : {rev.s_hotpool} 일</p>}
                        {rev.s_campfire && <p>불멍 : {rev.s_campfire} 회분</p>}
                      </div>
                      <div className="inout-short-grid">
                        {rev.rev_state === '예약 확정' ? (
                          <div
                            className="btn-red t-14px"
                            onClick={() =>
                              handleRevState('입실 완료', rev.rev_id)
                            }
                          >
                            입실체크
                          </div>
                        ) : (
                          <div
                            className="btn-white t-14px"
                            onClick={() =>
                              handleRevState('예약 확정', rev.rev_id)
                            }
                          >
                            되돌리기
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="inout-box">
              <h2>퇴실 정보</h2>
              <div className="inout-grid">
                <div className="inout-grid-head">
                  <p className="inout-short-grid">객실</p>
                  <p className="inout-long-grid">예약자 정보</p>
                  <p className="inout-long-grid">준비사항</p>
                  <p className="inout-short-grid"> 퇴실체크</p>
                </div>

                {checkoutData &&
                  checkoutData.map((rev) => (
                    <div className=" inout-grid-row">
                      <p className="inout-short-grid">{rev.r_id}</p>
                      <div className="inout-long-grid">
                        <p>{rev.rev_id}</p>
                        <p>예약자: {rev.c_name}</p>
                        <p>연락처: {rev.c_phone}</p>
                      </div>
                      <div className="inout-long-grid">
                        <p>{rev.c_message}</p>
                      </div>
                      <div className="inout-short-grid">
                        <div
                          className="btn-red t-14px"
                          onClick={() => handleEndData(rev.rev_id)}
                        >
                          퇴실체크
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="inout-small-box">
            <h2>재실 정보</h2>
            <div className="inout-grid">
              <div className="inout-grid-head">
                <p className="inout-rno-grid">객실</p>
                <p className="inout-long-grid">예약자 정보</p>
              </div>
              {presentData &&
                presentData.map((rev) => (
                  <div className=" inout-grid-row">
                    <p className="inout-short-grid">{rev.r_id}</p>
                    <div className="inout-long-grid">
                      <p
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                          navigate(`/admin/reservation/detail/${rev.rev_id}`)
                        }
                      >
                        {rev.rev_id} <span>클릭하여 정보확인</span>
                      </p>
                      <p>예약자: {rev.c_name}</p>
                      <p>연락처: {rev.c_phone}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <Error404 message={'로그인이 필요한 페이지 입니다.'} isAdmin={true} />
    );
  }
}
