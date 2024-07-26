import { createAction, createSlice } from '@reduxjs/toolkit';
import { PVP } from '../constants/gameConstants';
import { goToGame } from './navigationSlice';

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    player: null,
    mode: PVP,
    difficulty: null,
    player1: 'player1',
    player2: 'player2',
    currentPlayer: 'player1',
    scoreP1: 0,
    scoreP2: 0,
    isEvaluating: false,
    isDraw: false,
    currentWinner: null,
    recentEntry: null,
    time: 30,
    grid: [
      [0, 6, 6, 6, 6, 6, 6, 6],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ],
  },
  reducers: {
    startGame: (state, action) => {
      const { player, game } = action.payload;
      const newState = { ...state, ...game, player };
      return newState;
    },

    endGame: (state) => {
      state.player = null;
      state.mode = PVP;
      state.currentPlayer = 'player1';
      state.currentWinner = null;
      state.recentEntry = null;
      state.isDraw = false;
      state.scoreP1 = 0;
      state.scoreP2 = 0;
      state.grid = [
        [0, 6, 6, 6, 6, 6, 6, 6],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ];
    },

    updateTime: (state, action) => {
      state.time = action.payload;
    },

    switchPlayer: (state, action) => {
      return { ...state, ...action.payload };
    },

    updateGameState: (state, action) => {
      const newState = { ...state, ...action.payload, isEvaluating: false };
      return newState;
    },

    startEvaluation: (state) => {
      state.isEvaluating = true;
    },

    stopEvaluation: (state) => {
      state.isEvaluating = false;
    },
  },
  extraReducers(builder) {
    // builder.addCase(goToHome, (state) => {
    //   state.currentWinner = null;
    //   state.recentEntry = null;
    //   state.isDraw = false;
    //   state.scoreP1 = 0;
    //   state.scoreP2 = 0;
    //   state.grid = [
    //     [0, 6, 6, 6, 6, 6, 6, 6],
    //     [0, 0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0, 0],
    //   ];
    // });
    builder.addCase(goToGame, (state, action) => {
      if (!action.payload) return state;
      const { player, game } = action.payload;
      const newState = { ...state, ...game, player };
      return newState;
    });
  },
});

export const playGame = createAction('game/play');
export const quitGame = createAction('game/quit');
export const pauseGame = createAction('game/pause');
export const continueGame = createAction('game/continue');
export const restartGame = createAction('game/restart');
export const insertCounter = createAction('game/insertCounter');
export const playAgain = createAction('game/playAgain');

export const {
  switchPlayer,
  startEvaluation,
  stopEvaluation,
  startGame,
  endGame,
  updateTime,
  updateGameState,
} = gameSlice.actions;
export default gameSlice;
