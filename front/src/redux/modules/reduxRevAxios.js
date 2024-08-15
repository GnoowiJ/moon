import {
  setStartDate,
  setEndDate,
  setRevRoom,
  setRevNo,
  setRevInfoList,
  setRevStatistics
} from "../reducers/revReducer";
import { axiosGet, axiosPost } from "./reduxAxios";

export const getStartDate = (date) => {
  return async (dispatch) => {
    dispatch(setStartDate({ date: date }));
  };
};
export const getEndDate = (date) => {
  return async (dispatch) => {
    dispatch(setEndDate({ date: date }));
  };
};
export const getRevRoom = (roomId) => {
  return async (dispatch) => {
    dispatch(setRevRoom({ roomId: roomId }));
  };
};
export const getRevNo = (revNo) => {
  console.log(revNo);
  return async (dispatch) => {
    dispatch(setRevNo({ revNo: revNo }));
  };
};

/**
 * 예약리스트 조회
 * @param {*} dateParam 
 * @returns 
 */
export const getRevInfoList = (data) => {
  const url = `http://127.0.0.1:8080/reservation/revList`;
  return async (dispatch) => {
    const { revList, roomList } = await axiosPost({ url, data });
    dispatch(setRevInfoList({ revList, roomList }));
  }
};

/**
 * 예약현황 오늘의 통계 조회
 * @returns 
 */
export const getRevStatistics = () => {
  const url = `http://127.0.0.1:8080/reservation/revStatistics`;
  return async (dispatch) => {
    const revStatistics = await axiosGet({ url });
    dispatch(setRevStatistics(revStatistics));
  }
}