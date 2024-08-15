import React, { useEffect, useState } from 'react';
import TitleImage from '../../components/TitleImage';
import { getRevNo } from '../../redux/modules/reduxRevAxios';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import RevDetailComp from '../../components/reservations/RevDetailComp';
import axios from 'axios';

export default function ReservationCheck() {
  const [page, setPage] = useState(1);
  const revNo = useSelector((state) => state.rev.revNo);
  useEffect(() => {
    if (revNo) {
      setPage(2);
    }
  }, [revNo]);

  return (
    <div className="outlet">
      <TitleImage img="/img/reservation_top.jpg" title="예약 확인" />
      {page === 1 ? <Page1 setPage={setPage} /> : <RevDetailComp />}
    </div>
  );
}
export function Page1({ setPage }) {
  const dispatch = useDispatch();
  const [confirmInfo, setConfirmInfo] = useState({
    c_name: null,
    rev_no: null,
    c_email_id: null,
    c_email_domain: null,
  });
  const [isEmail, setIsEmail] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value.trim();

    setConfirmInfo({ ...confirmInfo, [name]: value });
  };
  useEffect(() => {
    if (
      (confirmInfo.c_name && confirmInfo.rev_no) ||
      (confirmInfo.c_name &&
        confirmInfo.c_email_domain &&
        confirmInfo.c_email_id)
    ) {
      setIsValid(true);
    }
  }, [confirmInfo]);
  const confirmRevNo = () => {
    const url = 'http://127.0.0.1:8080/rev/confirm/rev';
    try {
      axios({
        method: 'post',
        url: url,
        data: confirmInfo,
      }).then((res) => {
        console.log(res.data.cnt);
        if (res.data.cnt === 1) {
          dispatch(getRevNo(confirmInfo.rev_no));
        } else {
          alert('해당하는 예약정보가 없습니다.');
        }
      });
    } catch (error) {}
  };
  const confirmByEmail = () => {
    const url = 'http://127.0.0.1:8080/rev/confirm/byemail';
    try {
      axios({
        method: 'post',
        url: url,
        data: confirmInfo,
      }).then((res) => {
        console.log(res.data);
        if (res.data.rev_id) {
          dispatch(getRevNo(res.data.rev_id));
        } else {
          alert('해당하는 예약정보가 없습니다.');
        }
      });
    } catch (error) {}
  };
  const handleConfirm = () => {
    if (isEmail) {
      confirmByEmail();
    } else {
      confirmRevNo();
    }
  };

  // 가나다
  // HL6018CL2726OS
  // acid_c6h8o6@naver.com
  return (
    <div className="rev-inner inner">
      <div className="rev-check-box">
        <h2>예약 확인</h2>
        <div className="rev-check-inputs">
          대표자 성함 :{' '}
          <input
            onChange={(e) => handleInput(e)}
            placeholder="예약한 대표자 성함을 입력 해 주세요"
            className="rev-check-input"
            type="text"
            name="c_name"
          />
        </div>
        {isEmail ? (
          <div className="rev-check-inputs">
            이메일:
            <div className="rev-check-email">
              <input
                onChange={(e) => handleInput(e)}
                placeholder="예약한 이메일 앞부분"
                className="rev-email-input"
                type="text"
                name="c_email_id"
                value={confirmInfo.c_email_id}
              />
              @
              <input
                onChange={(e) => handleInput(e)}
                placeholder="예약한 이메일 뒷부분"
                className="rev-email-input"
                type="text"
                name="c_email_domain"
                value={confirmInfo.c_email_domain}
              />
              <select name="c_email_domain" onChange={(e) => handleInput(e)}>
                <option value="">직접입력</option>
                <option value="naver.com">네이버</option>
                <option value="kakao.com">카카오</option>
                <option value="gmail.com">구글</option>
              </select>{' '}
            </div>
          </div>
        ) : (
          <div className="rev-check-inputs">
            예약번호 :{' '}
            <input
              onChange={(e) => handleInput(e)}
              placeholder="이메일로 전송된 예약번호를 입력 해 주세요"
              className="rev-check-input"
              type="text"
              name="rev_no"
              value={confirmInfo.rev_no}
            />{' '}
          </div>
        )}
        <div className="rev-button" onClick={() => setIsEmail(!isEmail)}>
          {isEmail ? (
            <p>
              예약번호로 <br />
              조회하기
            </p>
          ) : (
            <p>
              이메일로 <br />
              예약번호 찾기
            </p>
          )}
        </div>
        <div
          className={
            isValid
              ? 'rev-form-box rev-active-button'
              : 'rev-form-box rev-nonactive-button'
          }
          type="button"
          on
          onClick={() => handleConfirm()}
        >
          예약 정보 확인
        </div>
      </div>
    </div>
  );
}
