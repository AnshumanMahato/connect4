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
  playAgain,
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

          socket.on('pauseGame', (callback) => {
            store.dispatch(goToPause());
            callback({ status: 'game_paused' });
          });

          socket.on('continueGame', (callback) => {
            store.dispatch(goToGame());
            callback({ status: 'game_started' });
          });

          socket.on('endGame', (callback) => {
            callback({ status: 'game_ended' });
            socket.disconnect();
            socket = null;
            store.dispatch(endGame());
          });

          socket.on('timer', (data, callback) => {
            store.dispatch(updateTime(data.time));
            callback({ status: 'time_updated' });
          });

          socket.on('switchPlayer', (data, callback) => {
            store.dispatch(switchPlayer(data));
            callback({ status: 'player_switched' });
          });

          socket.on('evaluatingMove', (callback) => {
            store.dispatch(startEvaluation());
            callback({ status: 'evaluating_move' });
          });

          socket.on('update', (data, callback) => {
            store.dispatch(updateGameState(data.game));
            callback({ status: 'state_updated' });
          });

          socket.on('invalidMove', (callback) => {
            store.dispatch(stopEvaluation());
            callback({ status: 'invalid_move' });
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
      case playAgain.type:
        if (socket !== null) {
          const { player } = store.getState().game;
          socket.emit('playAgainRequest', `${socket.id}-${msgOffset++}`, {
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
