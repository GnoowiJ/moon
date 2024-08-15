import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PickDate from '../../components/reservations/PickDate.jsx';
import '../css/roomprice.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { getPopList } from "../../redux/modules/reduxPopListAxios.js"
import { getAdmin } from '../../util/localStorage.js';
import Error404 from '../../components/Error404.jsx';




const formatDate = (date) => {
  if (!date) return '';
  const formattedDate = new Date(date);
  if (isNaN(formattedDate.getTime())) return '';
  return formattedDate.toISOString().split('T')[0];
};

const formatNumberWithCommas = (value) => {
  if (value === '') return '';
  return parseFloat(value).toLocaleString();
};

const removeCommas = (value) => {
  return value.replace(/,/g, '');
};

const RoomPrice = () => {
  const admincheck = getAdmin();
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [season, setSeason] = useState('성수기');
  const [prices, setPrices] = useState({ 성수기: [], 비수기: [] });
  const [rooms, setRooms] = useState([]);
  const seasons = useSelector((state) => state.pop.popList);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/roomprice/rooms'
        );
        const roomsData = response.data;
        setRooms(roomsData);

        const initialPrices = {
          성수기: roomsData.map((room) => ({
            room: room.r_id,
            weekday: room.pop_weekday || '',
            weekend: room.pop_weekend || '',
            extra: room.add_person || '',
          })),
          비수기: roomsData.map((room) => ({
            room: room.r_id,
            weekday: room.un_weekday || '',
            weekend: room.un_weekend || '',
            extra: room.add_person || '',
          })),
        };

        setPrices(initialPrices);
      } catch (error) {
        console.error('객실을 가져오는 데 오류가 발생했습니다.', error);
      }
    };

    dispatch(getPopList());
    fetchRooms();
  }, [dispatch, season]);

  const handleChange = (season, index, field, value) => {
    const numericValue = removeCommas(value);
    const updatedPrices = { ...prices };
    updatedPrices[season][index][field] = numericValue;
    setPrices(updatedPrices);
  };

  const handleInputChange = (season, index, field, value) => {
    const numericValue = removeCommas(value);
    const formattedValue = formatNumberWithCommas(numericValue);
    const updatedPrices = { ...prices };
    updatedPrices[season][index][field] = numericValue;
    setPrices(updatedPrices);
  };

  const handleDeleteSeason = async (pop_id) => {
    try {
      await axios.delete(
        `http://localhost:8080/roomprice/peakseason/${pop_id}`
      );
      dispatch(getPopList());
      alert('성수기 기간이 성공적으로 삭제되었습니다.');
    } catch (error) {
      console.error('성수기 기간 삭제 중 오류가 발생했습니다.', error);
      alert('성수기 기간 삭제 중 오류가 발생했습니다.');
    }
  };

  const handleSubmit = async () => {
    const seasonPrices = prices[season];
    for (const price of seasonPrices) {
      try {
        await axios.post('http://localhost:8080/roomprice/price', {
          r_id: price.room,
          season: season,
          pop_weekday: season === '성수기' ? price.weekday : 0,
          pop_weekend: season === '성수기' ? price.weekend : 0,
          un_weekday: season === '비수기' ? price.weekday : 0,
          un_weekend: season === '비수기' ? price.weekend : 0,
          add_person: price.extra,
        });
      } catch (error) {
        console.error('가격 제출 중 오류가 발생했습니다!', error);
      }
    }
    alert('가격설정 완료');
  };

  const getStartDateValue = (date) => {
    setStartDate(formatDate(date));
  };

  const getEndDateValue = (date) => {
    setEndDate(formatDate(date));
  };

  const datesubmit = async () => {
    if (!startDate || !endDate) {
      alert('시작일과 종료일을 선택해주세요');
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      alert('종료일이 시작일보다 빠릅니다');
      return;
    }
    if (new Date(startDate).getTime() === new Date(endDate).getTime()) {
      alert('시작일과 종료일이 같습니다');
      return;
    }

    try {
      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);
      if (!formattedStartDate || !formattedEndDate) {
        throw new Error('날짜 형식이 잘못되었습니다.');
      }

      await axios
        .post('http://localhost:8080/roomprice/peakseasons', {
          start_date: formattedStartDate,
          end_date: formattedEndDate,
        })
        .then((res) => {
          console.log(res);
          dispatch(getPopList());
          alert('성수기 기간이 성공적으로 등록되었습니다.');
        });
    } catch (error) {
      console.error('성수기 기간 등록 중 오류가 발생했습니다.', error);
      alert('성수기 기간 등록 중 오류가 발생했습니다.');
    }
  };

 if(admincheck){return (
    <div className="a-outlet flex-col">
      <h2>성수기 기간 설정</h2>
      <div className="rev-date">
        <PickDate name="시작" getDateValue={getStartDateValue} defVal={''} />
        <PickDate name="종료" getDateValue={getEndDateValue} defVal={''} />
        <button className="date-button" onClick={datesubmit}>
          입력
        </button>
      </div>
      <div>
        <ul className="date-list">
          {seasons.map((season, index) => (
            <li key={index}>
              {season.popStart} - {season.popEnd}
              <button
                className="season-delete-button"
                onClick={() => handleDeleteSeason(season.pop_id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <h2 className="season-priceset">{season} 가격 설정</h2>
      <div className="header">
        <div
          className={`tab ${season === '성수기' ? 'active' : ''}`}
          onClick={() => setSeason('성수기')}
        >
          성수기
        </div>
        <div
          className={`tab ${season === '비수기' ? 'active' : ''}`}
          onClick={() => setSeason('비수기')}
        >
          비수기
        </div>
      </div>

      <table className="price-table">
        <thead>
          <tr className="price-table-title">
            <th>객실</th>
            <th>주중 가격</th>
            <th>주말 가격</th>
            <th>추가인원 가격</th>
          </tr>
        </thead>
        <tbody>
          {rooms.length > 0 &&
            prices[season].map((room, index) => (
              <tr key={index}>
                <td>{room.room}</td>

                <td>
                  <input
                    type="text"
                    value={formatNumberWithCommas(room.weekday)}
                    onChange={(e) =>
                      handleChange(season, index, 'weekday', e.target.value)
                    }
                    onBlur={(e) =>
                      handleInputChange(
                        season,
                        index,
                        'weekday',
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={formatNumberWithCommas(room.weekend)}
                    onChange={(e) =>
                      handleChange(season, index, 'weekend', e.target.value)
                    }
                    onBlur={(e) =>
                      handleInputChange(
                        season,
                        index,
                        'weekend',
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={formatNumberWithCommas(room.extra)}
                    onChange={(e) =>
                      handleChange(season, index, 'extra', e.target.value)
                    }
                    onBlur={(e) =>
                      handleInputChange(season, index, 'extra', e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="submit">
        <button className="submit-button" onClick={handleSubmit}>
          입력
        </button>
      </div>
    </div>
  );}else return <Error404 message={"관리자 로그인 해야겠지?"} isAdmin={true}/>
};

export default RoomPrice;
