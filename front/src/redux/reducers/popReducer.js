import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  popList: []
};

const popReducer = createSlice({
  name: "pop",
  initialState,
  reducers: {
    setPopList(state, action) {
      state.popList = action.payload;
    }
  },
});

export const { setPopList } = popReducer.actions;
export default popReducer.reducer;