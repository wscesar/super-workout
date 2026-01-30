import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        idToken: '',
        refreshToken: '',
        isLoggedIn: false,
    },
    reducers: {
        login(state, action) {
            const { idToken, refreshToken } = action.payload;
            state.idToken = idToken;
            state.refreshToken = refreshToken;
            state.isLoggedIn = true;

        },
        logout(state, _action) {
            state.idToken = '';
            state.refreshToken = '';
            state.isLoggedIn = false;
        }
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;