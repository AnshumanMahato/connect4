import { configureStore } from '@reduxjs/toolkit';
import { navigationReducer } from './slices/navigationSlice';

const store = configureStore({
  reducer: {
    navigation: navigationReducer,
  },
});

export { goToHome, goToGame, goToRules } from './slices/navigationSlice';
export default store;
