import React, { useEffect, useState } from 'react';
import TitleImage from '../../components/TitleImage';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import { roomPriceCal, seasonType } from '../../components/modules/priceCal.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import IsAvailableRoom from '../../components/IsAvailableRoom.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getPopList } from '../../redux/modules/reduxPopListAxios.js';

export default function Inforeserve() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const now = dayjs();
  const [datePick, setDatePick] = useState(now);
  const [dateList, setDateList] = useState([]);
  const dayPick = ['일', '월', '화', '수', '목', '금', '토'];

  useEffect(() => {
    const dateArr = [];
    for (let index = 0; index < 5; index++) {
      dateArr.push(datePick.add(index, 'd'));
    }
    setDateList(dateArr);
  }, [datePick]);
  // console.log('datepick', datePick.format('YYYY년 MM월 DD일'));
  const valiCheck = () => {
    navigate('/reservation');
  };
  const [toggle, setToggle] = useState({
    t1: false,
    t2: false,
    t3: false,
    t4: false,
    t5: false,
    t6: false,
    t7: false,
  });

  const handleToggle = (e) => {
    let id = e.target.id;
    if (id === 't1') {
      setToggle({
        t1: !toggle.t1,
        t2: false,
        t3: false,
        t4: false,
        t5: false,
        t6: false,
        t7: false,
      });
    } else if (id === 't2') {
      setToggle({
        t1: false,
        t2: !toggle.t2,
        t3: false,
        t4: false,
        t5: false,
        t6: false,
        t7: false,
      });
    } else if (id === 't3') {
      setToggle({
        t1: false,
        t2: false,
        t3: !toggle.t3,
        t4: false,
        t5: false,
        t6: false,
        t7: false,
      });
    } else if (id === 't4') {
      setToggle({
        t1: false,
        t2: false,
        t3: false,
        t4: !toggle.t4,
        t5: false,
        t6: false,
        t7: false,
      });
    } else if (id === 't5') {
      setToggle({
        t1: false,
        t2: false,
        t3: false,
        t4: false,
        t5: !toggle.t5,
        t6: false,
        t7: false,
      });
    } else if (id === 't6') {
      setToggle({
        t1: false,
        t2: false,
        t3: false,
        t4: false,
        t5: false,
        t6: !toggle.t6,
        t7: false,
      });
    } else if (id === 't7') {
      setToggle({
        t1: false,
        t2: false,
        t3: false,
        t4: false,
        t5: false,
        t6: false,
        t7: !toggle.t7,
      });
    }
  };

  const dateChange = (change) => {
    setDatePick(datePick.add(change, 'd'));
  };

  const [guestRooms, setGuestRooms] = useState([{}]);
  const pop = useSelector((state) => state.pop.popList);

  useEffect(() => {
    dispatch(getPopList());
    axios({
      method: 'post',
      url: 'http://localhost:8080/information',
    })
      .then((result) => setGuestRooms(result.data))
      .catch();
  }, [pop]);

  function facilitiesList(zacuzi, tub, pool) {
    let str = '';
    if (zacuzi || tub || pool) {
      str += '(';
      const facList = [];
      if (zacuzi) facList.push('자쿠지');
      if (tub) facList.push('테라스욕조');
      if (pool) facList.push('야외온수풀');
      str += facList.join(', ');
      str += ')';
    }
    return str;
  }

  return (
    <div>
      <TitleImage
        img={'http://woljeongyeonga.com/uploads/reservation/top.jpg'}
        title={'예약안내'}
      />
      <div className="info">
        <div className="info-notice-box">
          <div className="info-notice-left">
            <h2>예약 전 필독사항</h2>
            <p>
              안내사항을 모두 동의하신 분들에 한해 예약이 가능함을 알려드리며
            </p>
            <p>
              안내사항을 읽어보지 않아 생긴 불이익에 대한 책임은 예약자 본인에게
              있습니다.
            </p>
            <p>
              모두의 쾌적한 이용을 위한 조치이니 불편하시더라도 양해
              부탁드립니다.
            </p>
          </div>
          <div className="info-notice-right">
            <h2>체크인 · 체크아웃</h2>
            <p>· 입실 오후 16시 이후 / 퇴실 오전 11시 이전</p>
            <p>
              · 11시 이후 퇴실 시 초과된 시간당 2만원의 추가요금이 발생됩니다.
            </p>
            <p>
              · 입실 안내는 셀프 체크인 하시도록 예약하신 번호로 문자 안내
              드립니다.
            </p>
            <p>(전화 문의는 09:00 ~ 22:00에 가능합니다.)</p>
          </div>
        </div>
        <div className="info-price-box">
          <div className="info-price-left">
            <div className="info-left-title">기본정보</div>
            <div className="info-left-desc">
              <p>
                · 예약 문의 : 010-5555-7777에 연락 주시면 친절히 상담해
                드립니다.
              </p>
              <p>· 계좌 안내 : 농협 123-1234-5678-99 (예금주:이순재)</p>
            </div>
            <div
              onClick={(e) => handleToggle(e)}
              id="t1"
              className="info-left-title"
            >
              기본 이용 안내
              {
                <div className={`info-title-icon ${toggle.t1 ? '' : 'on'}`}>
                  <span></span>
                  <span></span>
                </div>
              }
            </div>
            {toggle.t1 && (
              <div className="info-left-desc">
                <p>
                  · 예약 신청은 전화나 실시간 예약 시스템을 통해서 가능합니다.
                  <br />
                  · 기준 인원 외 추가 인원이 있는 경우 옵션에서 추가 인원 선택
                  결제 바랍니다.
                  <br />
                  · 기준 인원 외 추가 1인 1박당 2만원 추가됩니다.
                  <br />
                  · 36개월 이상 유아부터 인원수 포함됩니다.
                  <br />
                  · 최대 인원 초과 시 현장에서 입실 거부/환불 불가됩니다.
                  <br />
                  · 숙박 예약인원 외 방문자 입실 불가합니다.
                  <br />
                  · 4박 이상 연박 시, 2박 후 1회 중간 청소 요청 가능합니다.
                  <br />
                  - 하루 전 미리 신청 가능합니다.
                  <br />
                  - 중간 청소 시 침구류 교체하지 않습니다.
                  <br />
                  - 수건은 요청 시 매일 교체 가능합니다.
                  <br />
                  · 공용 주방은(카페) 09:00~22:00까지 이용 가능하며
                  와인,샴페인,양주등 주류와 간단한 안주 이용 가능합니다.
                  <br />
                  · 바비큐와 불멍은 지정된 시간에 (17시~22시), 지정된
                  장소에서만(돌담 마당 또는 테라스 바비큐 존) 이용 가능하며,
                  계절과 날씨(강풍/우천)에 따라 안전상 이용이 제한될 수
                  있습니다.
                  <br />· 방역업체를 통해 정기적으로 방역을 진행하고 있으나
                  제주도 주변 환경 특성상 해충이 유입될 수 있는 점 양해
                  부탁드리며 이로 인한 환불은 불가합니다.
                </p>
              </div>
            )}
            <div
              onClick={(e) => handleToggle(e)}
              id="t2"
              className="info-left-title"
            >
              유의 사항
              {
                <div className={`info-title-icon ${toggle.t2 ? '' : 'on'}`}>
                  <span></span>
                  <span></span>
                </div>
              }
            </div>
            {toggle.t2 && (
              <div className="info-left-desc">
                <p>
                  · 지정 흡연 구역 외 전자담배를 포함하여 실내외 전체
                  금연입니다. (위반 과태료 10만원)
                  <br />
                  · 테라스 자쿠지/욕조 물이 넘치지 않게 각별한 주의 요망합니다.
                  (원상 복구 비용 발생)
                  <br />
                  · 개인 입욕제 사용 금지입니다. (욕조 오염 원상 복구 비용 발생)
                  <br />
                  · 생선, 튀김, 고기 등 냄새나 오염이 심한 음식은 객실 내 조리
                  불가합니다.(냄새 제거비용 발생)
                  <br />
                  · 객실에 설치된 화기 이외의 개인 화기 사용 불가합니다.
                  <br />
                  · 양초(티 라이트 등), 접착용 테이프 사용 금지입니다. (원상
                  복구비용 발생)
                  <br />
                  · 시설 및 가구 비품 (침구 포함)의 파손, 무단
                  반출,낙서,오염,분실 시 원상 복구비용 청구됩니다.
                  <br />
                  · 소란, 고성, 음주 가무로 옆 객실에 피해를 주는 행위
                  금지입니다.
                  <br />
                  · 반려동물 동반 입실 불가합니다.
                  <br />
                  · 보호자를 동반하지 않은 미성년자 입실 불가합니다.
                  <br />
                  · 고객님 부주의로 인한 안전사고 및 펜션에 보관 요청하지 않은
                  귀중품 분실은 보상 불가합니다.
                  <br />
                  · 퇴실 시 설거지와 뒷정리해 주시고 쓰레기는 분리하여 1층
                  분리수거함에 배출 바랍니다.
                  <br />
                  ※ 위 규정 포함하여 타 고객에게 피해를 주는 행위에 대해서는
                  부득이 환불 없이 퇴실 요청 또는 비용 청구 드리는 점 양해
                  바랍니다.
                  <br />
                  · 천재지변에 의한 항공기 선박 결항에 따른 취소는 증명자료를
                  제시하는 경우, 결항 당일 숙박비는 전액 환불 가능하며, 결항
                  날짜는 당일이지만, 숙박 날짜가 다른 날인 경우는 일반 환불
                  규정에 따라 환불 가능합니다.
                  <br />· 방역업체를 통해 정기적으로 방역을 진행하고 있으나
                  제주도 주변 환경 특성상 해충이 유입될 수 있는 점 양해
                  부탁드리며 이로 인한 환불은 불가합니다.
                </p>
              </div>
            )}
            <div
              onClick={(e) => handleToggle(e)}
              id="t3"
              className="info-left-title"
            >
              수영장 사용 안내
              {
                <div className={`info-title-icon ${toggle.t3 ? '' : 'on'}`}>
                  <span></span>
                  <span></span>
                </div>
              }
            </div>
            {toggle.t3 && (
              <div className="info-left-desc">
                <p>
                  · 수영장 온수 1박 신청 8만 원, 2박 신청 12만 원, 3박 신청 15만
                  원 (4박 이상 별도 문의)
                  <br />
                  · 이용일 1일 전 신청 바랍니다 (전화 신청 가능 / 온도 올리는데
                  24시간 소요)
                  <br />
                  · 수영장 온수 미 추가 시 냉수로 진행되며 여름에도 차가울 수
                  있습니다.
                  <br />
                  · 입실~퇴실까지 미온수 유지됩니다 (설정온도 33도)
                  <br />
                  · 이용 시간은 09:00 ~ 23:00입니다.
                  <br />※ 연박 예약 시 온수 추가는 중간 온도조절이 불가하여 연박
                  모두 신청해 주셔야 합니다(연박 할인가 적용)
                </p>
              </div>
            )}
            <div
              onClick={(e) => handleToggle(e)}
              id="t4"
              className="info-left-title"
            >
              자쿠지 사용 안내
              {
                <div className={`info-title-icon ${toggle.t4 ? '' : 'on'}`}>
                  <span></span>
                  <span></span>
                </div>
              }
            </div>
            {toggle.t4 && (
              <div className="info-left-desc">
                <p>
                  이용 시간:09:00~23:00
                  <br />
                  ※자쿠지/욕조 물 넘치지 않도록 주의하십시오.
                  <br />
                  ※개별 입욕제 사용 불가합니다.
                </p>
              </div>
            )}
            <div
              onClick={(e) => handleToggle(e)}
              id="t5"
              className="info-left-title"
            >
              바비큐 그릴 및 흑돼지 바비큐 세트 안내
              {
                <div className={`info-title-icon ${toggle.t5 ? '' : 'on'}`}>
                  <span></span>
                  <span></span>
                </div>
              }
            </div>
            {toggle.t5 && (
              <div className="info-left-desc">
                <p>
                  <img
                    src="http://woljeongyeonga.com/uploads/reservation/bbq.jpg"
                    alt=""
                  />
                  <br />
                  <br />
                  · 흑돼지 바비큐
                  <br />
                  · 2인 세트/6만원입니다.
                  <br />
                  ※흑돼지 신청 시 전기 그릴 세트(2만원)무료입니다.
                  <br />
                  · 제주산 흑돼지 600g,야채세트,소시지,김치,컵라면 2개,햇반
                  2개,전기 그릴 세트 포함됩니다.
                  <br />
                  ※ 흑돼지 고기만 추가 시 600g/4만원입니다.
                  <br />
                  · 이용 시간:17:00~22:00입니다.
                  <br />
                  · 객실 룸 냉장고에 신청하신 고기와 야채를 넣어 드리며, 객실별
                  바비큐 존에서 이용 가능합니다.
                  <br />
                  · 날씨(강풍/우천)에 따라 이용이 제한될 수 있습니다.
                  <br />
                  · 고기의 신선도 유지와 재고관리를 위해 미리 주문해 주셔야 이용
                  가능합니다.
                  <br />
                  <br />
                  · 전기 그릴 세트 대여
                  <br />
                  · 1박 1회 사용 2만원입니다.
                  <br />
                  ※흑돼지 신청 시 전기 그릴 세트 무료입니다.
                  <br />
                  · 전기 그릴,가위,집게 등 포함됩니다.
                  <br />
                  · 이용 시간:17:00~22:00
                  <br />· 날씨(강풍/우천)에 따라 이용이 제한될 수 있습니다.
                </p>
              </div>
            )}
            <div
              onClick={(e) => handleToggle(e)}
              id="t6"
              className="info-left-title"
            >
              불멍 안내
              {
                <div className={`info-title-icon ${toggle.t6 ? '' : 'on'}`}>
                  <span></span>
                  <span></span>
                </div>
              }
            </div>
            {toggle.t6 && (
              <div className="info-left-desc">
                <p>
                  · 참나무 장작 1망, 토치 제공됩니다.
                  <br />
                  · 1회 사용 2만원입니다.
                  <br />
                  · 이용 시간:17:00~22:00
                  <br />
                  · 날씨(강풍/우천)에 따라 이용이 제한될 수 있습니다.
                  <br />· 개인 장작 지참 불가합니다.
                </p>
              </div>
            )}
            <div
              onClick={(e) => handleToggle(e)}
              id="t7"
              className="info-left-title"
            >
              환불규정
              {
                <div className={`info-title-icon ${toggle.t7 ? '' : 'on'}`}>
                  <span></span>
                  <span></span>
                </div>
              }
            </div>
            {toggle.t7 && (
              <div className="info-left-desc">
                <p>
                  ★ 올바른 예약문화 정착을 위하여 예약 취소 시 환불기준을 아래와
                  같이 운영하고 있으니, 꼭 확인을 하시고 예약해 주시기 바랍니다.
                  <br />
                  · 취소수수료는 예약 시점과는 무관한 이용일 기준입니다.
                  <br />
                  · 환불 시 결제하신 금액에서 취소수수료를 제외한 금액을 환불해
                  드립니다.
                  <br />
                  · 취소수수료는 결제금액이 아닌 예약금(객실 요금+기타 옵션
                  요금) 기준으로 책정됩니다.
                  <br />· 환불 시 아래의 기준일에 따른 환불 금액을 드립니다.
                </p>
                <div className="panalty">
                  <table className="cancelfee" border={1}>
                    <thead>
                      <tr>
                        <th>기준</th>
                        <th>취소수수료(%)</th>
                        <th>환불액(%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>이용일 당일</th>
                        <th>100%</th>
                        <th>0% 환불없음</th>
                      </tr>
                      <tr>
                        <th>이용일 1 일전</th>
                        <th>90%</th>
                        <th>10% 환불</th>
                      </tr>
                      <tr>
                        <th>이용일 2 일전</th>
                        <th>80%</th>
                        <th>20% 환불</th>
                      </tr>
                      <tr>
                        <th>이용일 3일전</th>
                        <th>70%</th>
                        <th>30% 환불</th>
                      </tr>
                      <tr>
                        <th>이용일 4 일전</th>
                        <th>60%</th>
                        <th>40% 환불</th>
                      </tr>
                      <tr>
                        <th>이용일 5 일전</th>
                        <th>50%</th>
                        <th>50% 환불</th>
                      </tr>
                      <tr>
                        <th>이용일 6 일전</th>
                        <th>40%</th>
                        <th>60% 환불</th>
                      </tr>
                      <tr>
                        <th>이용일 7 일전</th>
                        <th>30%</th>
                        <th>70% 환불</th>
                      </tr>
                      <tr>
                        <th>이용일 8 일전</th>
                        <th>20%</th>
                        <th>80% 환불</th>
                      </tr>
                      <tr>
                        <th>이용일 9 일전</th>
                        <th>10%</th>
                        <th>90% 환불</th>
                      </tr>
                      <tr>
                        <th>이용일 10 일전</th>
                        <th>0%</th>
                        <th>100% 환불</th>
                      </tr>
                      <tr>
                        <th>기본 취소 수수료</th>
                        <th>0%</th>
                        <th>100% 환불</th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            <button onClick={valiCheck} className="info-left-btn" type="button">
              실시간 예약하기
            </button>
          </div>
          <div className="info-price-right">
            <div className="info-price-title">객실 요금표</div>
            <div>
              <div className="info-table-title">
                <div>
                  <button onClick={() => dateChange(-5)}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </button>
                </div>
                <p>
                  {datePick.format('YYYY년 MM월 DD일')} ~{' '}
                  {datePick.add(4, 'd').format('YYYY년 MM월 DD일')}
                </p>
                <div>
                  <button onClick={() => dateChange(+5)}>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                </div>
              </div>
              <table className="info-table-h">
                <tbody>
                  <tr>
                    <td className="blank" rowSpan="2">
                      <p>객실명</p>
                      <p>(기준~최대)</p>
                    </td>
                    {dateList.map((date) => (
                      <td>
                        {seasonType(date, pop).ispop === 1
                          ? '성수기'
                          : '비수기'}
                        /
                        {seasonType(date, pop).week === 'weekends'
                          ? '주말'
                          : '주중'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    {dateList.map((list) => (
                      <td
                        style={{
                          color: `${
                            list.get('day') === 0
                              ? '#f00'
                              : list.get('day') === 6
                              ? '#00f'
                              : '#000'
                          }`,
                        }}
                      >
                        <p>{list.format('MM월 DD일')}</p>
                        <p>({dayPick[list.get('day')]})</p>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
              <table className="info-table-b">
                <tbody>
                  {guestRooms.map((room) => (
                    <>
                      <tr>
                        <td className="blank" rowSpan="2">
                          <p>
                            {room.r_id}
                            {facilitiesList(room.zacuzi, room.tub, room.pool)}
                          </p>
                          <p>
                            기준{room.ini_people}/최대{room.max_people}
                          </p>
                          <p>{room.size}</p>
                        </td>
                        {dateList.map((date) => (
                          <td>
                            {roomPriceCal(date, date.add(1, 'd'), pop, {
                              weekPop: room.pop_weekday,
                              weekendPop: room.pop_weekend,
                              weekUnpop: room.un_weekday,
                              weekendUnpop: room.un_weekend,
                            }).toLocaleString()}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        {dateList.map((date) => (
                          <td>
                            <IsAvailableRoom
                              r_id={room.r_id}
                              startDate={date}
                            />
                          </td>
                        ))}
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
