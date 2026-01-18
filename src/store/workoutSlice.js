import { createSlice } from "@reduxjs/toolkit";

const workoutSlice = createSlice({
  name: "workout",
  initialState: { byDay: {} },
  reducers: {
    addSerie(state, action) {
      const { weekDay, serie } = action.payload;
      if (!state.byDay[weekDay]) {
        state.byDay[weekDay] = [];
      }
      state.byDay[weekDay].push(serie);
    },
  },
});

export const { addSerie } = workoutSlice.actions;
export default workoutSlice.reducer;
