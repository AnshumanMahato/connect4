import io from 'socket.io-client';
import { connectionError, goToGame, goToHome } from '../slices/navigationSlice';
import { endGame, startGame } from '../slices/gameSlice';

const socketMiddleware = () => {
  let socket = null;

  return (store) => (next) => (action) => {
    switch (action.type) {
      case goToGame.type:
        if (socket === null) {
          let msgOffset = 0;

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

          socket.on('startGame', (data) => {
            store.dispatch(startGame(data));
          });

          socket.on('connect_error', (error) => {
            store.dispatch(connectionError(error));
          });

          socket.on('disconnect', () => {
            console.log('Socket.IO disconnected');
          });
        }
        break;
      case endGame.type:
        if (socket !== null) {
          const { player } = store.getState().game;
          socket.emit('endGame', { player }, (err, res) => {
            console.log(res);
            if (res.status === 'ok') {
              socket.disconnect();
              socket = null;
            }
          });
        }
        break;
      // Example: Emitting an event in response to a Redux action
      case 'game/move':
        socket.emit('makeMove', action.payload);
        break;
      default:
        break;
    }

    return next(action);
  };
};

export default socketMiddleware;
