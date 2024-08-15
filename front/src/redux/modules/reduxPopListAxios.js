import { setPopList } from "../reducers/popReducer.js";
import { axiosGet } from "./reduxAxios.js";

export const getPopList = () => {
  const url = "http://127.0.0.1:8080/room/popday";
  return async (dispatch) => {
    const popList = await axiosGet({ url });
    dispatch(setPopList(popList));
  }
};