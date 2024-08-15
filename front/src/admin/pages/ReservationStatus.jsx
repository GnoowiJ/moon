import React, { useEffect, useState } from "react";
import "../css/reservationStatus.css";
import { Link } from "react-router-dom";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { getRevInfoList, getRevStatistics } from "../../redux/modules/reduxRevAxios";
import { holidayList } from "../holidays/holidays";
import { getAdmin } from "../../util/localStorage";
import Error404 from "../../components/Error404";

export default function ReservationStatus() {
  // 로그인 정보 가져오기
  const adminInfo = getAdmin();
  // 오늘 날짜
  const now = dayjs();
  const nowStr = dayjs().format("YYYY-MM-DD");
  // 조회 첫날 세팅
  const firstDate = now.add(-2, "day")
  // 조회 대상 주의 첫 날
  const [selectDate, setSelectDate] = useState(firstDate);
  // 요일 리스트
  const dayStrList = ["일", "월", "화", "수", "목", "금", "토"];
  // dispatch 정의
  const dispatch = useDispatch();
  // redux 연동 (예약리스트, 객실리스트)
  const { revList, roomList } = useSelector(state => state.rev.revInfoList);
  // redux 연동 (오늘의 통계)
  const revStatistics = useSelector(state => state.rev.revStatistics);

  useEffect(() => {
    const data = setDateDays();
    // 예약리스트, 객실리스트 조회
    dispatch(getRevInfoList(data));
    // 오늘의 통계 조회
    dispatch(getRevStatistics());
  }, [selectDate])

  // 통계자료 객체 useState
  const [revStatObject, setRevStatObject] = useState({});
  // 통계자료 세팅
  useEffect(() => {
    // 미확정
    const beforepay = revStatistics.filter((rev) => rev.rev_state === "미확정");
    // 예약 확정
    const afterpay = revStatistics.filter((rev) => rev.rev_state === "예약 확정");
    // 입실 전
    const beforeCheckIn = revStatistics.filter((rev) => rev.rev_state === "예약 확정" && rev.checkin_date === nowStr);
    // 입실 완료
    const afterCheckIn = revStatistics.filter((rev) => rev.rev_state === "입실 완료");
    // 퇴실 전
    const beforeCheckOut = revStatistics.filter((rev) => rev.rev_state === "입실 완료" && rev.checkout_date === nowStr);
    // 퇴실 완료
    const afterCheckOut = revStatistics.filter((rev) => rev.rev_state === "퇴실 완료");
    // 예약 불가
    const noReservation = revStatistics.filter((rev) => rev.rev_state === "예약 불가");
    setRevStatObject({
      total: revStatistics.length,
      beforepay: beforepay.length,
      afterpay: afterpay.length,
      beforeCheckIn: beforeCheckIn.length,
      afterCheckIn: afterCheckIn.length,
      beforeCheckOut: beforeCheckOut.length,
      afterCheckOut: afterCheckOut.length,
      noReservation: noReservation.length
    });
  }, [revStatistics]);

  /**
   * 조회날짜 변경
   * @param {*} addDate 
   */
  function handleSelectDate(addDate) {
    setSelectDate(selectDate.add(addDate, "day"));
  }

  /**
   * 날짜리스트 생성
   * @returns 
   */
  function setDateDays() {
    const dateArr = [];
    for (let i = 0; i <= 13; i++) {
      const dateJson = {
        fullDate: selectDate.add(i, "day").format("YYYY-MM-DD"),
        month: selectDate.add(i, "day").get("month"),
        date: selectDate.add(i, "day").get("date"),
        day: selectDate.add(i, "day").get("day"),
        amResv: null,
        pmResv: null,
      }
      if (selectDate.add(i, "day").get("day") === 0 ||
        holidayList.includes(selectDate.add(i, "day").format("YYYY-MM-DD")))
        dateArr.push({ ...dateJson, holiday: true });
      else dateArr.push({ ...dateJson, holiday: false });
    }
    return dateArr;
  }
  // room별 예약정보를 담은 2차원 배열
  const resvListPerDate = [];
  // room 단위로 작업
  roomList.forEach((room) => {
    // 날짜별 예약정보를 담을 1차원 배열
    const resvList = [];
    setDateDays().forEach((date) => {
      date.room = room.r_id;
      const resvData = revList.filter(
        (data) =>
          date.fullDate >= data.checkin_date &&
          date.fullDate <= data.checkout_date &&
          data.r_id === room.r_id
      );
      // 해당 날짜 예약이 존재하는 경우
      if (resvData.length > 0) {
        resvData.forEach((resv) => {
          // 오전 세팅 (체크인일을 제외한 나머지)
          if (resv.checkin_date < date.fullDate) date.amResv = resv;
          // 오후 세팅 (체크아웃일을 제외한 나머지)
          if (resv.checkout_date > date.fullDate) date.pmResv = resv;
        });
      }
      resvList.push(date);
    });
    resvListPerDate.push(resvList);
  });

  /**
   * title 정의
   * @returns 
   */
  function setTitie() {
    let titleTag = null;
    if (selectDate.add(13, "day").get("year") > selectDate.get("year")) {
      titleTag = (
        `${selectDate.get("year")}년 ${selectDate.get("month") + 1}월~${selectDate.add(13, "day").get("year")}년 ${selectDate.add(13, "day").get("month") + 1}월 예약현황`
      );
    } else if (selectDate.add(13, "day").get("month") > selectDate.get("month")) {
      titleTag = (
        `${selectDate.get("year")}년 ${selectDate.get("month") + 1}~${selectDate.add(13, "day").get("month") + 1}월 예약현황`
      );
    } else {
      titleTag = (
        `${selectDate.get("year")}년 ${selectDate.get("month") + 1}월 예약현황`
      );
    }
    return titleTag;
  }

  /**
   * 오늘 날짜로 되돌아가기
   */
  function handleReturn() {
    setSelectDate(firstDate);
  }

  /**
   * 예약 상태 체크
   * @param {*} revStatus 
   * @param {*} checkinDate 
   * @param {*} checkoutDate 
   * @returns 
   */
  function getReservationStatus(revStatus, checkinDate, checkoutDate) {
    let status = "";
    // 입금 전(미확정)
    if (revStatus === "미확정") status = "beforepay";
    // 예약 확정
    else if (revStatus === "예약 확정") {
      // 당일이 체크인일인 경우 입실 전으로 변경
      if (nowStr === checkinDate) status = "beforecheckin";
      else status = "afterpay";
      // 입실 완료
    } else if (revStatus === "입실 완료") {
      // 당일이 체크아웃일인 경우
      if (nowStr === checkoutDate) status = "beforecheckout";
      else status = "aftercheckin";
      // 퇴실 완료
    } else if (revStatus === "퇴실 완료") status = "aftercheckout";
    // 예약 불가
    else if (revStatus === "예약 불가") status = "noreservation";
    return status;
  }

  if (adminInfo) {
    return (
      <div className="a-outlet flex-col">
        <div className="reservation-status-outlet">
          <h1 className="reservation-status-title">
            <span className="reservation-status-arrow">
              <MdArrowBackIos onClick={() => handleSelectDate(-14)} />
            </span>
            <span>{setTitie()}</span>
            <span className="reservation-status-arrow">
              <MdArrowForwardIos onClick={() => handleSelectDate(14)} />
            </span>
          </h1>
          <div className="reservation-status-statistics">
            <h2 className="reservation-status-statistics-title">당월({now.format("YYYY년 M월")}) 통계</h2>
            <ul className="reservation-status-statistics-info">
              <li>
                <p className="reservation-status-statistics-list">미확정(입금 전)</p>
                <div className="reservation-status-statistics-chart-area">
                  <div className="reservation-status-statistics-chart chart-beforepay"
                    style={{
                      width: `${revStatObject.beforepay / revStatObject.total * 100}%`,
                      color: `${revStatObject.beforepay === 0 ? "#000" : "#fff"}`
                    }}>
                    <p className="reservation-status-statistics-chart-beforepay">{revStatObject.beforepay}건</p>
                  </div>
                </div>
              </li>
              <li>
                <p className="reservation-status-statistics-list">예약 확정</p>
                <div className="reservation-status-statistics-chart-area">
                  <div className="reservation-status-statistics-chart chart-afterpay"
                    style={{ width: `${revStatObject.afterpay / revStatObject.total * 100}%` }}>
                    <p className="reservation-status-statistics-chart-afterpay">{revStatObject.afterpay}건</p>
                  </div>
                </div>
              </li>
              <li>
                <p className="reservation-status-statistics-list">입실 전</p>
                <div className="reservation-status-statistics-chart-area">
                  <div className="reservation-status-statistics-chart chart-beforeCheckIn"
                    style={{ width: `${revStatObject.beforeCheckIn / revStatObject.total * 100}%` }}>
                    <p className="reservation-status-statistics-chart-beforeCheckIn">{revStatObject.beforeCheckIn}건</p>
                  </div>
                </div>
              </li>
              <li>
                <p className="reservation-status-statistics-list">입실 완료</p>
                <div className="reservation-status-statistics-chart-area">
                  <div className="reservation-status-statistics-chart chart-afterCheckIn"
                    style={{ width: `${revStatObject.afterCheckIn / revStatObject.total * 100}%` }}>
                    <p className="reservation-status-statistics-chart-afterCheckIn">{revStatObject.afterCheckIn}건</p>
                  </div>
                </div>
              </li>
              <li>
                <p className="reservation-status-statistics-list">퇴실 전</p>
                <div className="reservation-status-statistics-chart-area">
                  <div className="reservation-status-statistics-chart chart-beforeCheckOut"
                    style={{ width: `${revStatObject.beforeCheckOut / revStatObject.total * 100}%` }}>
                    <p className="reservation-status-statistics-chart-beforeCheckOut">{revStatObject.beforeCheckOut}건</p>
                  </div>
                </div>
              </li>
              <li>
                <p className="reservation-status-statistics-list">퇴실 완료</p>
                <div className="reservation-status-statistics-chart-area">
                  <div className="reservation-status-statistics-chart chart-afterCheckOut"
                    style={{
                      width: `${revStatObject.afterCheckOut / revStatObject.total * 100}%`,
                      color: `${revStatObject.afterCheckOut === 0 ? "#000" : "#fff"}`
                    }}>
                    <p className="reservation-status-statistics-chart-afterCheckOut">{revStatObject.afterCheckOut}건</p>
                  </div>
                </div>
              </li>
              <li>
                <p className="reservation-status-statistics-list">예약 불가</p>
                <div className="reservation-status-statistics-chart-area">
                  <div className="reservation-status-statistics-chart chart-noReservation"
                    style={{
                      width: `${revStatObject.noReservation / revStatObject.total * 100}%`,
                      color: `${revStatObject.noReservation === 0 ? "#000" : "#fff"}`
                    }}>
                    <p className="reservation-status-statistics-chart-noReservation">{revStatObject.noReservation}건</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <table border={1} className="reservation-status-table">
            <thead>
              <tr>
                <th className="reservation-status-trow-title"></th>
                {setDateDays().map((dateDay, index) => {
                  if (dateDay.holiday) {
                    return (
                      <th
                        className={`reservation-status-trow-content ${dateDay.fullDate === nowStr && 'highlight-today'}`}
                        colSpan={2}
                        style={{ color: "#f00", fontWeight: "normal" }}
                        key={index}
                      >
                        {selectDate.get("month") === dateDay.month ? dateDay.date : `${dateDay.month + 1}/${dateDay.date}`}{`(${dayStrList[dateDay.day]})`}
                      </th>
                    );
                  } else if (dateDay.day === 6) {
                    return (
                      <th
                        className={`reservation-status-trow-content ${dateDay.fullDate === nowStr && 'highlight-today'}`}
                        colSpan={2}
                        style={{ color: "#0080ff", fontWeight: "normal" }}
                        key={index}
                      >
                        {selectDate.get("month") === dateDay.month ? dateDay.date : `${dateDay.month + 1}/${dateDay.date}`}{`(${dayStrList[dateDay.day]})`}
                      </th>
                    );
                  } else {
                    return (
                      <th
                        className={`reservation-status-trow-content ${dateDay.fullDate === nowStr && 'highlight-today'}`}
                        colSpan={2}
                        style={{ color: `${dateDay.fullDate === nowStr ? "#000" : "#fff"}`, fontWeight: "normal" }}
                        key={index}
                      >
                        {selectDate.get("month") === dateDay.month ? dateDay.date : `${dateDay.month + 1}/${dateDay.date}`}{`(${dayStrList[dateDay.day]})`}
                      </th>
                    );
                  }
                })}
              </tr>
            </thead>
            <tbody>
              {resvListPerDate.map((roomArray, index) => (
                <tr key={index}>
                  <td className="reservation-status-trow-title">
                    {roomArray[0].room}
                  </td>
                  {roomArray.map((resv) => (
                    <>
                      {resv.amResv ? (
                        <td
                          className={`${resv.fullDate}-am reservation-status-trow-td-content 
                        ${resv.fullDate === resv.amResv.checkout_date ? "rev-end-date" : "rev-middle-date"} 
                        ${resv.fullDate === nowStr && "highlight-today"} 
                        rev-status-${getReservationStatus(resv.amResv.rev_state, resv.amResv.checkin_date, resv.amResv.checkout_date)}`}
                        >
                          <Link
                            to={resv.amResv.rev_state === "퇴실 완료" ? `/admin/reservation/history/${resv.amResv.rev_id}` : `/admin/reservation/detail/${resv.amResv.rev_id}`}
                          >
                            {resv.fullDate === firstDate.format("YYYY-MM-DD") && (
                              <span className="reservation-status-trow-td-username">
                                {resv.amResv.c_name}
                              </span>
                            )}
                          </Link>
                        </td>
                      ) : (
                        <td
                          className={`${resv.fullDate}-am reservation-status-trow-td-content 
                        ${resv.fullDate === nowStr && "highlight-today"}`}
                        ></td>
                      )}
                      {resv.pmResv ? (
                        <td
                          className={`${resv.fullDate}-pm reservation-status-trow-td-content 
                        ${resv.fullDate === resv.pmResv.checkin_date ? "rev-start-date" : "rev-middle-date"} 
                        ${resv.fullDate === nowStr && "highlight-today"} 
                        rev-status-${getReservationStatus(resv.pmResv.rev_state, resv.pmResv.checkin_date, resv.pmResv.checkout_date)}`}
                        >
                          <Link
                            to={resv.pmResv.rev_state === "퇴실 완료" ? `/admin/reservation/history/${resv.pmResv.rev_id}` : `/admin/reservation/detail/${resv.pmResv.rev_id}`}
                          >
                            {resv.fullDate === resv.pmResv.checkin_date && (
                              <span className="reservation-status-trow-td-username">
                                {resv.pmResv.c_name}
                              </span>
                            )}
                          </Link>
                        </td>
                      ) : (
                        <td
                          className={`${resv.fullDate}-pm reservation-status-trow-td-content 
                        ${resv.fullDate === nowStr && "highlight-today"}`}
                        ></td>
                      )}
                    </>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectDate.format("YYYY-MM-DD") !== firstDate.format("YYYY-MM-DD") &&
          <button className="reservation-status-btn-return" onClick={handleReturn}>
            <h3>오늘 날짜로 돌아가기</h3>
          </button>
        }
      </div>
    );
  } else {
    return <Error404 message={"접근 권한이 없습니다."} isAdmin={true} />
  }
}
