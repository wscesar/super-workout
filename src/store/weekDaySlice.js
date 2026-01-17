import { createSlice } from "@reduxjs/toolkit";

const weekDaySlice = createSlice({
  name: "weekDay",
  initialState: { value: "" },
  reducers: {
    setWeekDay(state, action) {
      state.value = action.payload;
    },
  },
});

export const { setWeekDay } = weekDaySlice.actions;
export default weekDaySlice.reducer;
