import { createSlice } from '@reduxjs/toolkit';
import {
  ROOMS,
  CONNECTING,
  CONNECTION_FAILED,
  DIFFICULTY,
  GAME,
  HOME,
  PAUSE,
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
    goToPvpRooms: (state) => {
      state.current = ROOMS;
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
  },
});

export const {
  goToGame,
  goToHome,
  goToRules,
  goToDifficulty,
  goToPause,
  goToPvpRooms,
  connectionError,
} = navigationSlice.actions;
export default navigationSlice;
