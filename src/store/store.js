import { configureStore } from "@reduxjs/toolkit";
import weekDayReducer from "./weekDaySlice";
import exerciseReducer from "./exerciseSlice";
import workoutReducer from "./workoutSlice";

export const store = configureStore({
  reducer: {
    weekDay: weekDayReducer,
    exercise: exerciseReducer,
    workout: workoutReducer,
  },
});
