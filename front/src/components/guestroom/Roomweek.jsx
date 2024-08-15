import React, { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { roomPriceCal, seasonType } from '../../components/modules/priceCal';
import IsAvailableRoom from '../../components/IsAvailableRoom';
import { useDispatch, useSelector } from 'react-redux';
import { getPopList } from '../../redux/modules/reduxPopListAxios';

dayjs.locale('ko');

export default function Roomweek({ room }) {
  const roomweekRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const observerOptions = {
      threshold: 0.01,
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!entry.target.classList.contains('fade-in')) {
            entry.target.classList.add('fade-in');
          }
        } else {
          entry.target.classList.remove('fade-in'); // 화면에서 사라질 때 클래스 제거
        }
      });
    }, observerOptions);

    if (roomweekRef.current) {
      observer.observe(roomweekRef.current);
    }

    return () => {
      if (roomweekRef.current) {
        observer.unobserve(roomweekRef.current);
      }
    };
  }, []);
  const [roomDetail, setroomDetail] = useState([]);
  const { rid } = useParams();
  // let roomDetailIsRoom1 = '';
  // let roomDetailIsRoom0 = '';

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8080/room/${rid}`)
      .then((response) => {
        setroomDetail(response.data);
      })
      .catch((error) => console.log(error));
  }, [rid]);
  const roomDetailIsRoom1 = roomDetail.filter(
    (detail) => detail.is_room === '1'
  )[0];
  const roomDetailIsRoom0 = roomDetail.filter(
    (detail) => detail.is_room === '0'
  );

  const [roomprices, setRoomprices] = useState({});

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8080/room/price/${rid}`)
      .then((response) => {
        const resData = response.data;
        const roomPrice = {
          weekPop: resData.pop_weekday,
          weekUnpop: resData.un_weekday,
          weekendPop: resData.pop_weekend,
          weekendUnpop: resData.un_weekend,
        };
        setRoomprices(roomPrice);
      })
      .catch((error) => console.log(error));
  }, [roomprices]);

  const pop = useSelector((state) => state.pop.popList);
  useEffect(() => {
    dispatch(getPopList());
  }, [pop]);

  const roomDetail1 = roomDetailIsRoom1 ? roomDetailIsRoom1 : {};
  const now = dayjs();
  const [selectDay, setSelectDay] = useState(now);
  const [viewdays, setViewdays] = useState([]);

  useEffect(() => {
    const viewArr = [];
    for (let i = 0; i < 5; i++) {
      viewArr.push(selectDay.add(i, 'd'));
    }
    setViewdays(viewArr);
  }, [selectDay]);

  const addViewDay = (days) => {
    setSelectDay(selectDay.add(days, 'd'));
  };

  const getDayColor = (day) => {
    const dayOfWeek = day.get('day');
    if (dayOfWeek === 0) {
      return 'tomato';
    } else if (dayOfWeek === 6) {
      return 'dodgerblue';
    } else {
      return 'black';
    }
  };

  return (
    <div ref={roomweekRef} className="container animation-right">
      <h1 className="roomweek-h1">{room}</h1>
      <div className="navigation">
        <div>
          <button onClick={() => addViewDay(-5)}>
            {<FontAwesomeIcon icon={faChevronLeft} />}
          </button>
        </div>
        <p>
          {selectDay.format('YYYY년 MM월 DD일')} ~{' '}
          {selectDay.add(4, 'd').format('YYYY년 MM월 DD일')}
        </p>{' '}
        <div>
          <button onClick={() => addViewDay(+5)}>
            {<FontAwesomeIcon icon={faChevronRight} />}
          </button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            {viewdays.map((day) => (
              <th key={day.format('YYYY-MM-DD')}>
                <span style={{ color: getDayColor(day) }}>
                  {day.format('MM월 DD일 (ddd)')}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {viewdays.map((day) => (
              <th>
                {seasonType(day, pop).ispop === 1 ? '성수기' : '비수기'}/
                {seasonType(day, pop).week === 'weekends' ? '주말' : '주중'}
              </th>
            ))}
          </tr>
          <tr>
            {viewdays.map((day) => (
              <th>
                {roomPriceCal(
                  day.format('YYYY-MM-DD'),
                  day.add(1, 'd').format('YYYY-MM-DD'),
                  pop,
                  roomprices
                ).toLocaleString()}
              </th>
            ))}
          </tr>

          <tr>
            {viewdays.map((day) => (
              <td>
                <IsAvailableRoom
                  r_id={rid}
                  startDate={day}
                />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <div className="roomweek-info">
        <div className="info-item">
          <h3 className="info-item-title">구조넓이</h3>
          <p>
            {roomDetail1.rsize &&
              roomDetail1.rsize.split('<br />').map((line) => (
                <>
                  {line}
                  <br />
                </>
              ))}
          </p>
        </div>
        <div className="info-item">
          <h3 className="info-item-title">기준 인원</h3>
          <p>
            기준 {roomDetail1.init_people}명 ~ 최대 {roomDetail1.max_people}명 /
            초과인원불가
          </p>
        </div>
        <div className="info-item">
          <h3 className="info-item-title">구비시설</h3>
          <p>{roomDetail1.facilities}</p>
        </div>
        <div className="info-item">
          <h3 className="info-item-title">특이사항</h3>
          <p>{roomDetail1.significant}</p>
        </div>
      </div>
    </div>
  );
}
