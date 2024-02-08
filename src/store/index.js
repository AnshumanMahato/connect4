import { configureStore } from '@reduxjs/toolkit';
import navigationSlice from './slices/navigationSlice';
import gameSlice from './slices/gameSlice';

const store = configureStore({
  reducer: {
    [navigationSlice.name]: navigationSlice.reducer,
    [gameSlice.name]: gameSlice.reducer,
  },
});

export { goToHome, goToGame, goToRules } from './slices/navigationSlice';
export {
  switchPlayer,
  insertCounter,
  checkWinner,
  resetBoard,
  restartGame,
} from './slices/gameSlice';
export default store;
