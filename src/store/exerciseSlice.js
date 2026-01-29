import { createSlice } from '@reduxjs/toolkit';

const exerciseSlice = createSlice({
  name: 'exercise',
  initialState: {
    rest: [],
    superset: [{
      title: 'Supino',
      isDropset: true,
      dropAmount: 4,
      drop: []
    }]
  },
  reducers: {
    setExercise(state, action) { state = { ...state, ...action.payload } },

    set_rest(state, action) { 
      state.rest = action.payload
    },

    set_title(state, action) {
      const { i, title } = action.payload
      state.superset[i]
        ? state.superset[i].title = title
        : state.superset.push({ title: title, drop: [] })
    },

    set_drop(state, action) {
      const { i, drop } = action.payload
      state.superset[i].drop = drop
    },

    set_isDropset(state, action) {
      const { i, isDropset } = action.payload
      console.log({i, isDropset})
      state.superset[i].isDropset = isDropset
    },

    set_dropAmount(state, action) {
      const { i, dropAmount } = action.payload
      console.log({i, dropAmount})
      state.superset[i].dropAmount = dropAmount
    },

    
  },
});

export const { setExercise, set_title, set_rest, set_drop, set_isDropset, set_dropAmount } = exerciseSlice.actions;
export default exerciseSlice.reducer;

var Exercise = {
  id: 0,
  title: 'supino',
  drop: [
    { peso: 30, reps: 12, rest: 0 },
    { peso: 20, reps: 12, rest: 0 },
    { peso: 12, reps: 12, rest: 0 }
  ]
}


var Treino = {
  rest: [0, 60, 0], // descanso personalizado
  superset: [
    {
      exercise: 'supino',
      drop: [
        { peso: 30, reps: 12, rest: 0 },
        { peso: 20, reps: 12, rest: 0 },
        { peso: 12, reps: 12, rest: 0 }
      ]
    },
    {
      exercise: 'agachamento',
      drop: [
        { peso: 0, reps: 12, rest: 0 },
      ]
    }
  ]
}

// switch para ativar superserie
// button para add +2 exercicios

// warmUp: {
//     exercise: 'supino',
//     drop: [
//       { peso: 0, reps: 20, rest: 0 },
//     ]
//   },