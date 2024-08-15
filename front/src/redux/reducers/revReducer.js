import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  startDate: "",
  endDate: "",
  revRoom: "",
  revNo: "",
  revInfoList: { revList: [], roomList: [] },
  revStatistics: []
};

const revReducer = createSlice({
  name: "rev",
  initialState,
  reducers: {
    setStartDate(state, action) {
      state.startDate = action.payload.date;
    },
    setEndDate(state, action) {
      state.endDate = action.payload.date;
    },
    setRevRoom(state, action) {
      state.revRoom = action.payload.roomId;
    },
    setRevNo(state, action) {
      state.revNo = action.payload.revNo;
    },
    setRevInfoList(state, action) {
      state.revInfoList.revList = action.payload.revList;
      state.revInfoList.roomList = action.payload.roomList;
    },
    setRevStatistics(state, action) {
      state.revStatistics = action.payload;
    }
  },
});

export const { setStartDate, setEndDate, setRevRoom,
  setRevNo, setRevInfoList, setRevStatistics } =
  revReducer.actions;
export default revReducer.reducer;
