import { createSlice } from '@reduxjs/toolkit';

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    currentPlayer: 'player1',
    scoreP1: 0,
    scoreP2: 0,
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
      switch (state.currentPlayer) {
        case 'player1':
          state.currentPlayer = 'player2';
          break;
        case 'player2':
          state.currentPlayer = 'player1';
          break;
      }
    },

    insertCounter: (state, action) => {
      const { col } = action.payload;
      const row = state.grid[0][col];
      if (!row) return state;

      let value;
      switch (state.currentPlayer) {
        case 'player1':
        case 'self':
          value = 1;
          break;
        case 'player2':
        case 'cpu':
          value = 2;
          break;
      }

      //Deep Clone grid
      const newGrid = state.grid.map((row) => [...row]);
      //Insert counter
      newGrid[row][col] = value;

      //Update empty row
      newGrid[0][col]--;

      state.grid = newGrid;
      state.recentEntry = [row, col];
    },

    setWinner: (state) => {
      state.currentWinner = state.currentPlayer;
      switch (state.currentPlayer) {
        case 'player1':
        case 'self':
          state.scoreP1++;
          break;
        case 'player2':
        case 'cpu':
          state.scoreP2++;
          break;
      }
    },

    resetGame: (state) => {
      state.winner = null;
      state.recentEntry = null;
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
});

export const { switchPlayer, insertCounter, setWinner, resetGame } =
  gameSlice.actions;
export default gameSlice;
