import { createSlice } from '@reduxjs/toolkit';
import {
  CONNECT,
  CONNECTING,
  CONNECTION_FAILED,
  DIFFICULTY,
  GAME,
  HOME,
  PAUSE,
  PVP_MODE,
  RULES,
} from '../constants/navConatansts';
import { endGame, playGame, restartGame, startGame } from './gameSlice';

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
    goToConnect: (state) => {
      state.current = CONNECT;
    },
    goToGame: (state) => {
      state.current = GAME;
    },
    connectionError: (state) => {
      state.current = CONNECTION_FAILED;
    },
    goToPause: (state) => {
      state.current = PAUSE;
    },
    goToRules: (state) => {
      state.current = RULES;
    },
  },
  extraReducers(builder) {
    builder.addCase(playGame, (state) => {
      state.current = CONNECTING;
    });
    builder.addCase(restartGame, (state) => {
      state.current = CONNECTING;
    });
    builder.addCase(startGame, (state) => {
      state.current = GAME;
    });
    builder.addCase(endGame, (state) => {
      state.current = HOME;
    });
    builder.addCase(restartGame, (state) => {
      state.current = GAME;
    });
  },
});

export const {
  goToGame,
  goToHome,
  goToRules,
  goToDifficulty,
  goToPause,
  goToPvpModeMenu,
  goToConnect,
  connectionError,
} = navigationSlice.actions;
export default navigationSlice;
