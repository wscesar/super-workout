import { createSlice } from "@reduxjs/toolkit";

const selectedDaySlice = createSlice({
  name: "selectedDay",
  initialState: { value: "" },
  reducers: {
    setSelectedDay(state, action) {
      state.value = action.payload;
    },
  },
});

export const { setSelectedDay } = selectedDaySlice.actions;
export default selectedDaySlice.reducer;
