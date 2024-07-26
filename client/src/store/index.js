import { configureStore } from '@reduxjs/toolkit';
import navigationSlice from './slices/navigationSlice';
import gameSlice from './slices/gameSlice';
import socketMiddleware from './middleware/socketMiddleware';

const store = configureStore({
  reducer: {
    [navigationSlice.name]: navigationSlice.reducer,
    [gameSlice.name]: gameSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      socketMiddleware()
    ),
});

export {
  goToHome,
  goToGame,
  goToRules,
  goToDifficulty,
  goToPause,
  goToPvpModeMenu,
  goToConnect,
  connectionError,
} from './slices/navigationSlice';
export {
  switchPlayer,
  insertCounter,
  resetBoard,
  restartGame,
  playGame,
  startGame,
  quitGame,
  pauseGame,
  continueGame,
} from './slices/gameSlice';
export default store;
