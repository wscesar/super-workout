import { configureStore } from "@reduxjs/toolkit";
import weekDayReducer from "./weekDaySlice";
import exerciseReducer from "./exerciseSlice";

export const store = configureStore({
  reducer: {
    weekDay: weekDayReducer,
    exercise: exerciseReducer,
  },
});
