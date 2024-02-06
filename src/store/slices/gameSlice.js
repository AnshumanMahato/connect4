import { createSlice } from '@reduxjs/toolkit';

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    currentPlayer: 'player1',
    scoreP1: 0,
    scoreP2: 0,
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
  },
});

export const { switchPlayer } = gameSlice.actions;
export default gameSlice;
