import { createSlice } from '@reduxjs/toolkit';
import {
  ROOMS,
  CONNECTION_FAILED,
  DIFFICULTY,
  GAME,
  HOME,
  PAUSE,
  RULES,
  NOTIFICATION,
} from '../constants/navConatansts';
import { endGame, playGame, restartGame, startGame } from './gameSlice';

const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    current: HOME,
    notification: null,
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
    notify: (state, action) => {
      state.current = NOTIFICATION;
      state.notification = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(playGame, (state) => {
      state.current = NOTIFICATION;
      state.notification = {
        title: 'CONNECTING',
        message: 'Connecting to the server...',
        type: 'info',
      };
    });
    builder.addCase(restartGame, (state) => {
      state.current = NOTIFICATION;
      state.notification = {
        title: 'CONNECTING',
        message: 'Connecting to the server...',
        type: 'info',
      };
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
  notify,
} = navigationSlice.actions;
export default navigationSlice;
