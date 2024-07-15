import { createSlice } from '@reduxjs/toolkit';
import {
  DIFFICULTY,
  GAME,
  HOME,
  PAUSE,
  PVP_MODE,
  RULES,
} from '../constants/navConatansts';
import { restartGame } from './gameSlice';

const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    current: HOME,
  },
  reducers: {
    goToHome: (state) => {
      state.current = HOME;
    },
    goToDifficulty: (state) => {
      state.current = DIFFICULTY;
    },
    goToPvpModeMenu: (state) => {
      state.current = PVP_MODE;
    },
    goToGame: (state) => {
      state.current = GAME;
    },
    goToPause: (state) => {
      state.current = PAUSE;
    },
    goToRules: (state) => {
      state.current = RULES;
    },
  },
  extraReducers(builder) {
    builder.addCase(restartGame, (state) => {
      state.current = GAME;
    });
  },
});

export const { goToGame, goToHome, goToRules, goToDifficulty, goToPause } =
  navigationSlice.actions;
export default navigationSlice;
