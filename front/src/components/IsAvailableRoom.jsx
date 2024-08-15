import axios from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

export default function IsAvailableRoom({ r_id, startDate }) {
  let result = 0;
  const [availableRooms, setAvailableRooms] = useState([]);
  const formatStartDate = startDate.format('YYYY-MM-DD');
  const formatEndDate = startDate.add(1, 'd').format('YYYY-MM-DD');
  useEffect(() => {
    const url2 = 'http://127.0.0.1:8080/rev/get/rooms';
    const data = { startDate: formatStartDate, endDate: formatEndDate };
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
  }, [startDate]);

  availableRooms.forEach((room) => {
    if (room.r_id === r_id) {
      result = 1;
    }
  });
  if (dayjs() > startDate) {
    result = 0;
  }
  // console.log('isavaResult', startDate, r_id, availableRooms);
  if (result) {
    return <p style={{ color: 'dodgerblue', fontWeight: 'bold' }}>예약 가능</p>;
  } else {
    return <p style={{ color: 'tomato ', fontWeight: 'bold' }}>예약 불가</p>;
  }
}
