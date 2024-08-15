import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  galList : []
};

const galReducer = createSlice({
  name: "gal",
  initialState,
  reducers: {
    setGalleryList(state, action){
      state.galList = action.payload;
    }
  },
});

export const { setGalleryList } = galReducer.actions;
export default galReducer.reducer;
