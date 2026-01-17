import { createSlice } from '@reduxjs/toolkit';

const exerciseSlice = createSlice({
  name: 'exercise',
  initialState: { title: '', weight: '', reps: '', rest: '' },
  reducers: {
    setExercise(state, action) {
      state.value = action.payload;
    },
  },
});

export const { setExercise } = exerciseSlice.actions;
export default exerciseSlice.reducer;
