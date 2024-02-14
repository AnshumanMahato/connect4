import { createSlice } from '@reduxjs/toolkit';
import getChain from '../../utils/getChain';
import markChain from '../../utils/markChain';
import { goToGame, goToHome } from './navigationSlice';

const getNextPlayer = ({ currentPlayer, player1, player2 }) => {
  switch (currentPlayer) {
    case player1:
      return player2;
    case player2:
      return player1;
  }
};

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    mode: 'pvp',
    player1: 'player1',
    player2: 'player2',
    currentPlayer: 'player1',
    scoreP1: 0,
    scoreP2: 0,
    isEvaluating: false,
    isDraw: false,
    currentWinner: null,
    recentEntry: null,
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
    switchPlayer: (state) => {
      state.currentPlayer = getNextPlayer(state);
    },

    insertCounter: (state, action) => {
      //Check if there is a winner already
      if (state.currentWinner) return { ...state };

      const { grid } = state;
      const { col } = action.payload;
      const row = grid[0][col];
      if (!row) return { ...state };

      const { currentPlayer, player1, player2 } = state;

      //Get value for the counter
      let value;
      switch (currentPlayer) {
        case player1:
          value = 1;
          break;
        case player2:
          value = 2;
          break;
      }

      //Deep Clone grid
      const newGrid = state.grid.map((row) => [...row]);
      //Insert counter
      newGrid[row][col] = value;

      //Update empty row
      newGrid[0][col]--;

      state.isEvaluating = true;
      state.currentPlayer = getNextPlayer(state);
      state.grid = newGrid;
      state.recentEntry = [row, col];
    },

    checkWinner: (state) => {
      const { grid, recentEntry } = state;

      //Check if draw
      if (grid[0].every((cell) => cell === 0)) {
        return { ...state, isEvaluating: false, isDraw: true };
      }

      let chain = null;
      //Check horizontal chain
      chain = getChain(grid, recentEntry, 'h');
      //Check Left Diagonal chain
      if (!chain) chain = getChain(grid, recentEntry, 'ld');
      //Check Right Diagonal chain
      if (!chain) chain = getChain(grid, recentEntry, 'rd');
      //Check vertical chain
      if (!chain) chain = getChain(grid, recentEntry, 'v');
      //Check if there is a chain
      if (!chain) return { ...state, isEvaluating: false };

      //If there is a chain, mark it and set the winner
      const { currentPlayer, player1, player2 } = state;
      switch (currentPlayer) {
        case player1:
          state.currentWinner = player2;
          state.scoreP2++;
          break;
        case player2:
          state.currentWinner = player1;
          state.scoreP1++;
          break;
      }
      state.grid = markChain(grid, chain);
      state.isEvaluating = false;
    },

    resetBoard: (state) => {
      state.currentWinner = null;
      state.recentEntry = null;
      state.isDraw = false;
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

    restartGame: (state) => {
      state.currentWinner = null;
      state.recentEntry = null;
      state.isDraw = false;
      state.scoreP1 = 0;
      state.scoreP2 = 0;
      state.currentPlayer = getNextPlayer(state);
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
  },
  extraReducers(builder) {
    builder.addCase(goToHome, (state) => {
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
    });
    builder.addCase(goToGame, (state, action) => {
      const { mode } = action.payload;
      state.mode = mode;
      switch (mode) {
        case 'pve':
          state.player1 = 'self';
          state.player2 = 'cpu';
          state.currentPlayer = 'self';
          break;
        case 'pvp':
          state.player1 = 'player1';
          state.player2 = 'player2';
          state.currentPlayer = 'player1';
          break;
      }
    });
  },
});

export const {
  switchPlayer,
  insertCounter,
  checkWinner,
  resetBoard,
  restartGame,
} = gameSlice.actions;
export default gameSlice;
