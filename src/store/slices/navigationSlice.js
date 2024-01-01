import { createSlice } from '@reduxjs/toolkit';

const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    current: 'home',
  },
  reducers: {
    goToHome: (state) => {
      state.current = 'home';
    },
    goToGame: (state) => {
      state.current = 'game';
    },
    goToRules: (state) => {
      state.current = 'rules';
    },
  },
});

export const { goToGame, goToHome, goToRules } = navigationSlice.actions;
export const navigationReducer = navigationSlice.reducer;
