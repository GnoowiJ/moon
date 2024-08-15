import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GoPlus, GoDash } from 'react-icons/go';
import { revInfo } from '../modules/revInfos.js';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getRevNo } from '../../redux/modules/reduxRevAxios';
import Error404 from '../Error404';

export default function RevDetailComp({ isAdmin }) {
  const dispatch = useDispatch();
  const byParams = useParams().rev_id;
  const [isValidRev, setIsValidRev] = useState(true);
  if (isAdmin && byParams) {
    dispatch(getRevNo(byParams));
  }

  const revNo = useSelector((state) => state.rev.revNo);

  const [revDetail, setRevDetail] = useState({});
  const getDetailInfo = () => {
    const url = 'http://127.0.0.1:8080/rev/get/revinfos';
    try {
      axios({
        method: 'post',
        url: url,
        data: { rev_id: revNo },
      }).then((res) => {
        if (!res.data) {
          setIsValidRev(false);
        }
        setRevDetail(res.data);
      });
    } catch (error) {}
  };

  useEffect(() => {
    getDetailInfo();
    console.log(revDetail);
  }, []);

  const resetToggle = {};
  for (let index = 1; index <= revInfo.length; index++) {
    const id = 't' + index;
    resetToggle[id] = false;
  }
  const [toggle, setToggle] = useState(resetToggle);

  const handleToggle = (id) => {
    if (!toggle[id]) {
      setToggle(resetToggle);
      const newToggle = {
        ...resetToggle,
        [id]: true,
      };
      setToggle(newToggle);
    } else {
      setToggle(resetToggle);
    }
  };

  const handleRevState = (state) => {
    //axios rev_state 변경
    if (state === '예약 취소') {
      const url = 'http://127.0.0.1:8080/rev/delete/rev';
      try {
        axios({
          method: 'post',
          url: url,
          data: { rev_id: revNo },
        }).then((res) => {
          if (res.data.cnt) {
            alert('예약 취소 성공');
            getDetailInfo();
          }
        });
      } catch (error) {}
    } else {
      const url = 'http://127.0.0.1:8080/rev/update/revstate';
      try {
        axios({
          method: 'post',
          url: url,
          data: { new_state: state, rev_id: revNo },
        }).then((res) => {
          if (res.data.cnt) {
            alert('예약 상태 변경 성공');
            getDetailInfo();
          }
        });
      } catch (error) {}
    }
  };
  if (isValidRev) {
    return (
      <div className={isAdmin ? 'rev-forms-nowrap' : 'rev-forms'}>
        <div className="rev-forms-side">
          <div className="rev-form-box">
            <h3> 예약번호:{revNo}</h3>
            <div className="rev-form-inner-box">
              <div className="rev-form1">
                <p> 객실이름:</p>
                <p> 대표자 성함:</p>
                <p> 연락처:</p>
                <p> 이메일:</p>
                <p> 총 인원:</p>
                <p> 전달 메세지:</p>
              </div>
              <div className="rev-form2">
                <p>{revDetail.r_id}</p>
                <p>{revDetail.c_name}</p>
                <p>{revDetail.c_phone}</p>
                <p>
                  {revDetail.c_email_id}@{revDetail.c_email_domain}
                </p>
                <p>{revDetail.c_nop}명</p>

                <p>{revDetail.c_message}</p>
              </div>
            </div>
          </div>
          <div className="rev-form-box">
            <h3>일정 정보</h3>
            <div className="rev-form-inner-box">
              <div className="rev-form1">
                <p>입실 날짜:</p>
                <p>퇴실 날짜:</p>
              </div>
              <div className="rev-form2">
                <p>{revDetail.c_checkin_date}</p>
                <p>{revDetail.c_checkout_date}</p>
              </div>
            </div>
          </div>
          <div
            className={
              revDetail.s_more_p ||
              revDetail.s_bbq ||
              revDetail.s_meat ||
              revDetail.s_grill ||
              revDetail.s_hotpool ||
              revDetail.s_campfire
                ? 'rev-form-box'
                : 'rev-none'
            }
          >
            <h3>선택 사항</h3>
            <div className="rev-form-inner-box">
              <div className="rev-form1">
                {revDetail.s_more_p ? <p>추가인원:</p> : ''}
                {revDetail.s_bbq ? <p>흑돼지 세트:</p> : ''}
                {revDetail.s_meat ? <p>고기추가 (2인):</p> : ''}
                {revDetail.s_grill ? <p>전기그릴:</p> : ''}
                {revDetail.s_hotpool ? <p>수영장 온수:</p> : ''}
                {revDetail.s_campfire ? <p>불멍:</p> : ''}
              </div>
              <div className="rev-form2">
                {revDetail.s_more_p ? <p>{revDetail.s_more_p} 명</p> : ''}
                {revDetail.s_bbq ? <p>{revDetail.s_bbq} 세트</p> : ''}
                {revDetail.s_meat ? <p>{revDetail.s_meat} 개</p> : ''}
                {revDetail.s_grill ? <p>{revDetail.s_grill} 개</p> : ''}
                {revDetail.s_hotpool ? <p>{revDetail.s_hotpool} 일</p> : ''}
                {revDetail.s_campfire ? <p>{revDetail.s_campfire} 회</p> : ''}
              </div>
            </div>
          </div>
        </div>
        <div className="rev-forms-side">
          {' '}
          <div className="rev-form-box">
            <h3>결제 정보</h3>
            <div className="rev-total">
              <h4>총 결제 금액</h4>
              <h3>{parseInt(revDetail.c_total_fee).toLocaleString()}원</h3>
            </div>
            <div className="rev-total">
              <h4>
                입금처: <br /> 123-1234-5678-99 농협(이순재)
              </h4>
            </div>
            <div className="rev-statebox">
              예약 상태:
              <div className="rev-state">{revDetail.rev_state}</div>
            </div>
            {isAdmin && revDetail.rev_state === '미확정' ? (
              <>
                <div
                  className="rev-state rev-admin-button"
                  onClick={() => handleRevState('예약 확정')}
                >
                  예약 확정 하기
                </div>{' '}
                <br />
                <div
                  className="rev-state rev-nonactive-button"
                  onClick={() => handleRevState('예약 취소')}
                >
                  예약 취소
                </div>{' '}
              </>
            ) : (
              ''
            )}{' '}
            {isAdmin && revDetail.rev_state === '예약 불가' ? (
              <div
                className="rev-state rev-admin-button"
                onClick={() => handleRevState('예약 취소')}
              >
                예약 불가 취소
              </div>
            ) : (
              ''
            )}
            {isAdmin && revDetail.rev_state === '예약 확정' ? (
              <div
                className="rev-state rev-admin-button"
                onClick={() => handleRevState('미확정')}
              >
                예약 확정 취소
              </div>
            ) : (
              ''
            )}
          </div>
          <div className="rev-form-box">
            {revInfo.map((info) => (
              <div>
                <div
                  onClick={() => handleToggle(info.name)}
                  className="info-left-title"
                >
                  {info.title}
                  {toggle[info.name] ? <GoDash /> : <GoPlus />}
                </div>
                {toggle[info.name] ? <div>{info.contents}</div> : ''}
              </div>
            ))}
          </div>
          <Link
            to={isAdmin ? '/admin/reservation/status' : '/'}
            className="rev-form-box rev-active-button"
          >
            {isAdmin ? '현황으로 돌아가기' : '홈으로 돌아가기'}
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <Error404
        message={'취소되었거나 없는 예약번호 입니다.'}
        isAdmin={isAdmin}
      />
    );
  }
}
