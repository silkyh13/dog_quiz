import { createSlice } from "@reduxjs/toolkit";

export const dogInfo = createSlice({
  name: "dogData",
  initialState: { value: [], size: [] },
  reducers: {
    setDogData: (state, action) => {
      console.log(action.payload);
      state.value = [...action.payload];
    },
    setSize: (state, action) => {
      console.log("group them by size", action.payload);
      //   state.size = action.payload;
    },
  },
});

export const { setDogData, setSize } = dogInfo.actions;
export const stateOfDogData = (state) => state.dogData;

export default dogInfo.reducer;
