import { configureStore } from "@reduxjs/toolkit";
import weekDayReducer from "./weekDaySlice";
import exerciseReducer from "./exerciseSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    weekDay: weekDayReducer,
    exercise: exerciseReducer,
    auth: authReducer,
  },
});
