import io from 'socket.io-client';
import {
  connectionError,
  goToGame,
  goToPause,
} from '../slices/navigationSlice';
import {
  continueGame,
  endGame,
  insertCounter,
  pauseGame,
  playGame,
  quitGame,
  restartGame,
  startEvaluation,
  stopEvaluation,
  switchPlayer,
  updateGameState,
  updateTime,
} from '../slices/gameSlice';

const socketMiddleware = () => {
  let socket = null;
  let msgOffset = 0;

  return (store) => (next) => (action) => {
    switch (action.type) {
      case playGame.type:
        if (!socket) {
          msgOffset = 0;
          socket = io(import.meta.env.VITE_SOCKET_URL, {
            ackTimeout: 5000,
            retries: 12,
            reconnectionDelay: 1000,
          });
          socket.on('connect', () => {
            console.log('Socket.IO connected');
            const { player } = store.getState().game;
            if (!player) {
              socket.emit(
                'join',
                `${socket.id}-${msgOffset++}`,
                action.payload
              );
            }
          });

          socket.on('startGame', (data, callback) => {
            store.dispatch(goToGame(data));
            callback({ status: 'game_started' });
          });

          socket.on('pauseGame', () => {
            store.dispatch(goToPause());
          });

          socket.on('continueGame', (callback) => {
            store.dispatch(goToGame());
            callback({ status: 'game_started' });
          });

          socket.on('endGame', () => {
            socket.disconnect();
            socket = null;
            store.dispatch(endGame());
          });

          socket.on('timer', (data) => {
            store.dispatch(updateTime(data.time));
          });

          socket.on('switchPlayer', (data) => {
            store.dispatch(switchPlayer(data));
          });

          socket.on('evaluatingMove', () => {
            store.dispatch(startEvaluation());
          });

          socket.on('update', (data) => {
            store.dispatch(updateGameState(data.game));
            // callback({ status: 'state_updated' });
          });

          socket.on('invalidMove', () => {
            store.dispatch(stopEvaluation());
          });

          socket.on('connect_error', (error) => {
            store.dispatch(connectionError(error));
          });

          socket.on('disconnect', () => {
            console.log('Socket.IO disconnected');
          });
        }
        break;
      case pauseGame.type:
        if (socket !== null) {
          const { player } = store.getState().game;
          socket.emit('pauseRequest', `${socket.id}-${msgOffset++}`, {
            player,
          });
        }
        break;
      case continueGame.type:
        if (socket !== null) {
          const { player } = store.getState().game;
          socket.emit('continueRequest', `${socket.id}-${msgOffset++}`, {
            player,
          });
        }
        break;
      case restartGame.type:
        if (socket !== null) {
          const { player } = store.getState().game;
          socket.emit('restartRequest', `${socket.id}-${msgOffset++}`, {
            player,
          });
        }
        break;
      case quitGame.type:
        if (socket !== null) {
          const { player } = store.getState().game;
          socket.emit('leave', `${socket.id}-${msgOffset++}`, { player });
        }
        break;
      // Example: Emitting an event in response to a Redux action
      case insertCounter.type:
        if (socket !== null) {
          const { player } = store.getState().game;
          const { col } = action.payload;
          socket.emit('moveRequest', `${socket.id}-${msgOffset++}`, {
            player,
            col,
          });
        }
        break;
      default:
        break;
    }

    return next(action);
  };
};

export default socketMiddleware;
