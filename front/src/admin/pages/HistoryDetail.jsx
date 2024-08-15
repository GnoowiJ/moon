import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function HistoryDetail() {
  const revNo = useParams().rev_id;
  const [revDetail, setRevDetail] = useState({});
  const getDetailInfoFromHistory = () => {
    const url = 'http://127.0.0.1:8080/rev/get/revinfos/history';
    try {
      axios({
        method: 'post',
        url: url,
        data: { rev_id: revNo },
      }).then((res) => {
        setRevDetail(res.data);
      });
    } catch (error) {}
  };
  useEffect(() => {
    getDetailInfoFromHistory();
  }, []);
  console.log('history', revDetail);
  return (
    <div className="his-forms">
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
        </div>
        <Link
          to="/admin/reservation/status"
          className="rev-form-box rev-active-button"
        >
          현황으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
