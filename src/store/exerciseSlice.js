import { createSlice } from '@reduxjs/toolkit';

const exerciseSlice = createSlice({
  name: 'exercise',
  initialState: {
    title: '',
    sets: 0,
    reps: 0,
    weight: [],
    rest: []
  },
  reducers: {
    setExercise(state, action) { state = { ...state, ...action.payload } },
    set_title: (state, action) => { state.title = action.payload },
    set_sets(state, action) { state.sets = action.payload },
    set_reps(state, action) { state.reps = action.payload },
    set_weight(state, action) { state.weight = action.payload },
    set_rest(state, action) { state.rest = action.payload },
  },
});

export const { setExercise, set_title, set_sets, set_reps, set_weight, set_rest } = exerciseSlice.actions;
export default exerciseSlice.reducer;
