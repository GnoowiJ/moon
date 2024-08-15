import React, { useEffect, useState } from 'react';
import '../../css/reservation.css';
import PickDate from './PickDate.jsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  getStartDate,
  getEndDate,
  getRevRoom,
  getRevNo,
} from '../../redux/modules/reduxRevAxios.js';
import RevDetailComp from './RevDetailComp.jsx';
import makeRevNo from '../modules/makeRevNo.js';
import axios from 'axios';
import RevRoomCard from './RevRoomCard.jsx';
import RevCounter from './RevCounter.jsx';
import { roomPriceCal, servicePriceCal } from '../modules/priceCal.js';
import emailjs from '@emailjs/browser';
import { getPopList } from '../../redux/modules/reduxPopListAxios.js';

export default function RevComp({ isAdmin }) {
  const [page, setPage] = useState(1);

  return (
    <>
      <div className="rev-space"></div>
      <div className="outlet">
        {page === 1 ? <Page1 setPage={setPage} /> : ''}
        {page === 2 ? <Page2 setPage={setPage} isAdmin={isAdmin} /> : ''}
        {page === 3 ? <Page3 isAdmin={isAdmin} /> : ''}
      </div>
    </>
  );
}
export function Page1({ setPage }) {
  const dispatch = useDispatch();
  const getStartDateValue = (date) => {
    dispatch(getStartDate(date));
  };
  const getEndDateValue = (date) => {
    dispatch(getEndDate(date));
  };

  const startDate = useSelector((state) => state.rev.startDate);
  const endDate = useSelector((state) => state.rev.endDate);
  const startInt = parseInt(startDate.split('-').join(''));
  const endInt = parseInt(endDate.split('-').join(''));
  let announce;
  let announce2;
  if (startInt >= endInt) {
    announce = <h3>입실일보다 퇴실일이 나중이여야 합니다.</h3>;
    announce2 = '';
  } else {
    announce = (
      <h3>
        {startDate} ~ {endDate} 일정에 예약 가능한 방 입니다.
      </h3>
    );
    announce2 = (
      <div className="rev-active-button">
        <p>
          죄송합니다. <br /> 해당 일정에 가능한 방이 없습니다. <br />
          다른 일정을 입력해 주세요.
        </p>
      </div>
    );
  }

  const [availableRooms, setAvailableRooms] = useState([]);

  useEffect(() => {
    if (startInt < endInt && startDate && endDate) {
      const url2 = 'http://127.0.0.1:8080/rev/get/rooms';
      const data = { startDate: startDate, endDate: endDate };
      try {
        axios({
          method: 'post',
          url: url2,
          data: data,
        }).then((res) => {
          setAvailableRooms(res.data);
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      setAvailableRooms([]);
    }
  }, [startDate, endDate]);

  const goNext = (roomId) => {
    dispatch(getRevRoom(roomId));
    setPage(2);
  };

  return (
    <div className="inner rev-inner ">
      <h2>예약 일정</h2>
      <div className="rev-date">
        <PickDate
          name="입실일"
          getDateValue={getStartDateValue}
          defVal={startDate}
        />
        <PickDate
          name="퇴실일"
          getDateValue={getEndDateValue}
          defVal={endDate}
        />
      </div>
      <div className="rev-list">
        <h2>예약 가능한 숙소</h2>

        <div>
          {startDate && endDate ? (
            announce
          ) : (
            <h3>예약 일정을 먼저 입력 해 주세요</h3>
          )}
        </div>
        <div>
          <div className="rev-card-container">
            {availableRooms[0]
              ? availableRooms.map((r_id) => (
                  <RevRoomCard r_id={r_id} goNext={goNext} />
                ))
              : announce2}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Page2({ setPage, isAdmin }) {
  const dispatch = useDispatch();
  const revRoomId = useSelector((state) => state.rev.revRoom);
  const startDate = useSelector((state) => state.rev.startDate);
  const endDate = useSelector((state) => state.rev.endDate);
  const revNo = useSelector((state) => state.rev.revNo);
  const [revRoomInfo, setRevRoomInfo] = useState({});
  const [roomDetailsInfo, setRoomDetailsInfo] = useState([]);
  const [revDetailInfo, setRevDetailInfo] = useState({
    rev_id: revNo,
    r_id: revRoomId,
    c_name: null,
    c_phone: null,
    c_email_id: null,
    c_email_domain: null,
    c_nop: null,
    c_message: null,
    c_checkin_date: startDate,
    c_checkout_date: endDate,
    c_total_fee: 0,
    s_more_p: 0,
    s_bbq: 0,
    s_meat: 0,
    s_grill: 0,
    s_hotpool: 0,
    s_campfire: 0,
  });

  const pops = useSelector((state) => state.pop.popList);
  const roomPrices = {
    weekPop: 120000,
    weekendPop: 150000,
    weekUnpop: 100000,
    weekendUnpop: 130000,
    more_p: 20000,
  };
  const [price, setPrice] = useState({
    room: roomPriceCal(startDate, endDate, pops, roomPrices),
    s_more_p: 0,
    s_bbq: 0,
    s_meat: 0,
    s_grill: 0,
    s_hotpool: 0,
    s_campfire: 0,
  });
  const total_fee = () => {
    const result =
      price.room +
      (price.s_more_p < 0 ? 0 : price.s_more_p) +
      price.s_bbq +
      price.s_meat +
      price.s_grill +
      price.s_hotpool +
      price.s_campfire;
    return result;
  };

  useEffect(() => {
    const rev_id = makeRevNo();
    dispatch(getRevNo(rev_id));
    const url = 'http://127.0.0.1:8080/rev/get/roominfo';
    const url1 = 'http://127.0.0.1:8080/rev/get/roomdetailsinfo';
    const data = { r_id: revRoomId };
    try {
      axios({
        method: 'post',
        url: url,
        data: data,
      }).then((res) => {
        setRevRoomInfo(res.data[0]);
        setRevDetailInfo({ ...revDetailInfo, c_nop: res.data[0].ini_people });
      });
    } catch (error) {
      console.log(error);
    }
    try {
      axios({
        method: 'post',
        url: url1,
        data: data,
      }).then((res) => {
        setRoomDetailsInfo(res.data);
      });
    } catch (error) {
      console.log(error);
    }
    setRevDetailInfo({
      rev_id: revNo,
      r_id: revRoomId,
      c_name: null,
      c_phone: null,
      c_email_id: null,
      c_email_domain: null,
      c_nop: null,
      c_message: null,
      c_checkin_date: startDate,
      c_checkout_date: endDate,
      c_total_fee: 0,
      s_more_p: 0,
      s_bbq: 0,
      s_meat: 0,
      s_grill: 0,
      s_hotpool: 0,
      s_campfire: 0,
    });
    dispatch(getPopList());
  }, []);

  const [prom, setProm] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const handleProm = (value) => {
    setProm(value);
  };

  useEffect(() => {
    validationCheck();

    setPrice({
      room: roomPriceCal(startDate, endDate, pops, roomPrices),
      s_more_p: servicePriceCal(
        0,
        roomPrices.more_p,
        revDetailInfo.c_nop - revRoomInfo.ini_people
      ),
      s_bbq: servicePriceCal(0, 60000, revDetailInfo.s_bbq),
      s_meat: servicePriceCal(0, 40000, revDetailInfo.s_meat),
      s_grill: servicePriceCal(0, 20000, revDetailInfo.s_grill),
      s_hotpool: servicePriceCal(40000, 40000, revDetailInfo.s_hotpool),
      s_campfire: servicePriceCal(0, 20000, revDetailInfo.s_campfire),
    });
    setRevDetailInfo({
      ...revDetailInfo,
      c_total_fee: total_fee(),
    });
  }, [
    revDetailInfo.s_bbq,
    revDetailInfo.s_campfire,
    revDetailInfo.s_grill,
    revDetailInfo.s_hotpool,
    revDetailInfo.s_meat,
    revDetailInfo.c_nop,
    total_fee(),
    prom,
  ]);

  const validationCheck = () => {
    if (
      revDetailInfo.c_name &&
      revDetailInfo.c_phone &&
      revDetailInfo.c_email_id &&
      revDetailInfo.c_email_domain &&
      prom
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleInput = (e, max) => {
    const name = e.target.name;
    let value = e.target.value;
    if (value.length > max) {
      alert(`${max}자 초과 입력이 불가합니다.`);
      value = e.target.value.substring(0, max);
    }
    setRevDetailInfo({ ...revDetailInfo, rev_id: revNo, [name]: value });
    console.log(revDetailInfo);
  };
  const handleNumInput = (e, min, max, numb) => {
    const name = e.target.name;
    let value = e.target.value;
    value = parseInt(value) + parseInt(numb);
    if (value > max) {
      alert(`${max}이상은 입력이 불가합니다.`);
      value = max;
    } else if (value < min) {
      alert(`${min}이하는 입력이 불가합니다.`);
      value = min;
    }
    setRevDetailInfo({
      ...revDetailInfo,
      [name]: value,
      c_total_fee: total_fee(),
      s_more_p: revDetailInfo.c_nop - revRoomInfo.ini_people,
    });

    console.log(revDetailInfo);
  };
  const finish = () => {
    const url = 'http://127.0.0.1:8080/rev/put/revinfos';
    try {
      axios({ method: 'post', url: url, data: revDetailInfo })
        .then((res) => res.data.cnt)
        .then()
        .then((cnt) => {
          if (cnt == 1) {
            alert('실시간 예약 요청이 되었습니다.');

            setPage(3);
          }
          {
            return;
          }
        });
    } catch (error) {
      console.log(error);
    }
    console.log(revDetailInfo);
  };
  const handleRev = () => {
    if (!revDetailInfo.c_name) {
      alert('대표자성함을 입력 바랍니다.');
    } else if (!revDetailInfo.c_phone) {
      alert('핸드폰번호를 입력 바랍니다.');
    } else if (!revDetailInfo.c_email_id) {
      alert('이메일 앞 부분을 입력 바랍니다.');
    } else if (!revDetailInfo.c_email_domain) {
      alert('이메일 뒷 부분을 입력 바랍니다.');
    } else if (!prom) {
      alert('약관에 동의 해 주세요.');
    }

    if (isValid) {
      setRevDetailInfo({
        ...revDetailInfo,
        rev_id: revNo,
        c_total_fee: total_fee(),
      });
      finish();
      emailjs.init({
        publicKey: 'w8FGIEA4bgAfzk05F',
      });
      emailjs.send('service_b5of4zg', 'template_3cdkwc1', {
        c_name: revDetailInfo.c_name,
        rev_id: revDetailInfo.rev_id,
        r_id: revDetailInfo.r_id,
        c_total_fee: revDetailInfo.c_total_fee,
        c_email_id: revDetailInfo.c_email_id,
        c_email_domain: revDetailInfo.c_email_domain,
      });
    }
  };

  const handleBlock = () => {
    setRevDetailInfo({
      ...revDetailInfo,
      c_name: '관리자',
      rev_id: revNo,
      c_total_fee: total_fee(),
    });
    console.log(revDetailInfo);
    finish();
  };
  console.log('page2', revRoomInfo);

  return (
    <div className="rev-inner inner">
      <div className="rev-title">
        <button className="rev-button" type="button" onClick={() => setPage(1)}>
          이전으로
        </button>
        <h2>예약정보 입력 </h2>
        <div className="rev-button rev-hidden"></div>
      </div>
      <div className="rev-forms">
        <div className="rev-forms-side">
          <div className="rev-form-box">
            <h3>객실 정보</h3>
            <div className="rev-card-imgbox">
              <img src={revRoomInfo.r_img} alt="" />
            </div>
            <div className="rev-form-inner-box">
              <div className="rev-form1">
                <p> 객실이름:</p>
                <p> 기준인원:</p>
                <p> 시설정보:</p>
              </div>
              <div className="rev-form2">
                <p>{revRoomInfo.r_id}</p>
                <p>
                  {revRoomInfo.ini_people} 명{' '}
                  <span className="rev-essential">
                    {revRoomInfo.max_people === revRoomInfo.ini_people
                      ? '인원추가 불가'
                      : ''}
                  </span>
                </p>
                {roomDetailsInfo.map((detail) => (
                  <p>{detail.rd_name}</p>
                ))}
              </div>
            </div>
          </div>
          <div className="rev-form-box">
            <h3>선택 사항</h3>
            <div className="rev-form-inner-box">
              <div className="rev-form1">
                <p>추가인원:</p>
                {roomDetailsInfo.map((detail) => (
                  <>
                    {detail.rd_name === '테라스' ||
                    detail.rd_name === '개별 정원' ? (
                      <>
                        <p>흑돼지 세트:</p>
                        <p>고기추가:</p>
                        <p>전기그릴만:</p>
                      </>
                    ) : (
                      ''
                    )}
                    {detail.rd_name === '수영장' ? (
                      <>
                        <p>수영장 온수:</p>
                      </>
                    ) : (
                      ''
                    )}
                    {detail.rd_name === '개별 정원' ? (
                      <>
                        <p>불멍:</p>
                      </>
                    ) : (
                      ''
                    )}
                  </>
                ))}
              </div>
              <div className="rev-form2">
                {!(revRoomInfo.max_people === revRoomInfo.ini_people) ? (
                  <p>가능</p>
                ) : (
                  <p>불가</p>
                )}
                {roomDetailsInfo.map((detail) => (
                  <>
                    {detail.rd_name === '테라스' ||
                    detail.rd_name === '개별 정원' ? (
                      <>
                        <RevCounter
                          handleInput={handleNumInput}
                          name={'s_bbq'}
                          value={revDetailInfo.s_bbq}
                          min={0}
                          max={5}
                          message={'고기,그릴,라면 2인세트'}
                        />
                        <RevCounter
                          handleInput={handleNumInput}
                          name={'s_meat'}
                          value={revDetailInfo.s_meat}
                          min={0}
                          max={5}
                          message={'고기2인분'}
                        />
                        <RevCounter
                          handleInput={handleNumInput}
                          name={'s_grill'}
                          value={revDetailInfo.s_grill}
                          min={0}
                          max={5}
                          message={'그릴1개'}
                        />
                      </>
                    ) : (
                      ''
                    )}
                    {detail.rd_name === '수영장' ? (
                      <>
                        <RevCounter
                          handleInput={handleNumInput}
                          name={'s_hotpool'}
                          value={revDetailInfo.s_grill}
                          min={0}
                          max={5}
                          message={'온수1일'}
                        />
                      </>
                    ) : (
                      ''
                    )}
                    {detail.rd_name === '개별 정원' ? (
                      <>
                        <RevCounter
                          handleInput={handleNumInput}
                          name={'s_campfire'}
                          value={revDetailInfo.s_campfire}
                          min={0}
                          max={5}
                          message={'불멍 1회분'}
                        />
                      </>
                    ) : (
                      ''
                    )}
                  </>
                ))}
              </div>
            </div>
          </div>
          <div className="rev-form-box">
            <h3>예약자 정보</h3>
            <div className="rev-form-inner-box">
              <div className="rev-form1">
                <p> 예약자 성함:</p>
                <p> 전화번호:</p>
                <p> 이메일:</p>
                <div></div>
                <p> 총 인원:</p>
                <p> 기타 사항:</p>
              </div>
              <div className="rev-form2">
                <p>
                  <input
                    className="rev-form2-input"
                    type="text"
                    name="c_name"
                    onChange={(e) => handleInput(e, 10)}
                    placeholder="예약자 성함을 입력하여 주세요"
                  />{' '}
                  <span className="rev-essential">필수</span>
                </p>
                <p>
                  <input
                    className="rev-form2-input"
                    type="text"
                    name="c_phone"
                    onChange={(e) => handleInput(e, 20)}
                    placeholder="핸드폰 번호를 입력하여 주세요"
                  />{' '}
                  <span className="rev-essential">필수</span>
                </p>

                <div className="rev-email-container">
                  <input
                    className="rev-emailId-input"
                    type="text"
                    name="c_email_id"
                    onChange={(e) => handleInput(e, 20)}
                    placeholder="이메일 앞 부분"
                  />
                  @
                  <input
                    className="rev-email-input"
                    type="text"
                    name="c_email_domain"
                    onChange={(e) => handleInput(e, 20)}
                    value={revDetailInfo.c_email_domain}
                    placeholder="이메일 뒷 부분"
                  />{' '}
                  <p className="rev-essential">필수</p>
                </div>
                <div className="rev-email-container">
                  <select
                    name="c_email_domain"
                    onChange={(e) => handleInput(e)}
                  >
                    <option value="">직접입력</option>
                    <option value="naver.com">네이버</option>
                    <option value="kakao.com">카카오</option>
                    <option value="gmail.com">구글</option>
                  </select>
                </div>
                <RevCounter
                  handleInput={handleNumInput}
                  name={'c_nop'}
                  value={revDetailInfo.c_nop}
                  min={1}
                  max={revRoomInfo.max_people}
                  message={'필수'}
                />
                <p>
                  <textarea
                    className="rev-form2-textarea"
                    placeholder="서비스 이용 시 서비스 이용 날짜를 알려주세요! 최대 200자"
                    type="text"
                    name="c_message"
                    value={revDetailInfo.c_message}
                    onChange={(e) => handleInput(e, 200)}
                  />{' '}
                  <span className="rev-essential">200자</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="rev-forms-side">
          <div className="rev-form-box">
            <h3>결제 정보</h3>
            <div className="rev-form-inner-box">
              <div className="rev-form1">
                <p>입실 날짜:</p>
                <p>퇴실 날짜:</p>
                <p>객실 요금:</p>
                <p>선택사항 요금:</p>
              </div>
              <div className="rev-form2">
                <p>{startDate}</p>
                <p>{endDate}</p>
                <p>{price.room.toLocaleString()}원</p>
                {price.s_more_p > 0 ? (
                  <p>인원추가 {price.s_more_p.toLocaleString()}원</p>
                ) : (
                  ''
                )}
                {revDetailInfo.s_bbq ? (
                  <p>흑돼지 세트 {price.s_bbq.toLocaleString()}원</p>
                ) : (
                  ''
                )}
                {revDetailInfo.s_meat ? (
                  <p>고기 추가 {price.s_meat.toLocaleString()}원</p>
                ) : (
                  ''
                )}
                {revDetailInfo.s_grill ? (
                  <p>그릴만 추가 {price.s_grill.toLocaleString()}원</p>
                ) : (
                  ''
                )}
                {revDetailInfo.s_hotpool ? (
                  <p>수영장 온수 추가{price.s_hotpool.toLocaleString()}원</p>
                ) : (
                  ''
                )}
                {revDetailInfo.s_campfire ? (
                  <p>불멍 추가 {price.s_campfire.toLocaleString()}원</p>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className="rev-total">
              <h2>총 결제 금액</h2>
              <h1>{revDetailInfo.c_total_fee.toLocaleString()} 원</h1>
            </div>
            <h2>
              입금처: <br /> 123-1234-5678-99 농협(이순재)
            </h2>
          </div>
          <div className="rev-form-box">
            <h3>예약 약관</h3>
            <p>
              · 입실 오후 16시 이후 / 퇴실 오전 11시 이전 <br />· 11시 이후 퇴실
              시 초과된 시간당 2만원의 추가요금이 발생됩니다. <br />
              · 입실 안내는 셀프 체크인 하시도록 예약하신 번호로 문자 안내
              드립니다. <br />
              (전화 문의는 09:00 ~ 22:00에 가능합니다.) <br />
              · 36개월 이상 유아부터 인원수 포함됩니다. <br />
              · 최대 인원 초과 시 현장에서 입실 거부/환불 불가됩니다. <br />
              · 숙박 예약인원 외 방문자 입실 불가합니다. <br />
              · 천재지변에 의한 항공기 선박 결항에 따른 취소는 증명자료를
              제시하는 경우, 결항 당일 숙박비는 전액 환불 가능하며, 결항 날짜는
              당일이지만, 숙박 날짜가 다른 날인 경우는 일반 환불 규정에 따라
              환불 가능합니다. <br />
              · 방역업체를 통해 정기적으로 방역을 진행하고 있으나 제주도 주변
              환경 특성상 해충이 유입될 수 있는 점 양해 부탁드리며 이로 인한
              환불은 불가합니다. <br />
            </p>

            <p className="rev-check-info">
              <input
                type="checkbox"
                onChange={(e) => handleProm(e.target.value)}
              />
              모든 약관에 동의 합니다.
            </p>
          </div>
          <div
            className={
              isValid
                ? 'rev-form-box rev-active-button'
                : 'rev-form-box rev-nonactive-button'
            }
            onClick={() => handleRev()}
          >
            실시간 예약 요청하기
          </div>
          {isAdmin ? (
            <div
              className="rev-form-box rev-admin-button"
              onClick={() => handleBlock(true)}
            >
              예약불가 처리하기(관리자)
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
}

export function Page3({ isAdmin }) {
  return <RevDetailComp isAdmin={isAdmin} />;
}
