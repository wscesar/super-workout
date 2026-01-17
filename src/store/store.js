import { configureStore } from "@reduxjs/toolkit";
import selectedDayReducer from "./selectedDaySlice";

export const store = configureStore({
  reducer: {
    selectedDay: selectedDayReducer,
  },
});
